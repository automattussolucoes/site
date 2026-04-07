import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Plus, Trash, Edit, ArrowLeft, Upload, Loader2, Image as ImageIcon,
    LogOut, Lock, ChevronUp, ChevronDown, Eye, EyeOff, RefreshCcw
} from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

type AdminTab = 'geral' | 'sistemas' | 'produtos' | 'depoimentos';

export default function Admin() {
    const [session, setSession] = useState<Session | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<AdminTab>('geral');

    // General
    const [logoUrl, setLogoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Products (Unified)
    const [products, setProducts] = useState<any[]>([]);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [newProduct, setNewProduct] = useState({ 
        name: '', description: '', price: '', tag: '', 
        image_url: '', affiliate_link: '', link: '', 
        hide_price: false, display_type: 'destaque' as 'destaque' | 'indicado' 
    });

    // Testimonials
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
    const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', content: '', image_url: '' });

    // Systems (solutions)
    const [sistemas, setSistemas] = useState<any[]>([]);
    const [editingSistema, setEditingSistema] = useState<any>(null);
    const [newSistema, setNewSistema] = useState({
        name: '', subtitle: '', description: '', features: '',
        icon_name: 'Building2', badge: '', link: '#contato', button_text: 'Solicitar Demo',
        image_url: '', category: 'Sistemas', type: 'SaaS', target_audience: '', slug: ''
    });



    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchData();
            else setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchData();
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert('Erro no login: ' + error.message);
        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };
    const fetchData = async () => {
        setLoading(true);
        const [settingsRes, allProdsRes, testsRes, sistemasRes] = await Promise.all([
            supabase.from('site_settings').select('*').eq('setting_key', 'logo_url').single(),
            supabase.from('products').select('*').order('display_type', { ascending: false }).order('sort_order', { ascending: true }).order('created_at', { ascending: false }),
            supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
            supabase.from('solutions').select('*').order('sort_order', { ascending: true }),
        ]);

        if (settingsRes.data) setLogoUrl(settingsRes.data.value || '');
        if (allProdsRes.data) setProducts(allProdsRes.data);
        if (testsRes.data) setTestimonials(testsRes.data);
        if (sistemasRes.data) setSistemas(sistemasRes.data);
        setLoading(false);
    };

    // Upload helper
    const handleUpload = async (file: File, folder: string): Promise<string | null> => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;
            const { error: uploadError } = await supabase.storage.from('store-images').upload(filePath, file);
            if (uploadError) throw uploadError;
            const { data } = supabase.storage.from('store-images').getPublicUrl(filePath);
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
        const url = await handleUpload(e.target.files[0], 'logos');
        if (url) {
            setLogoUrl(url);
            await supabase.from('site_settings').upsert({ setting_key: 'logo_url', value: url });
            alert('Logo atualizada!');
        }
    };

    // ========== PRODUCTS ==========
    const handleCreateProduct = async () => {
        let priceVal = newProduct.price;
        if (typeof priceVal === 'string') priceVal = priceVal.replace(/[R$\s.]/g, '').replace(',', '.');
        if (!priceVal || isNaN(Number(priceVal))) priceVal = '0';

        const linkToUse = newProduct.display_type === 'indicado' ? newProduct.link : newProduct.affiliate_link;
        const maxOrder = products.filter(p => p.display_type === newProduct.display_type).length;

        const { error } = await supabase.from('products').insert([{
            name: newProduct.name, 
            description: newProduct.description, 
            price: priceVal.toString(),
            tag: newProduct.tag, 
            image_url: newProduct.image_url, 
            affiliate_link: linkToUse,
            link: linkToUse,
            hide_price: newProduct.hide_price, 
            marketplace: newProduct.display_type === 'destaque' ? 'Loja Automattus' : 'Indicação', 
            product_type: 'Produto',
            display_type: newProduct.display_type,
            sort_order: maxOrder + 1
        }]);
        if (!error) {
            setNewProduct({ 
                name: '', description: '', price: '', tag: '', 
                image_url: '', affiliate_link: '', link: '', 
                hide_price: false, display_type: newProduct.display_type 
            });
            fetchData();
        } else alert(`Erro: ${error.message}`);
    };

    const handleUpdateProduct = async () => {
        if (!editingProduct) return;
        let priceVal = editingProduct.price;
        if (typeof priceVal === 'string') priceVal = priceVal.replace(/[R$\s.]/g, '').replace(',', '.');
        if (!priceVal || isNaN(Number(priceVal))) priceVal = '0';

        const linkToUse = editingProduct.display_type === 'indicado' ? editingProduct.link : editingProduct.affiliate_link;

        const { error } = await supabase.from('products').update({
            name: editingProduct.name, 
            description: editingProduct.description, 
            price: priceVal.toString(),
            tag: editingProduct.tag, 
            image_url: editingProduct.image_url,
            affiliate_link: linkToUse,
            link: linkToUse,
            hide_price: editingProduct.hide_price,
            display_type: editingProduct.display_type
        }).eq('id', editingProduct.id);
        if (!error) { setEditingProduct(null); fetchData(); }
        else alert(`Erro: ${error.message}`);
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm('Excluir produto?')) { await supabase.from('products').delete().eq('id', id); fetchData(); }
    };

    // ========== TESTIMONIALS ==========
    const handleCreateTestimonial = async () => {
        const { error } = await supabase.from('testimonials').insert([{
            name: newTestimonial.name, role: newTestimonial.role,
            content: newTestimonial.content, image_url: newTestimonial.image_url
        }]);
        if (!error) { setNewTestimonial({ name: '', role: '', content: '', image_url: '' }); fetchData(); }
        else alert(`Erro: ${error.message}`);
    };

    const handleUpdateTestimonial = async () => {
        if (!editingTestimonial) return;
        const { error } = await supabase.from('testimonials').update({
            name: editingTestimonial.name, role: editingTestimonial.role,
            content: editingTestimonial.content, image_url: editingTestimonial.image_url
        }).eq('id', editingTestimonial.id);
        if (!error) { setEditingTestimonial(null); fetchData(); }
        else alert(`Erro: ${error.message}`);
    };

    const handleDeleteTestimonial = async (id: string) => {
        if (confirm('Excluir depoimento?')) { await supabase.from('testimonials').delete().eq('id', id); fetchData(); }
    };

    // ========== SYSTEMS ==========
    const handleCreateSistema = async () => {
        const featuresArray = newSistema.features.split('\n').filter(f => f.trim());
        const slug = newSistema.slug || newSistema.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const maxOrder = sistemas.length > 0 ? Math.max(...sistemas.map(s => s.sort_order || 0)) : 0;

        const { error } = await supabase.from('solutions').insert([{
            name: newSistema.name, subtitle: newSistema.subtitle, description: newSistema.description,
            features: featuresArray, icon_name: newSistema.icon_name, badge: newSistema.badge,
            link: newSistema.link, button_text: newSistema.button_text, image_url: newSistema.image_url || '',
            category: newSistema.category, type: newSistema.type, target_audience: newSistema.target_audience,
            slug, sort_order: maxOrder + 1, is_active: true
        }]);
        if (!error) {
            setNewSistema({ name: '', subtitle: '', description: '', features: '', icon_name: 'Building2', badge: '', link: '#contato', button_text: 'Solicitar Demo', image_url: '', category: 'Sistemas', type: 'SaaS', target_audience: '', slug: '' });
            fetchData();
        } else alert(`Erro: ${error.message}`);
    };

    const handleUpdateSistema = async () => {
        if (!editingSistema) return;
        const featuresArray = typeof editingSistema.features === 'string'
            ? editingSistema.features.split('\n').filter((f: string) => f.trim())
            : editingSistema.features;

        const { error } = await supabase.from('solutions').update({
            name: editingSistema.name, subtitle: editingSistema.subtitle, description: editingSistema.description,
            features: featuresArray, icon_name: editingSistema.icon_name, badge: editingSistema.badge,
            link: editingSistema.link, button_text: editingSistema.button_text, image_url: editingSistema.image_url,
            target_audience: editingSistema.target_audience, is_active: editingSistema.is_active
        }).eq('id', editingSistema.id);
        if (!error) { setEditingSistema(null); fetchData(); }
        else alert(`Erro: ${error.message}`);
    };

    const handleDeleteSistema = async (id: string) => {
        if (confirm('Excluir seção de sistema?')) { await supabase.from('solutions').delete().eq('id', id); fetchData(); }
    };

    const handleMoveSistema = async (id: string, direction: 'up' | 'down') => {
        const idx = sistemas.findIndex(s => s.id === id);
        if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === sistemas.length - 1)) return;
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
        const currentOrder = sistemas[idx].sort_order;
        const swapOrder = sistemas[swapIdx].sort_order;
        await Promise.all([
            supabase.from('solutions').update({ sort_order: swapOrder }).eq('id', sistemas[idx].id),
            supabase.from('solutions').update({ sort_order: currentOrder }).eq('id', sistemas[swapIdx].id),
        ]);
        fetchData();
    };

    const handleToggleSistema = async (id: string, isActive: boolean) => {
        await supabase.from('solutions').update({ is_active: !isActive }).eq('id', id);
        fetchData();
    };

    const handleMoveProduct = async (id: string, direction: 'up' | 'down') => {
        const product = products.find(p => p.id === id);
        if (!product) return;
        
        const sameTypeProducts = products.filter(p => p.display_type === product.display_type);
        const idx = sameTypeProducts.findIndex(p => p.id === id);
        
        if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === sameTypeProducts.length - 1)) return;
        
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
        const currentOrder = sameTypeProducts[idx].sort_order || 0;
        const swapOrder = sameTypeProducts[swapIdx].sort_order || 0;
        
        await Promise.all([
            supabase.from('products').update({ sort_order: swapOrder }).eq('id', sameTypeProducts[idx].id),
            supabase.from('products').update({ sort_order: currentOrder }).eq('id', sameTypeProducts[swapIdx].id),
        ]);
        fetchData();
    };

    const handleSwitchType = async (id: string, currentType: 'destaque' | 'indicado') => {
        const newType = currentType === 'destaque' ? 'indicado' : 'destaque';
        const { error } = await supabase.from('products').update({ display_type: newType }).eq('id', id);
        if (!error) fetchData();
        else alert(`Erro ao trocar tipo: ${error.message}`);
    };

    // ========== IMAGE UPLOAD HELPERS ==========
    const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
        if (!e.target.files?.length) return;
        const url = await handleUpload(e.target.files[0], 'products');
        if (url) {
            if (isEditing && editingProduct) setEditingProduct({ ...editingProduct, image_url: url });
            else setNewProduct({ ...newProduct, image_url: url });
        }
    };

    const handleTestimonialImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
        if (!e.target.files?.length) return;
        const url = await handleUpload(e.target.files[0], 'testimonials');
        if (url) {
            if (isEditing && editingTestimonial) setEditingTestimonial({ ...editingTestimonial, image_url: url });
            else setNewTestimonial({ ...newTestimonial, image_url: url });
        }
    };

    // ========== RENDER ==========
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
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-950 border-slate-800 text-white h-12" required />
                        <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-950 border-slate-800 text-white h-12" required />
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

    const tabs: { id: AdminTab; label: string }[] = [
        { id: 'geral', label: 'Geral' },
        { id: 'sistemas', label: 'Sistemas' },
        { id: 'produtos', label: 'Gestão de Produtos' },
        { id: 'depoimentos', label: 'Depoimentos' },
    ];

    const ImageUploadBox = ({ url, onUpload, size = 'md' }: { url: string; onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; size?: 'sm' | 'md' }) => (
        <div className={`border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center relative hover:bg-slate-800/50 transition-colors bg-slate-950 ${size === 'sm' ? 'p-1 h-28 w-28' : 'p-2 h-40 w-40'}`}>
            {uploading ? (
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            ) : url ? (
                <div className="relative w-full h-full">
                    <img src={url} alt="Preview" className="w-full h-full object-cover rounded-md" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md"><Upload className="w-5 h-5 text-white" /></div>
                </div>
            ) : (
                <div className="text-center text-slate-500"><ImageIcon className={`mx-auto mb-1 ${size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'}`} /><span className="text-xs">Imagem</span></div>
            )}
            <input type="file" accept="image/*" onChange={onUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploading} />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Painel Admin</h1>
                    <div className="flex items-center gap-4">
                        <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Voltar ao Site</a>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"><LogOut className="w-4 h-4 mr-2" /> Sair</Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ===== GERAL TAB ===== */}
                {activeTab === 'geral' && (
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Configuração Geral</h2>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-6">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Logo do Site</label>
                                    <ImageUploadBox url={logoUrl} onUpload={handleLogoUpload} />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="font-medium text-white">Logo Atual</h3>
                                    <p className="text-sm text-slate-500">Clique na área pontilhada para fazer upload. A atualização é automática. Recomendamos imagens PNG com fundo transparente.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ===== SISTEMAS TAB ===== */}
                {activeTab === 'sistemas' && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold">Seções de Sistemas</h2>
                        <p className="text-sm text-slate-400 -mt-4">Adicione, edite e reordene as seções de sistemas que aparecem no site.</p>

                        {/* New System Form */}
                        <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 space-y-4">
                            <h3 className="text-sm font-semibold text-emerald-400 mb-2">+ Novo Sistema</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Input placeholder="Nome (ex: Archmattus)" value={newSistema.name} onChange={e => setNewSistema({ ...newSistema, name: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                <Input placeholder="Subtítulo" value={newSistema.subtitle} onChange={e => setNewSistema({ ...newSistema, subtitle: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                <Input placeholder="Badge (ex: Arquitetura)" value={newSistema.badge} onChange={e => setNewSistema({ ...newSistema, badge: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                <Input placeholder="Público-alvo" value={newSistema.target_audience} onChange={e => setNewSistema({ ...newSistema, target_audience: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                <Input placeholder="Ícone (Building2, PenTool, HardHat, Wrench, etc)" value={newSistema.icon_name} onChange={e => setNewSistema({ ...newSistema, icon_name: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                <Input placeholder="Texto do botão" value={newSistema.button_text} onChange={e => setNewSistema({ ...newSistema, button_text: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                <Input placeholder="Link do botão" value={newSistema.link} onChange={e => setNewSistema({ ...newSistema, link: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                <Input placeholder="Slug (auto se vazio)" value={newSistema.slug} onChange={e => setNewSistema({ ...newSistema, slug: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                            </div>
                            <Textarea placeholder="Descrição do sistema..." value={newSistema.description} onChange={e => setNewSistema({ ...newSistema, description: e.target.value })} className="bg-slate-900 border-slate-800 text-white min-h-[80px]" />
                            <Textarea placeholder="Features (uma por linha)" value={newSistema.features} onChange={e => setNewSistema({ ...newSistema, features: e.target.value })} className="bg-slate-900 border-slate-800 text-white min-h-[80px]" />
                            <div className="flex justify-end">
                                <Button onClick={handleCreateSistema} className="bg-emerald-600 hover:bg-emerald-700 text-white"><Plus className="w-4 h-4 mr-2" /> Adicionar Sistema</Button>
                            </div>
                        </div>

                        {/* Systems List */}
                        <div className="space-y-3">
                            {sistemas.length === 0 && <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">Nenhum sistema cadastrado.</div>}
                            {sistemas.map((s, idx) => (
                                <div key={s.id} className="group bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                                    {editingSistema?.id === s.id ? (
                                        <div className="space-y-4">
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <Input value={editingSistema.name} onChange={e => setEditingSistema({ ...editingSistema, name: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Nome" />
                                                <Input value={editingSistema.subtitle || ''} onChange={e => setEditingSistema({ ...editingSistema, subtitle: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Subtítulo" />
                                                <Input value={editingSistema.badge || ''} onChange={e => setEditingSistema({ ...editingSistema, badge: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Badge" />
                                                <Input value={editingSistema.icon_name || ''} onChange={e => setEditingSistema({ ...editingSistema, icon_name: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Ícone" />
                                                <Input value={editingSistema.button_text || ''} onChange={e => setEditingSistema({ ...editingSistema, button_text: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Texto do botão" />
                                                <Input value={editingSistema.link || ''} onChange={e => setEditingSistema({ ...editingSistema, link: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Link" />
                                                <Input value={editingSistema.target_audience || ''} onChange={e => setEditingSistema({ ...editingSistema, target_audience: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Público-alvo" />
                                            </div>
                                            <Textarea value={editingSistema.description} onChange={e => setEditingSistema({ ...editingSistema, description: e.target.value })} className="bg-slate-900 border-slate-800 min-h-[80px]" placeholder="Descrição" />
                                            <Textarea value={Array.isArray(editingSistema.features) ? editingSistema.features.join('\n') : editingSistema.features} onChange={e => setEditingSistema({ ...editingSistema, features: e.target.value })} className="bg-slate-900 border-slate-800 min-h-[80px]" placeholder="Features (uma por linha)" />
                                            <div className="flex gap-2 justify-end">
                                                <Button size="sm" variant="ghost" onClick={() => setEditingSistema(null)}>Cancelar</Button>
                                                <Button size="sm" onClick={handleUpdateSistema} className="bg-blue-600">Salvar</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col gap-1">
                                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleMoveSistema(s.id, 'up')} disabled={idx === 0}><ChevronUp className="w-4 h-4" /></Button>
                                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleMoveSistema(s.id, 'down')} disabled={idx === sistemas.length - 1}><ChevronDown className="w-4 h-4" /></Button>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="font-bold text-lg text-white">{s.name}</h4>
                                                    {s.badge && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-slate-700">{s.badge}</span>}
                                                    {!s.is_active && <span className="text-xs px-2 py-0.5 rounded-full bg-red-900/30 text-red-400 border border-red-900/50">Oculto</span>}
                                                </div>
                                                {s.subtitle && <p className="text-blue-400 text-sm mb-1">{s.subtitle}</p>}
                                                <p className="text-slate-400 text-sm line-clamp-2">{s.description}</p>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <Button size="icon" variant="outline" className="border-slate-700 hover:bg-slate-800" onClick={() => handleToggleSistema(s.id, s.is_active)}>
                                                    {s.is_active ? <Eye className="w-4 h-4 text-slate-300" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                                                </Button>
                                                <Button size="icon" variant="outline" className="border-slate-700 hover:bg-slate-800" onClick={() => setEditingSistema({ ...s, features: Array.isArray(s.features) ? s.features.join('\n') : s.features })}><Edit className="w-4 h-4 text-slate-300" /></Button>
                                                <Button size="icon" variant="destructive" className="bg-red-900/20 hover:bg-red-900/40 border-red-900/50" onClick={() => handleDeleteSistema(s.id)}><Trash className="w-4 h-4 text-red-500" /></Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ===== GESTÃO DE PRODUTOS TAB ===== */}
                {activeTab === 'produtos' && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold text-gradient-blue">Gestão de Produtos</h2>
                        <p className="text-sm text-slate-400 -mt-4">Gerencie Destaques da Loja e Produtos Indicados em um só lugar.</p>

                        {/* New Product Form */}
                        <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 space-y-6">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="w-full sm:w-40 shrink-0">
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Imagem</label>
                                    <ImageUploadBox url={newProduct.image_url} onUpload={(e) => handleProductImageUpload(e)} />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nome</label>
                                            <Input placeholder="Nome do Produto" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tipo de Exibição</label>
                                            <select 
                                                value={newProduct.display_type} 
                                                onChange={e => setNewProduct({ ...newProduct, display_type: e.target.value as any })}
                                                className="w-full h-10 rounded-md bg-slate-950 border border-slate-800 text-sm px-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                                            >
                                                <option value="destaque">Destaque da Loja</option>
                                                <option value="indicado">Produto Indicado (Recomendação)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Preço</label>
                                            <Input placeholder="R$ 0,00" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                        </div>
                                        {newProduct.display_type === 'destaque' ? (
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tag (Opcional)</label>
                                                <Input placeholder="Novo, Oferta, etc" value={newProduct.tag} onChange={e => setNewProduct({ ...newProduct, tag: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                            </div>
                                        ) : (
                                            <div className="col-span-1" />
                                        )}
                                        <div className="sm:col-span-2 space-y-1.5">
                                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Link de Destino (URL)</label>
                                            <Input 
                                                placeholder="https://..." 
                                                value={newProduct.display_type === 'indicado' ? newProduct.link : newProduct.affiliate_link} 
                                                onChange={e => setNewProduct({ ...newProduct, [newProduct.display_type === 'indicado' ? 'link' : 'affiliate_link']: e.target.value })} 
                                                className="bg-slate-950 border-slate-800 text-white" 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-1">
                                        <input type="checkbox" id="new-hide-price" checked={newProduct.hide_price} onChange={e => setNewProduct({ ...newProduct, hide_price: e.target.checked })} className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600" />
                                        <label htmlFor="new-hide-price" className="text-sm text-slate-400 cursor-pointer">Ocultar valor na vitrine (mostrar "Consulte")</label>
                                    </div>
                                    {newProduct.display_type === 'destaque' && (
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Descrição (Destaques apenas)</label>
                                            <Textarea placeholder="Breve descrição do produto..." value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="bg-slate-900 border-slate-800 text-white min-h-[80px]" />
                                        </div>
                                    )}
                                    <div className="flex justify-end pt-2">
                                        <Button onClick={handleCreateProduct} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]" disabled={uploading}><Plus className="w-4 h-4 mr-2" /> Salvar Produto</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Consolidated Product List */}
                        <div className="space-y-8">
                            {['destaque', 'indicado'].map((type) => {
                                const filteredItems = products.filter(p => p.display_type === type);
                                return (
                                    <div key={type} className="space-y-4">
                                        <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-4 py-1">
                                            <h3 className="text-lg font-bold text-white uppercase tracking-tight">{type === 'destaque' ? 'Destaques da Loja' : 'Produtos Indicados'}</h3>
                                            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">{filteredItems.length}</span>
                                        </div>
                                        <div className="grid gap-3">
                                            {filteredItems.length === 0 && <div className="text-center py-8 text-slate-600 bg-slate-900/20 rounded-xl border border-dashed border-slate-800 text-sm italic">Nenhum item nesta categoria.</div>}
                                            {filteredItems.map((product, pIdx) => (
                                                <div key={product.id} className="group relative flex flex-col sm:flex-row gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                                                    {editingProduct?.id === product.id ? (
                                                        <div className="flex-1 space-y-4 w-full">
                                                            <div className="flex flex-col sm:flex-row gap-6">
                                                                <div className="w-full sm:w-32 shrink-0"><ImageUploadBox url={editingProduct.image_url} onUpload={(e) => handleProductImageUpload(e, true)} size="sm" /></div>
                                                                <div className="flex-1 space-y-3">
                                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                                        <Input value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Nome" />
                                                                        <Input value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Preço" />
                                                                        <select 
                                                                            value={editingProduct.display_type} 
                                                                            onChange={e => setEditingProduct({ ...editingProduct, display_type: e.target.value as any })}
                                                                            className="w-full h-10 rounded-md bg-slate-950 border border-slate-800 text-sm px-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                                                                        >
                                                                            <option value="destaque">Destaque da Loja</option>
                                                                            <option value="indicado">Produto Indicado</option>
                                                                        </select>
                                                                        {editingProduct.display_type === 'destaque' ? (
                                                                            <Input value={editingProduct.tag || ''} onChange={e => setEditingProduct({ ...editingProduct, tag: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Tag" />
                                                                        ) : (
                                                                            <div />
                                                                        )}
                                                                        <Input 
                                                                            value={editingProduct.display_type === 'indicado' ? editingProduct.link : editingProduct.affiliate_link} 
                                                                            onChange={e => setEditingProduct({ ...editingProduct, [editingProduct.display_type === 'indicado' ? 'link' : 'affiliate_link']: e.target.value })} 
                                                                            className="sm:col-span-2 bg-slate-950 border-slate-800" placeholder="URL" 
                                                                        />
                                                                    </div>
                                                                    {editingProduct.display_type === 'destaque' && (
                                                                        <Textarea value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="bg-slate-900 border-slate-800 min-h-[60px]" placeholder="Descrição" />
                                                                    )}
                                                                    <div className="flex gap-2 justify-end">
                                                                        <Button size="sm" variant="ghost" onClick={() => setEditingProduct(null)}>Cancelar</Button>
                                                                        <Button size="sm" onClick={handleUpdateProduct} className="bg-blue-600">Atualizar</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {type === 'indicado' && (
                                                                <div className="flex flex-col gap-1 pr-2 shrink-0 justify-center">
                                                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleMoveProduct(product.id, 'up')} disabled={pIdx === 0}><ChevronUp className="w-3 h-3" /></Button>
                                                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleMoveProduct(product.id, 'down')} disabled={pIdx === filteredItems.length - 1}><ChevronDown className="w-3 h-3" /></Button>
                                                                </div>
                                                            )}
                                                            <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                                                                {product.image_url ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-700"><ImageIcon className="w-6 h-6" /></div>}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-0.5">
                                                                    <h4 className="font-bold text-white text-sm">{product.name}</h4>
                                                                    {product.tag && <span className="text-[10px] px-1.5 py-0 rounded-full bg-blue-900/30 text-blue-400 border border-blue-900/50 uppercase">{product.tag}</span>}
                                                                </div>
                                                                {product.description && <p className="text-slate-500 text-xs line-clamp-1 mb-1">{product.description}</p>}
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-emerald-400 font-bold text-xs">{product.hide_price ? 'Consulte' : `R$ ${Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span>
                                                                    <span className="text-[10px] text-slate-600 font-mono truncate max-w-[200px]">{product.display_type === 'indicado' ? product.link : product.affiliate_link}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex sm:flex-row gap-1 shrink-0 ml-auto items-center">
                                                                <Button 
                                                                    size="icon" 
                                                                    variant="outline" 
                                                                    title={type === 'destaque' ? 'Mover para Indicados' : 'Mover para Loja'} 
                                                                    className="h-8 w-8 border-slate-800 hover:bg-slate-800" 
                                                                    onClick={() => handleSwitchType(product.id, type as any)}
                                                                >
                                                                    <RefreshCcw className={`w-3.5 h-3.5 ${type === 'destaque' ? 'text-emerald-500' : 'text-blue-500'}`} />
                                                                </Button>
                                                                <Button size="icon" variant="outline" className="h-8 w-8 border-slate-800 hover:bg-slate-800" onClick={() => setEditingProduct(product)}><Edit className="w-3.5 h-3.5 text-slate-400" /></Button>
                                                                <Button size="icon" variant="destructive" className="h-8 w-8 bg-red-950/20 hover:bg-red-950/40 border-red-900/20" onClick={() => handleDeleteProduct(product.id)}><Trash className="w-3.5 h-3.5 text-red-500" /></Button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}


                {/* ===== DEPOIMENTOS TAB ===== */}
                {activeTab === 'depoimentos' && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold">Depoimentos de Clientes</h2>

                        {/* New Testimonial Form */}
                        <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 space-y-6">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="w-full sm:w-40 shrink-0">
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Foto</label>
                                    <ImageUploadBox url={newTestimonial.image_url} onUpload={(e) => handleTestimonialImageUpload(e)} />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <Input placeholder="Nome do Cliente" value={newTestimonial.name} onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                        <Input placeholder="Cargo/Empresa" value={newTestimonial.role} onChange={e => setNewTestimonial({ ...newTestimonial, role: e.target.value })} className="bg-slate-950 border-slate-800 text-white" />
                                    </div>
                                    <Textarea placeholder="Depoimento..." value={newTestimonial.content} onChange={e => setNewTestimonial({ ...newTestimonial, content: e.target.value })} className="bg-slate-900 border-slate-800 text-white h-24" />
                                    <div className="flex justify-end">
                                        <Button onClick={handleCreateTestimonial} className="bg-emerald-600 hover:bg-emerald-700 text-white" disabled={uploading}><Plus className="w-4 h-4 mr-2" /> Adicionar Depoimento</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonials List */}
                        <div className="space-y-4">
                            {testimonials.length === 0 && <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">Nenhum depoimento cadastrado.</div>}
                            {testimonials.map(t => (
                                <div key={t.id} className="group flex flex-col sm:flex-row gap-6 bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                                    {editingTestimonial?.id === t.id ? (
                                        <div className="flex-1 space-y-3 w-full">
                                            <div className="flex flex-col sm:flex-row gap-6">
                                                <div className="w-full sm:w-32 shrink-0"><ImageUploadBox url={editingTestimonial.image_url} onUpload={(e) => handleTestimonialImageUpload(e, true)} size="sm" /></div>
                                                <div className="flex-1 space-y-3">
                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        <Input value={editingTestimonial.name} onChange={e => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Nome" />
                                                        <Input value={editingTestimonial.role} onChange={e => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="Cargo" />
                                                    </div>
                                                    <Textarea value={editingTestimonial.content} onChange={e => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })} className="bg-slate-900 border-slate-800" placeholder="Conteúdo" />
                                                    <div className="flex gap-2 justify-end">
                                                        <Button size="sm" variant="ghost" onClick={() => setEditingTestimonial(null)}>Cancelar</Button>
                                                        <Button size="sm" onClick={handleUpdateTestimonial} className="bg-blue-600">Salvar</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-slate-950 border border-slate-800">
                                                {t.image_url ? <img src={t.image_url} alt={t.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-700"><ImageIcon className="w-6 h-6" /></div>}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="font-bold text-white">{t.name}</h4>
                                                    <span className="text-sm text-slate-400">{t.role}</span>
                                                </div>
                                                <p className="text-slate-400 text-sm italic line-clamp-2">"{t.content}"</p>
                                            </div>
                                            <div className="flex sm:flex-col gap-2">
                                                <Button size="icon" variant="outline" className="border-slate-700 hover:bg-slate-800" onClick={() => setEditingTestimonial(t)}><Edit className="w-4 h-4 text-slate-300" /></Button>
                                                <Button size="icon" variant="destructive" className="bg-red-900/20 hover:bg-red-900/40 border-red-900/50" onClick={() => handleDeleteTestimonial(t.id)}><Trash className="w-4 h-4 text-red-500" /></Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
