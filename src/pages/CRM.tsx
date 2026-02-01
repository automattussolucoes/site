import { motion } from 'framer-motion';
import { Check, Lock, ArrowRight, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/sections/Footer';
import { useState } from 'react';

export default function CRM() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Acesso restrito. Entre em contato para credenciais.');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center pt-20 pb-12 section-padding">
                <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Landing Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
                            Gestão de Relacionamento
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            Venda Mais com <br />
                            <span className="text-emerald-400">Inteligência</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Centralize seus atendimentos, automatize o follow-up e nunca mais perca uma oportunidade de venda.
                            Nosso CRM integra WhatsApp, E-mail e Telefone em um só lugar.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Atendimento Omnichannel (Zap, Insta, Web)",
                                "Automação de Mensagens e Lembretes",
                                "Funil de Vendas Visual (Kanban)",
                                "Relatórios de Performance em Tempo Real"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-emerald-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="#contato" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                            Solicitar Demonstração <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    {/* Login Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-400" />

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-2">Acesso ao Sistema</h2>
                            <p className="text-slate-500 text-sm">Entre com suas credenciais corporativas.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">E-mail Corporativo</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="nome@empresa.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Senha</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                                    <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0" />
                                    Lembrar-me
                                </label>
                                <a href="#" className="text-emerald-500 hover:text-emerald-400">Esqueceu a senha?</a>
                            </div>

                            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Lock className="w-4 h-4" />
                                Acessar CRM
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                            <p className="text-slate-500 text-xs">
                                Este é um ambiente seguro monitorado 24h.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
