import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Instagram, Globe, ExternalLink } from 'lucide-react';

const infos = [
    {
        icon: MapPin,
        title: 'Endereço',
        lines: ['Rua Otávio Lamartine, 558', 'Petrópolis — Natal/RN'],
    },
    {
        icon: Phone,
        title: 'Telefone / WhatsApp',
        lines: ['(84) 98609-4938'],
    },
    {
        icon: Mail,
        title: 'E-mail',
        lines: ['contato@automattus.com.br'],
    },
];

const socials = [
    { icon: Instagram, label: '@automatushome', url: 'https://instagram.com/automatushome' },
    { icon: Globe, label: 'loja.automattus.com.br', url: 'https://loja.automattus.com.br' },
];

export default function Empresa() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="empresa" className="relative py-24 bg-[#F8FAFC]">
            <div className="section-padding max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm mb-4">
                        Sobre Nós
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-4">
                        Conheça a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">Automattus</span>
                    </h2>
                    <p className="text-[#64748B] max-w-3xl mx-auto">
                        Somos especialistas em automação residencial, empresarial e desenvolvimento de sistemas em nossa área de atuação.
                        Nossa missão é elevar o padrão tecnológico dos nossos clientes com soluções inteligentes e acessíveis.
                    </p>
                </motion.div>

                {/* Info Grid */}
                <div className="grid sm:grid-cols-3 gap-6 mb-12">
                    {infos.map((info, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#2563EB]/20 hover:shadow-sm transition-all"
                        >
                            <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-4">
                                <info.icon className="w-5 h-5 text-[#2563EB]" />
                            </div>
                            <h4 className="text-[#1E293B] font-semibold text-sm mb-2">{info.title}</h4>
                            {info.lines.map((line, li) => (
                                <p key={li} className="text-[#64748B] text-sm leading-relaxed">{line}</p>
                            ))}
                        </motion.div>
                    ))}
                </div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    {socials.map((social, i) => (
                        <a
                            key={i}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${social.label} (abre em nova aba)`}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#475569] hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-colors text-sm"
                        >
                            <social.icon className="w-4 h-4" aria-hidden="true" />
                            {social.label}
                            <ExternalLink className="w-3 h-3 opacity-40" aria-hidden="true" />
                        </a>
                    ))}
                </motion.div>
            </div>
        </section >
    );
}
