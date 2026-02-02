import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash, Edit, ArrowLeft, Upload, Loader2, Image as ImageIcon, LogOut, Lock } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

export default function Admin() {
    const [session, setSession] = useState<Session | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    // Admin state
    const [logoUrl, setLogoUrl] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', tag: '', image_url: '', affiliate_link: '', hide_price: false });
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Testimonials state
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
    const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', content: '', image_url: '' });

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchData();
            else setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchData();
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert('Erro no login: ' + error.message);
        }
        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    const fetchData = async () => {
        setLoading(true);
        const { data: settings } = await supabase.from('site_settings').select('*').eq('setting_key', 'logo_url').single();
        if (settings) setLogoUrl(settings.value || '');

        const { data: prods } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (prods) setProducts(prods);

        const { data: tests } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (tests) setTestimonials(tests);

        setLoading(false);
    };

    const handleUpload = async (file: File, folder: string): Promise<string | null> => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('store-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('store-images')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Erro ao fazer upload da imagem');
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const url = await handleUpload(file, 'logos');
        if (url) {
            setLogoUrl(url);
            // Auto-save logo
            const { error } = await supabase.from('site_settings').upsert({ setting_key: 'logo_url', value: url });
            if (!error) alert('Logo atualizada com sucesso!');
        }
    };

    const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const url = await handleUpload(file, 'products');

        if (url) {
            if (isEditing && editingProduct) {
                setEditingProduct({ ...editingProduct, image_url: url });
            } else {
                setNewProduct({ ...newProduct, image_url: url });
            }
        }
    };

    const handleTestimonialImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const url = await handleUpload(file, 'testimonials');

        if (url) {
            if (isEditing && editingTestimonial) {
                setEditingTestimonial({ ...editingTestimonial, image_url: url });
            } else {
                setNewTestimonial({ ...newTestimonial, image_url: url });
            }
        }
    };

    const handleCreateProduct = async () => {
        // Sanitize price
        let priceVal = newProduct.price;
        if (typeof priceVal === 'string') {
            priceVal = priceVal.replace(/[R$\s.]/g, '').replace(',', '.');
        }
        if (!priceVal || isNaN(Number(priceVal))) {
            priceVal = '0';
        }

        const { error } = await supabase.from('products').insert([{
            name: newProduct.name,
            description: newProduct.description,
            price: priceVal.toString(),
            tag: newProduct.tag,
            image_url: newProduct.image_url,
            affiliate_link: newProduct.affiliate_link,
            hide_price: newProduct.hide_price,
            marketplace: 'Loja Automattus', // Default value
            product_type: 'Produto' // Default value
        }]);
        if (!error) {
            setNewProduct({ name: '', description: '', price: '', tag: '', image_url: '', affiliate_link: '', hide_price: false });
            fetchData();
        } else {
            console.error('Error creating product:', error);
            alert(`Erro ao criar produto: ${error.message}`);
        }
    };

    const handleCreateTestimonial = async () => {
        const { error } = await supabase.from('testimonials').insert([{
            name: newTestimonial.name,
            role: newTestimonial.role,
            content: newTestimonial.content,
            image_url: newTestimonial.image_url
        }]);
        if (!error) {
            setNewTestimonial({ name: '', role: '', content: '', image_url: '' });
            fetchData();
        } else {
            console.error('Error creating testimonial:', error);
            alert(`Erro ao criar depoimento: ${error.message}`);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir esse produto?')) {
            await supabase.from('products').delete().eq('id', id);
            fetchData();
        }
    };

    const handleDeleteTestimonial = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir esse depoimento?')) {
            await supabase.from('testimonials').delete().eq('id', id);
            fetchData();
        }
    };

    const handleUpdateProduct = async () => {
        if (!editingProduct) return;

        try {
            // Sanitize price
            let priceVal = editingProduct.price;
            if (typeof priceVal === 'string') {
                priceVal = priceVal.replace(/[R$\s.]/g, '').replace(',', '.');
            }
            if (!priceVal || isNaN(Number(priceVal))) {
                priceVal = '0';
            }

            const { error } = await supabase.from('products').update({
                name: editingProduct.name,
                description: editingProduct.description,
                price: priceVal.toString(),
                tag: editingProduct.tag,
                image_url: editingProduct.image_url,
                affiliate_link: editingProduct.affiliate_link,
                hide_price: editingProduct.hide_price
            }).eq('id', editingProduct.id);

            if (error) throw error;

            setEditingProduct(null);
            fetchData();
        } catch (error: any) {
            console.error('Error updating product:', error);
            alert(`Erro ao atualizar produto: ${error.message || error.error_description || 'Erro desconhecido'}`);
        }
    };

    const handleUpdateTestimonial = async () => {
        if (!editingTestimonial) return;

        try {
            const { error } = await supabase.from('testimonials').update({
                name: editingTestimonial.name,
                role: editingTestimonial.role,
                content: editingTestimonial.content,
                image_url: editingTestimonial.image_url
            }).eq('id', editingTestimonial.id);

            if (error) throw error;

            setEditingTestimonial(null);
            fetchData();
        } catch (error: any) {
            console.error('Error updating testimonial:', error);
            alert(`Erro ao atualizar depoimento: ${error.message}`);
        }
    };

    if (loading && session) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white"><Loader2 className="animate-spin w-8 h-8" /></div>;

    if (!session) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center border border-blue-600/20">
                            <Lock className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white text-center mb-2">Painel Admin</h1>
                    <p className="text-slate-400 text-center mb-8">Faça login para gerenciar o site</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-slate-950 border-slate-800 text-white h-12"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-slate-950 border-slate-800 text-white h-12"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium" disabled={authLoading}>
                            {authLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Entrar'}
                        </Button>
                    </form>
                    <div className="mt-8 text-center">
                        <a href="/" className="text-sm text-slate-500 hover:text-white transition-colors">Voltar ao site</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Painel Admin</h1>
                    <div className="flex items-center gap-4">
                        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Site
                        </a>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                            <LogOut className="w-4 h-4 mr-2" /> Sair
                        </Button>
                    </div>
                </div>

                {/* Logo Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Configuração Geral</h2>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-6">
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            <div className="w-full sm:w-auto">
                                <label className="block text-sm font-medium text-slate-400 mb-2">Logo do Site</label>
                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 w-40 h-40 flex flex-col items-center justify-center relative hover:bg-slate-800/50 transition-colors">
                                    {loading || uploading ? (
                                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                    ) : logoUrl ? (
                                        <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="text-center text-slate-500">
                                            <Upload className="w-8 h-8 mx-auto mb-2" />
                                            <span className="text-xs">Upload Logo</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        disabled={uploading}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h3 className="font-medium text-white">Logo Atual</h3>
                                <p className="text-sm text-slate-500">
                                    Clique na área pontilhada para fazer upload de uma nova imagem. A atualização é automática.
                                    Recomendamos imagens PNG com fundo transparente.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Produtos da Loja</h2>
                    </div>

                    {/* New Product Form */}
                    <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 space-y-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Image Upload Area */}
                            <div className="w-full sm:w-40 shrink-0">
                                <label className="block text-sm font-medium text-slate-400 mb-2">Imagem</label>
                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-2 h-40 flex flex-col items-center justify-center relative hover:bg-slate-800/50 transition-colors bg-slate-950">
                                    {uploading ? (
                                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                    ) : newProduct.image_url ? (
                                        <div className="relative w-full h-full">
                                            <img src={newProduct.image_url} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-slate-500">
                                            <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                                            <span className="text-xs">Adicionar Imagem</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleProductImageUpload(e)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        disabled={uploading}
                                    />
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="flex-1 space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Input placeholder="Nome do Produto" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500" />
                                    <Input placeholder="Preço (ex: R$ 2.499)" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500" />
                                    <Input placeholder="Tag (ex: Novo, Oferta)" value={newProduct.tag} onChange={e => setNewProduct({ ...newProduct, tag: e.target.value })} className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500" />
                                    <Input placeholder="Link da Loja (Obrigatório)" value={newProduct.affiliate_link} onChange={e => setNewProduct({ ...newProduct, affiliate_link: e.target.value })} className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500" />
                                </div>
                                <div className="flex items-center gap-2 px-1">
                                    <input
                                        type="checkbox"
                                        id="new-hide-price"
                                        checked={newProduct.hide_price}
                                        onChange={e => setNewProduct({ ...newProduct, hide_price: e.target.checked })}
                                        className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="new-hide-price" className="text-sm text-slate-400 cursor-pointer">Ocultar valor (mostrar "Consulte o valor")</label>
                                </div>
                                <Textarea placeholder="Descrição do produto..." value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 min-h-[160px]" />
                                <div className="flex justify-end pt-2">
                                    <Button onClick={handleCreateProduct} className="bg-emerald-600 hover:bg-emerald-700 text-white" disabled={uploading}>
                                        {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                                        Adicionar Produto
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="space-y-4">
                        {products.length === 0 && (
                            <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                                Nenhum produto cadastrado.
                            </div>
                        )}
                        {products.map(product => (
                            <div key={product.id} className="group flex flex-col sm:flex-row gap-6 bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                                {editingProduct?.id === product.id ? (
                                    <div className="flex-1 grid gap-4 w-full">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            {/* Edit Image */}
                                            <div className="w-full sm:w-32 shrink-0">
                                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-1 h-32 flex flex-col items-center justify-center relative hover:bg-slate-800/50 transition-colors bg-slate-950">
                                                    <div className="relative w-full h-full">
                                                        <img src={editingProduct.image_url || '/placeholder.png'} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md cursor-pointer">
                                                            <Upload className="w-5 h-5 text-white" />
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleProductImageUpload(e, true)}
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        disabled={uploading}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex-1 space-y-3">
                                                <div className="grid sm:grid-cols-2 gap-3">
                                                    <Input value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Nome" />
                                                    <Input value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} className="bg-slate-900 border-slate-800" placeholder="Preço" />
                                                    <Input value={editingProduct.tag} onChange={e => setEditingProduct({ ...editingProduct, tag: e.target.value })} className="bg-slate-900 border-slate-800" placeholder="Tag" />
                                                    <Input value={editingProduct.affiliate_link} onChange={e => setEditingProduct({ ...editingProduct, affiliate_link: e.target.value })} className="bg-slate-900 border-slate-800" placeholder="URL da Loja" />
                                                </div>
                                                <div className="flex items-center gap-2 px-1">
                                                    <input
                                                        type="checkbox"
                                                        id="edit-hide-price"
                                                        checked={editingProduct.hide_price}
                                                        onChange={e => setEditingProduct({ ...editingProduct, hide_price: e.target.checked })}
                                                        className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <label htmlFor="edit-hide-price" className="text-sm text-slate-400 cursor-pointer">Ocultar valor (mostrar "Consulte o valor")</label>
                                                </div>
                                                <Textarea value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="bg-slate-900 border-slate-800 min-h-[160px]" placeholder="Descrição" />
                                                <div className="flex gap-2 justify-end">
                                                    <Button size="sm" variant="ghost" onClick={() => setEditingProduct(null)}>Cancelar</Button>
                                                    <Button size="sm" onClick={handleUpdateProduct} className="bg-blue-600" disabled={uploading}>Salvar Alterações</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-700">
                                                    <ImageIcon className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-bold text-lg text-white">{product.name}</h4>
                                                {product.tag && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-slate-700">{product.tag}</span>}
                                            </div>
                                            <p className="text-slate-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="text-emerald-400 font-medium">
                                                    {product.hide_price ? 'Consulte o valor' : product.price}
                                                </span>
                                                <a href={product.affiliate_link} target="_blank" className="text-slate-500 hover:text-blue-400 truncate max-w-[200px]">{product.affiliate_link}</a>
                                            </div>
                                        </div>
                                        <div className="flex sm:flex-col gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="icon" variant="outline" className="border-slate-700 hover:bg-slate-800" onClick={() => setEditingProduct(product)}><Edit className="w-4 h-4 text-slate-300" /></Button>
                                            <Button size="icon" variant="destructive" className="bg-red-900/20 hover:bg-red-900/40 border-red-900/50" onClick={() => handleDeleteProduct(product.id)}><Trash className="w-4 h-4 text-red-500" /></Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Depoimentos de Clientes</h2>
                    </div>

                    {/* New Testimonial Form */}
                    <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 space-y-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-40 shrink-0">
                                <label className="block text-sm font-medium text-slate-400 mb-2">Foto</label>
                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-2 h-40 flex flex-col items-center justify-center relative hover:bg-slate-800/50 transition-colors bg-slate-950">
                                    {uploading ? (
                                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                    ) : newTestimonial.image_url ? (
                                        <div className="relative w-full h-full">
                                            <img src={newTestimonial.image_url} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-slate-500">
                                            <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                                            <span className="text-xs">Adicionar Foto</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleTestimonialImageUpload(e)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        disabled={uploading}
                                    />
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Input placeholder="Nome do Cliente" value={newTestimonial.name} onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })} className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500" />
                                    <Input placeholder="Cargo/Empresa (ex: Proprietário)" value={newTestimonial.role} onChange={e => setNewTestimonial({ ...newTestimonial, role: e.target.value })} className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500" />
                                </div>
                                <Textarea placeholder="Depoimento..." value={newTestimonial.content} onChange={e => setNewTestimonial({ ...newTestimonial, content: e.target.value })} className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 h-24" />
                                <div className="flex justify-end pt-2">
                                    <Button onClick={handleCreateTestimonial} className="bg-emerald-600 hover:bg-emerald-700 text-white" disabled={uploading}>
                                        {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                                        Adicionar Depoimento
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials List */}
                    <div className="space-y-4">
                        {testimonials.length === 0 && (
                            <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                                Nenhum depoimento cadastrado.
                            </div>
                        )}
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="group flex flex-col sm:flex-row gap-6 bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                                {editingTestimonial?.id === testimonial.id ? (
                                    <div className="flex-1 grid gap-4 w-full">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <div className="w-full sm:w-32 shrink-0">
                                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-1 h-32 flex flex-col items-center justify-center relative hover:bg-slate-800/50 transition-colors bg-slate-950">
                                                    <div className="relative w-full h-full">
                                                        <img src={editingTestimonial.image_url || '/placeholder.png'} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md cursor-pointer">
                                                            <Upload className="w-5 h-5 text-white" />
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleTestimonialImageUpload(e, true)}
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        disabled={uploading}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <div className="grid sm:grid-cols-2 gap-3">
                                                    <Input value={editingTestimonial.name} onChange={e => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Nome" />
                                                    <Input value={editingTestimonial.role} onChange={e => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })} className="bg-slate-900 border-slate-800" placeholder="Cargo" />
                                                </div>
                                                <Textarea value={editingTestimonial.content} onChange={e => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })} className="bg-slate-900 border-slate-800" placeholder="Conteúdo" />
                                                <div className="flex gap-2 justify-end">
                                                    <Button size="sm" variant="ghost" onClick={() => setEditingTestimonial(null)}>Cancelar</Button>
                                                    <Button size="sm" onClick={handleUpdateTestimonial} className="bg-blue-600" disabled={uploading}>Salvar</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden bg-slate-950 border border-slate-800">
                                            {testimonial.image_url ? (
                                                <img src={testimonial.image_url} alt={testimonial.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-700">
                                                    <ImageIcon className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
                                                <span className="text-sm text-slate-400">{testimonial.role}</span>
                                            </div>
                                            <p className="text-slate-400 text-sm mb-3 italic">"{testimonial.content}"</p>
                                        </div>
                                        <div className="flex sm:flex-col gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="icon" variant="outline" className="border-slate-700 hover:bg-slate-800" onClick={() => setEditingTestimonial(testimonial)}><Edit className="w-4 h-4 text-slate-300" /></Button>
                                            <Button size="icon" variant="destructive" className="bg-red-900/20 hover:bg-red-900/40 border-red-900/50" onClick={() => handleDeleteTestimonial(testimonial.id)}><Trash className="w-4 h-4 text-red-500" /></Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
