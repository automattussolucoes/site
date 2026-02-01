import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Depoimentos() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [testimonials, setTestimonials] = useState<any[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
                if (error) throw error;
                if (data) setTestimonials(data);
            } catch (err) {
                console.error('Error fetching testimonials:', err);
            }
        };
        fetchTestimonials();
    }, []);

    // Remove early return to ensure section renders
    // if (testimonials.length === 0) return null;

    return (
        <section className="relative py-24 bg-white border-t border-gray-100">
            <div className="section-padding max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm mb-4">
                        Depoimentos
                    </span>
                    <h2 className="text-3xl font-bold text-[#1E293B]">
                        O que dizem sobre nós
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.length > 0 ? (
                        testimonials.map((t, i) => (
                            <motion.div
                                key={t.id || i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="bg-[#F8FAFC] p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors flex flex-col h-full"
                            >
                                <Quote className="w-8 h-8 text-[#2563EB]/20 mb-6" />

                                <p className="text-gray-600 text-sm italic mb-6 leading-relaxed flex-grow">"{t.content}"</p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                                        {t.image_url ? (
                                            <img src={t.image_url} alt={t.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 font-bold text-lg">
                                                {t.name?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-[#1E293B] font-semibold text-sm">{t.name}</p>
                                        <p className="text-gray-500 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12 text-gray-400">
                            Nenhum depoimento encontrado. Adicione novos depoimentos no painel Admin.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
