import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Check, Mail, Phone, ArrowRight } from 'lucide-react';

export default function CTAFinal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mqaebrda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _cc: 'contato@automatushome.com.br',
          _subject: `Novo Contato Home: ${formData.name}`
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Ocorreu um erro ao enviar. Por favor, tente novamente.');
      }
    } catch (error) {
      alert('Erro de conexão. Verifique sua internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Solicitação Enviada!</h3>
              <p className="text-slate-400">Entraremos em contato em breve.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 text-blue-500 hover:text-blue-400 text-sm font-medium"
              >
                Enviar outra mensagem
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6 text-left">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 font-body">Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="mb-8 text-left">
                <label className="block text-sm font-medium text-slate-300 mb-2 font-body">Mensagem</label>
                <textarea
                  required
                  name="mensagem"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
