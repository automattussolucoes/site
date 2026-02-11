import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTAFinal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contato" className="relative py-24 overflow-hidden bg-[#020617]">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial Gradient for Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />

      <div className="relative z-10 section-padding max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Solicite seu Projeto</h2>
          <p className="text-slate-400">Preencha o formulário e nossa equipe entrará em contato.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <form
            action="https://formspree.io/f/mqaebrda"
            method="POST"
            className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm"
          >
            {/* Configurações do Formspree */}
            <input type="hidden" name="_cc" value="contato@automatushome.com.br" />
            <input type="hidden" name="_subject" value="Novo Contato: Home Automattus" />

            <div className="grid md:grid-cols-2 gap-6 mb-6 text-left">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-body">Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-body">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="mb-6 text-left">
              <label className="block text-sm font-medium text-slate-300 mb-2 font-body">Telefone</label>
              <input
                type="tel"
                name="telefone"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="mb-8 text-left">
              <label className="block text-sm font-medium text-slate-300 mb-2 font-body">Mensagem</label>
              <textarea
                required
                name="mensagem"
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="Como podemos ajudar?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
