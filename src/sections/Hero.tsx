import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';

const stats = [
  { value: '100+', label: 'Projetos Entregues' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-white"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#2563EB]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full blur-[200px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(30, 41, 59, 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 section-padding w-full max-w-6xl mx-auto pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Trust Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm"
              >
                <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="text-sm text-[#475569]">
                  <span className="text-[#1E293B] font-semibold">{stat.value}</span> {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1E293B] mb-6 leading-[1.1] tracking-tight"
          >
            Automação que
            <br />
            <span className="text-gradient-blue">Eleva Seu Padrão</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[#64748B] max-w-4xl mx-auto mb-10 leading-relaxed"
          >
            Projetos de Casas e Sistemas de Empresas que entregam resultados mensuráveis. Tecnologia que trabalha para você.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('#contato')}
              className="btn-primary flex items-center gap-2 text-base px-8 py-4"
            >
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.a
              href="https://shop.automattus.com.br"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-outline flex items-center gap-2 text-base px-8 py-4"
            >
              Loja Online
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
    </section>
  );
}
