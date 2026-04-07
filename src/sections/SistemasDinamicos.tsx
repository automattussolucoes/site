import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    ArrowRight, Building2, PenTool, HardHat, Wrench, Monitor,
    Code, Settings, Briefcase, BarChart3, ShieldCheck, Check
} from 'lucide-react';

// Icon mapping from string names stored in DB
const iconMap: Record<string, any> = {
    Building2, PenTool, HardHat, Wrench, Monitor, Code, Settings,
    Briefcase, BarChart3, ShieldCheck,
};

interface Sistema {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    features: string[];
    icon_name: string;
    badge: string;
    link: string;
    button_text: string;
    sort_order: number;
}

export default function SistemasDinamicos() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [sistemas, setSistemas] = useState<Sistema[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const { data, error } = await supabase
                    .from('solutions')
                    .select('*')
                    .eq('is_active', true)
                    .order('sort_order', { ascending: true });
                if (error) console.error('Erro ao carregar sistemas:', error);
                if (data) setSistemas(data);
            } catch (err) {
                console.error('Erro inesperado ao carregar sistemas:', err);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    const scrollToSection = (href: string) => {
        if (href.startsWith('#')) {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.open(href.startsWith('http') ? href : `https://${href}`, '_blank');
        }
    };

    if (!isLoading && sistemas.length === 0) return null;

    return (
        <section id="sistemas" className="relative py-24 bg-white">
            <div className="section-padding max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-sm mb-4">
                        Nossos Sistemas
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
                        Sistemas que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">Transformam</span>
                    </h2>
                    <p className="text-[#64748B] max-w-3xl mx-auto">
                        Soluções completas para cada segmento. Tecnologia que otimiza processos e impulsiona resultados.
                    </p>
                </motion.div>

                {/* Systems Grid */}
                <div className="flex flex-wrap justify-center items-stretch gap-6">
                    {isLoading ? (
                        // Loading skeletons
                        [1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl bg-[#F8FAFC] border border-gray-200 p-6 animate-pulse"
                            >
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-gray-200" />
                                    <div className="w-16 h-5 rounded-full bg-gray-200" />
                                </div>
                                <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                                <div className="space-y-2 mb-6">
                                    <div className="h-3 bg-gray-200 rounded w-full" />
                                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                                </div>
                                <div className="space-y-2">
                                    {[1, 2, 3, 4].map((j) => (
                                        <div key={j} className="h-3 bg-gray-200 rounded w-3/4" />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        sistemas.map((sistema, i) => {
                            const IconComponent = iconMap[sistema.icon_name] || Building2;
                            return (
                                <motion.div
                                    key={sistema.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ y: -4 }}
                                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative rounded-2xl overflow-hidden bg-[#F8FAFC] border border-gray-200 hover:border-[#2563EB]/30 hover:shadow-lg transition-all duration-300 flex flex-col"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative p-6 flex flex-col flex-1">
                                        {/* Badge + Icon */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center">
                                                <IconComponent className="w-6 h-6 text-[#2563EB]" aria-hidden="true" />
                                            </div>
                                            {sistema.badge && (
                                                <span className="px-2.5 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-[10px] font-bold uppercase tracking-wider">
                                                    {sistema.badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-lg font-bold text-[#1E293B] mb-1">{sistema.name}</h3>
                                        {sistema.subtitle && (
                                            <p className="text-[#2563EB] text-sm mb-3">{sistema.subtitle}</p>
                                        )}
                                        <p className="text-[#64748B] text-sm mb-5 leading-relaxed flex-1">
                                            {sistema.description}
                                        </p>

                                        {/* Features */}
                                        <ul className="space-y-2 mb-6">
                                            {sistema.features?.map((feature, fi) => (
                                                <li key={fi} className="flex items-center gap-2.5">
                                                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" aria-hidden="true" />
                                                    <span className="text-xs text-[#475569]">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA */}
                                        {sistema.button_text && (
                                            <motion.button
                                                whileHover={{ x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => scrollToSection(sistema.link || '#contato')}
                                                className="flex items-center gap-2 text-[#2563EB] font-medium text-sm mt-auto"
                                            >
                                                {sistema.button_text}
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
