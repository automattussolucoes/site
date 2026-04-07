import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, ShoppingBag } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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

const formatPrice = (price: number | string): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return 'Consulte';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num);
};

export default function Produtos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const { data } = await supabase.from('products').select('*').eq('display_type', 'destaque').order('created_at', { ascending: false });
        if (data) setProducts(data);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <section id="produtos" className="relative py-24 bg-white">
      <div className="section-padding max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-sm mb-4">
              Produtos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">
              <span className="text-gradient-blue">Destaques da Loja</span>
            </h2>
          </div>

          <motion.a
            href="https://loja.automattus.com.br"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-[#2563EB] text-sm"
            aria-label="Ver catálogo completo na loja online (abre em nova aba)"
          >
            Ver Catálogo Completo
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {isLoading ? (
            // Loading skeletons
            [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden bg-[#F8FAFC] border border-gray-200 animate-pulse"
              >
                <div className="aspect-[3/2] bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                  </div>
                </div>
              </div>
            ))
          ) : products.length === 0 ? (
            <div className="col-span-2 lg:col-span-4 text-center py-12 text-gray-400 border border-dashed border-gray-200 rounded-xl">
              <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-gray-300" aria-hidden="true" />
              <p className="font-medium">Em breve novidades na loja</p>
            </div>
          ) : (
            products.map((produto) => (
              <motion.div
                key={produto.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative rounded-xl overflow-hidden bg-[#F8FAFC] border border-gray-200 hover:border-[#2563EB]/30 hover:shadow-md transition-all flex flex-col h-full"
              >
                {/* Image */}
                <a
                  href={produto.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-[3/2] bg-white flex items-center justify-center overflow-hidden border-b border-gray-100 cursor-pointer p-4"
                  aria-label={`Ver ${produto.name} na loja (abre em nova aba)`}
                >
                  {produto.image_url ? (
                    <img src={produto.image_url} alt={produto.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <ShoppingBag className="w-8 h-8 text-gray-300" aria-hidden="true" />
                  )}
                </a>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Tag */}
                  {produto.tag && (
                    <div className="mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-[10px] font-bold uppercase tracking-wider">
                        {produto.tag}
                      </span>
                    </div>
                  )}

                  <a
                    href={produto.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E293B] font-semibold mb-1 group-hover:text-[#2563EB] transition-colors line-clamp-1 block text-sm"
                    aria-label={`${produto.name} (abre em nova aba)`}
                  >
                    {produto.name}
                  </a>
                  <p className="text-[#64748B] text-xs mb-3 line-clamp-2 flex-1 hidden sm:block">
                    {produto.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <span className="text-[#2563EB] font-bold text-sm">
                      {produto.hide_price ? 'Consulte' : formatPrice(produto.price)}
                    </span>
                    <a
                      href={produto.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-50 text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#2563EB]/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label={`Abrir ${produto.name} na loja externa (abre em nova aba)`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://loja.automattus.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-[#475569] hover:bg-gray-200 hover:text-[#1E293B] transition-colors text-sm"
            aria-label="Acessar loja online completa (abre em nova aba)"
          >
            <ExternalLink className="w-4 h-4" />
            Acessar Loja Online
          </a>
        </motion.div>
      </div>
    </section>
  );
}
