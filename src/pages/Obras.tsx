import { motion } from 'framer-motion';
import { Check, Lock, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/sections/Footer';
import { useState } from 'react';

export default function Obras() {
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
                        <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-6 border border-orange-500/20">
                            Gestão de Obras & Reformas
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            Controle Total <br />
                            <span className="text-orange-400">do Canteiro</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Sistema especializado para construtoras, empreiteiras e arquitetos.
                            Acompanhe cronogramas, custos e diário de obra em tempo real.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Diário de Obra Digital com Fotos",
                                "Gestão Financeira e Compras",
                                "Cronograma Físico-Financeiro",
                                "Portal do Cliente e Investidor"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-orange-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a href="#contato" className="inline-flex items-center gap-2 text-orange-400 font-medium hover:text-orange-300 transition-colors">
                            Ver Cases de Sucesso <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    {/* Login Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500" />

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-2">Portal da Engenharia</h2>
                            <p className="text-slate-500 text-sm">Acesso para gestores e parceiros.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Usuário</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    placeholder="Seu usuário"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Senha</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                                    <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-orange-500 focus:ring-0" />
                                    Manter conectado
                                </label>
                                <a href="#" className="text-orange-500 hover:text-orange-400">Recuperar senha</a>
                            </div>

                            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Lock className="w-4 h-4" />
                                Entrar no Sistema
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                            <p className="text-slate-500 text-xs">
                                Versão 2.4.0 (Build 2024)
                            </p>
                        </div>
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
