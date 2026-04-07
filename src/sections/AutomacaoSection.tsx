import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Home, Building2, Lightbulb, Shield, Thermometer, Mic, Smartphone, Wifi, ArrowRight } from 'lucide-react';

const projetos = [
    {
        id: 'residencial',
        icon: Home,
        title: 'Automação Residencial',
        subtitle: 'Casas inteligentes que impressionam',
        description: 'Transforme sua residência em um ambiente verdadeiramente inteligente, com controle total da iluminação, climatização, segurança e entretenimento.',
        features: [
            { icon: Lightbulb, text: 'Iluminação Cênica Programável' },
            { icon: Shield, text: 'Segurança Integrada 24h' },
            { icon: Thermometer, text: 'Climatização Adaptativa' },
            { icon: Mic, text: 'Controle por Voz (Alexa/Google)' },
            { icon: Smartphone, text: 'App de Controle Remoto' },
            { icon: Wifi, text: 'Integração Total de Dispositivos' },
        ],
    },
    {
        id: 'empresarial',
        icon: Building2,
        title: 'Automação Empresarial',
        subtitle: 'Tecnologia que escala seu negócio',
        description: 'Ambientes corporativos inteligentes que aumentam a produtividade, reduzem custos operacionais e proporcionam segurança de ponta.',
        features: [
            { icon: Shield, text: 'Controle de Acesso Corporativo' },
            { icon: Lightbulb, text: 'Iluminação por Presença' },
            { icon: Thermometer, text: 'HVAC Inteligente' },
            { icon: Wifi, text: 'Rede e Infraestrutura IoT' },
            { icon: Smartphone, text: 'Painel de Controle Centralizado' },
            { icon: Mic, text: 'Salas de Reunião Automatizadas' },
        ],
    },
];

export default function AutomacaoSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const scrollToContato = () => {
        const el = document.querySelector('#contato');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="automacao" className="relative py-24 bg-[#F8FAFC]">
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
                        Automação
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
                        Automação para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">Todo Ambiente</span>
                    </h2>
                    <p className="text-[#64748B] max-w-3xl mx-auto">
                        Do conforto da sua casa à eficiência do seu negócio.
                    </p>
                </motion.div>

                {/* Project Cards */}
                <div className="grid lg:grid-cols-2 gap-6 mb-12">
                    {projetos.map((projeto, i) => (
                        <motion.div
                            key={projeto.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-[#2563EB]/30 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-transparent opacity-50" />
                            <div className="relative p-6 sm:p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-transparent border border-gray-100 flex items-center justify-center">
                                        <projeto.icon className="w-7 h-7 text-[#2563EB]" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1E293B]">{projeto.title}</h3>
                                        <p className="text-[#2563EB] text-sm">{projeto.subtitle}</p>
                                    </div>
                                </div>

                                <p className="text-[#64748B] text-sm mb-6 leading-relaxed">{projeto.description}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {projeto.features.map((feature, fi) => (
                                        <div key={fi} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#F8FAFC] border border-gray-100">
                                            <feature.icon className="w-4 h-4 text-[#2563EB] shrink-0" aria-hidden="true" />
                                            <span className="text-xs text-[#475569]">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={scrollToContato}
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-base transition-colors shadow-lg shadow-[#2563EB]/20"
                    >
                        Solicite sua Automação
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
