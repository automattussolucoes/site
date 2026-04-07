import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ExternalLink, ShoppingBag, Tag } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ProdutoIndicado {
    id: string;
    name: string;
    price: number;
    image_url: string;
    link: string;
    sort_order: number;
    hide_price: boolean;
}

const formatPrice = (price: number | string): string => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(num)) return 'Consulte';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(num);
};

export default function ProdutosIndicados() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [produtos, setProdutos] = useState<ProdutoIndicado[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('display_type', 'indicado')
                    .order('sort_order', { ascending: true });
                if (error) console.error('Erro ao carregar produtos indicados:', error);
                if (data) setProdutos(data);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    if (!isLoading && produtos.length === 0) return null;

    return (
        <section id="indicados" className="relative py-24 bg-[#F8FAFC]">
            <div className="section-padding max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm mb-4">
                        <Tag className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" aria-hidden="true" />
                        Indicações
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-4">
                        Produtos <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Indicados</span>
                    </h2>
                    <p className="text-[#64748B] max-w-2xl mx-auto">
                        Seleção de produtos que não vendemos na loja mas recomendamos
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {isLoading ? (
                        [1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-xl overflow-hidden bg-white border border-gray-200 animate-pulse">
                                <div className="aspect-square bg-gray-200" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <div className="h-4 bg-gray-200 rounded w-16" />
                                        <div className="h-6 w-12 bg-gray-200 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        produtos.map((produto, i) => (
                            <motion.div
                                key={produto.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                whileHover={{ y: -4 }}
                                className="group rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col"
                            >
                                {/* Image */}
                                <a
                                    href={produto.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100 p-4"
                                    aria-label={`Ver ${produto.name} (abre em nova aba)`}
                                >
                                    {produto.image_url ? (
                                        <img
                                            src={produto.image_url}
                                            alt={produto.name}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <ShoppingBag className="w-8 h-8 text-gray-300" aria-hidden="true" />
                                    )}
                                </a>

                                {/* Content */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h4 className="text-[#1E293B] font-semibold text-sm mb-2 line-clamp-2 flex-1">
                                        {produto.name}
                                    </h4>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <span className="text-emerald-600 font-bold text-sm">
                                            {produto.hide_price ? 'Consulte' : formatPrice(produto.price)}
                                        </span>
                                        <a
                                            href={produto.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-xs font-medium flex items-center gap-1.5 min-h-[44px] min-w-[44px] justify-center"
                                            aria-label={`Ver ${produto.name} na loja (abre em nova aba)`}
                                        >
                                            Ver
                                            <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
