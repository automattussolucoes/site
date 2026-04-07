import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle } from 'lucide-react';

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

      <div className="relative z-10 section-padding max-w-4xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium mb-6">
            Pronto para começar?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
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
  );
}
