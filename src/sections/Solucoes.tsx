import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Home, Building2, Lightbulb, Shield, Thermometer, Mic, Users, BarChart3, Clock, ArrowRight } from 'lucide-react';

const solucoes = [
  {
    id: 'residencial',
    icon: Home,
    title: 'Residencial',
    subtitle: 'Casas inteligentes que impressionam',
    description: 'Transforme sua residência em um ambiente verdadeiramente inteligente, com controle total da iluminação, climatização, segurança e entretenimento.',
    features: [
      { icon: Lightbulb, text: 'Iluminação cênica programável' },
      { icon: Shield, text: 'Segurança integrada 24h' },
      { icon: Thermometer, text: 'Climatização adaptativa' },
      { icon: Mic, text: 'Controle por voz e APP' },
    ],
    cta: 'Orçamentos',
    badge: 'Automação',
    gradient: 'from-[#2563EB]/10 to-transparent',
    secondaryLink: {
      text: 'Loja Online',
      url: 'https://loja.automattus.com.br',
      external: true
    }
  },
  {
    id: 'empresarial',
    icon: Building2,
    title: 'Empresarial',
    subtitle: 'Tecnologia que escala seu negócio',
    description: 'Sistemas de gestão completos que automatizam processos, aumentam a produtividade e melhoram o relacionamento com seus clientes.',
    features: [
      { icon: Users, text: 'CRM + Automação + Chatbot' },
      { icon: BarChart3, text: 'PDV Varejo e Restaurantes' },
      { icon: Clock, text: 'Sistema para Obras' },
      { icon: Shield, text: 'Sistema para Barbearias' },
    ],
    cta: null,
    badge: 'Sistemas',
    gradient: 'from-[#2563EB]/10 to-transparent',
    secondaryLink: {
      text: 'Demonstração',
      url: '#contato',
      external: false
    }
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function Solucoes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solucoes" className="relative py-24 bg-[#F8FAFC]">
      <div className="section-padding max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-sm mb-4">
            Nossas Soluções
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
            Tecnologia para <span className="text-gradient-blue">Todo Ambiente</span>
          </h2>
          <p className="text-[#64748B] max-w-4xl mx-auto">
            Do conforto da sua casa à eficiência do seu negócio. Soluções personalizadas que entregam resultados.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-6"
        >
          {solucoes.map((solucao) => (
            <motion.div
              key={solucao.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-[#2563EB]/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solucao.gradient} opacity-50`} />

              <div className="relative p-8">
                {/* Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solucao.gradient} border border-gray-100 flex items-center justify-center`}>
                    <solucao.icon className="w-7 h-7 text-[#2563EB]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-medium">
                    {solucao.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-[#1E293B] mb-1">{solucao.title}</h3>
                <p className="text-[#2563EB] text-sm mb-4">{solucao.subtitle}</p>
                <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
                  {solucao.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {solucao.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <feature.icon className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-sm text-[#475569]">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {/* CTA */}
                <div className="flex gap-4">
                  {solucao.cta && (
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection('#contato')}
                      className="flex items-center gap-2 text-[#2563EB] font-medium text-sm group/btn"
                    >
                      {solucao.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  )}

                  {/* @ts-ignore */}
                  {solucao.secondaryLink && (
                    <motion.a
                      href={solucao.secondaryLink.url}
                      target={solucao.secondaryLink.external ? "_blank" : "_self"}
                      rel={solucao.secondaryLink.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!solucao.secondaryLink.external) {
                          e.preventDefault();
                          scrollToSection(solucao.secondaryLink.url);
                        }
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 text-[#2563EB] font-medium text-sm group/btn cursor-pointer"
                    >
                      {solucao.secondaryLink.text}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
