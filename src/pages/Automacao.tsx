import { motion } from 'framer-motion';
import { Lightbulb, Shield, Thermometer, Mic, Smartphone, User, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/sections/Footer';

export default function Automacao() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
                </div>
                <div className="relative z-10 section-padding max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm mb-6">
                            Automação Inteligente
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Automação para{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                Casas e Empresas
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                            Projetos sob medida que transformam espaços comuns em ambientes inteligentes, seguros e eficientes.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 border-t border-slate-800">
                <div className="section-padding max-w-6xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Lightbulb, title: 'Iluminação Inteligente', desc: 'Controle total da iluminação com cenas personalizadas e automação por horário ou presença.' },
                            { icon: Shield, title: 'Segurança Avançada', desc: 'Sistemas de câmeras, alarmes e controle de acesso integrados ao seu smartphone.' },
                            { icon: Thermometer, title: 'Climatização', desc: 'Ar-condicionado e aquecimento automatizados para conforto em qualquer ambiente.' },
                            { icon: Mic, title: 'Controle por Voz', desc: 'Integração com Alexa, Google Home e Siri para controle hands-free.' },
                            { icon: Smartphone, title: 'App de Controle', desc: 'Gerencie tudo pelo celular de qualquer lugar do mundo.' },
                            { icon: User, title: 'Consultoria Personalizada', desc: 'Projeto sob medida para suas necessidades específicas.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-600/30 transition-colors"
                            >
                                <item.icon className="w-8 h-8 text-blue-500 mb-4" aria-hidden="true" />
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact WhatsApp Section */}
            <section id="contato" className="py-24 bg-slate-950">
                <div className="section-padding max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-6">
                            Pronto para começar?
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Fazemos a Automação da sua Casa ou Empresa
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Fale com a gente e descubra como a automação pode transformar a experiência do seu lar ou empresa.
                        </p>
                        
                        <motion.a
                            href="https://wa.me/5584986094938"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#25D366]/20"
                        >
                            Falar no WhatsApp
                            <MessageCircle className="w-6 h-6" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
