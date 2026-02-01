import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Shield, Thermometer, Mic, Smartphone, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/sections/Footer';
import { useState } from 'react';

export default function Automacao() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Solicitação enviada! Entraremos em contato em breve.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950" />
                <div className="section-padding max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                                Residencial & Corporativo
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                                O Futuro da <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                    Sua Casa
                                </span>
                            </h1>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
                                Controle iluminação, clima, segurança e entretenimento com um toque ou comando de voz.
                                Tecnologia invisível que se adapta ao seu estilo de vida.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="https://loja.automattus.com.br" target="_blank" className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold transition-colors inline-flex items-center justify-center gap-2">
                                    Ver Produtos
                                </a>
                                <a href="#contato" className="px-8 py-4 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors text-base font-medium">
                                    Solicitar Projeto
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative aspect-square rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 blur-3xl absolute inset-0" />
                            <img
                                src="https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=1000"
                                alt="Smart Home App"
                                className="relative z-10 rounded-2xl shadow-2xl border border-slate-800/50 hover:scale-105 transition-transform duration-500"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-900/50">
                <div className="section-padding max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Controle Total</h2>
                        <p className="text-slate-400">Tudo integrado em uma única plataforma.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Lightbulb, title: "Iluminação", desc: "Cenas personalizadas para cada momento do dia." },
                            { icon: Thermometer, title: "Climatização", desc: "Temperatura ideal antes mesmo de você chegar." },
                            { icon: Shield, title: "Segurança", desc: "Monitoramento e controle de acesso em tempo real." },
                            { icon: Mic, title: "Comando de Voz", desc: "Integração total com Alexa e Google Assistant." },
                            { icon: Smartphone, title: "App Exclusivo", desc: "Sua casa na palma da mão, de onde estiver." },
                            { icon: User, title: "User Friendly", desc: "Interface intuitiva pensada para todos da família." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/30 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-6 group-hover:bg-blue-500/10 transition-colors">
                                    <feature.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contato" className="py-24 bg-slate-950">
                <div className="section-padding max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold mb-4">Solicite seu Projeto</h2>
                        <p className="text-slate-400">Preencha o formulário e nossa equipe entrará em contato.</p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="bg-slate-900 p-8 rounded-2xl border border-slate-800"
                    >
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Nome Completo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Seu nome"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Telefone</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="(11) 99999-9999"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Mensagem</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                placeholder="Descreva seu projeto..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            Enviar Solicitação
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
