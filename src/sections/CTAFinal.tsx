import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Check, Mail, Phone } from 'lucide-react';

export default function CTAFinal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email || whatsapp) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        setWhatsapp('');
      }, 3000);
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
          className="text-center"
        >
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Pronto para o <span className="text-blue-500">Próximo Nível</span>?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Orçamento sem compromisso. Resposta em 24h.
          </p>

          {/* Form */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Solicitação Enviada!</h3>
              <p className="text-slate-400">Entraremos em contato em breve.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu email"
                    className="w-full pl-11 pr-4 py-4 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex-1 relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp"
                    className="w-full pl-11 pr-4 py-4 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
              >
                <Send className="w-4 h-4" />
                Quero Transformar Meu Espaço
              </motion.button>
            </form>
          )}

          {/* Trust Text */}
          <p className="text-slate-600 text-sm mt-6">
            Ao enviar, você concorda com nossa política de privacidade.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
