import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ExternalLink, ShoppingBag, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/sections/Footer';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut' as const,
        },
    },
};

export default function PaginaProdutos() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
            if (data) setProducts(data);
            setLoading(false);
        }
        loadProducts();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="pt-32 pb-24">
                <div className="section-padding max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-4 text-xs font-medium"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Voltar para o Início
                        </a>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Produtos
                        </h1>
                        <p className="text-slate-600 text-lg">
                            Explore nossa seleção completa de produtos e soluções de tecnologia para sua casa ou empresa.
                        </p>
                    </div>

                    {/* Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {loading ? (
                            // Loading skeleton
                            Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 h-[400px] animate-pulse" />
                            ))
                        ) : products.length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500 text-lg">Nenhum produto cadastrado no momento.</p>
                            </div>
                        ) : (
                            products.map((produto) => (
                                <motion.div
                                    key={produto.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -4 }}
                                    className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-blue-500/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                >
                                    {/* Image */}
                                    <a
                                        href={produto.affiliate_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="aspect-[4/3] bg-white flex items-center justify-center overflow-hidden border-b border-slate-100 cursor-pointer p-6"
                                    >
                                        {produto.image_url ? (
                                            <img
                                                src={produto.image_url}
                                                alt={produto.name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <ShoppingBag className="w-12 h-12 text-slate-200" />
                                        )}

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        {/* Tag */}
                                        {produto.tag && (
                                            <div className="mb-3">
                                                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                                                    {produto.tag}
                                                </span>
                                            </div>
                                        )}

                                        <h3 className="text-slate-900 font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {produto.name}
                                        </h3>

                                        <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {produto.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                                            <span className="text-blue-600 font-black text-xl">
                                                {produto.hide_price ? 'Consulte' : `R$ ${produto.price}`}
                                            </span>

                                            <a
                                                href={produto.affiliate_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm"
                                            >
                                                Comprar
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>


                </div>
            </main>

            <Footer />
        </div>
    );
}
