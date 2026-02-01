import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, TrendingUp, Home, Building2 } from 'lucide-react';

const cases = [
  {
    id: 1,
    cliente: 'Residência Jardins',
    tipo: 'Automação Residencial',
    icon: Home,
    metrica: '40%',
    metricaLabel: 'Redução em consumo de energia',
    quote: 'A Automattus transformou nossa casa em um ambiente verdadeiramente inteligente. O controle total pela palma da mão é incrível.',
    autor: 'Carlos M.',
    cargo: 'Proprietário',
  },
  {
    id: 2,
    cliente: 'Rede Varejo Plus',
    tipo: 'Sistema PDV',
    icon: Building2,
    metrica: '+35%',
    metricaLabel: 'Em eficiência de vendas',
    quote: 'O sistema revolucionou nossa operação. Resultados imediatos e suporte técnico impecável.',
    autor: 'Ana P.',
    cargo: 'Diretora de Operações',
  },
  {
    id: 3,
    cliente: 'Grupo Empresarial X',
    tipo: 'CRM Integrado',
    icon: Building2,
    metrica: '+50%',
    metricaLabel: 'Em retenção de clientes',
    quote: 'Automação que realmente funciona. Nossa equipe de vendas nunca foi tão produtiva.',
    autor: 'Roberto S.',
    cargo: 'CEO',
  },
];

export default function Cases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const currentCase = cases[currentIndex];

  return (
    <section id="cases" className="relative py-24 bg-[#F8FAFC]">
      <div className="section-padding max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-sm mb-4">
            Cases de Sucesso
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
            Resultados que <span className="text-gradient-blue">Falam</span>
          </h2>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Histórias reais de clientes que transformaram seus espaços com a Automattus.
          </p>
        </motion.div>

        {/* Case Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left - Metrics */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-[#2563EB]/5 to-transparent">
                <div className="flex items-center gap-3 mb-8">
                  <currentCase.icon className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-sm text-[#64748B]">{currentCase.tipo}</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-6xl lg:text-7xl font-bold text-gradient-blue">
                    {currentCase.metrica}
                  </span>
                </div>
                <p className="text-[#475569] text-lg mb-8">{currentCase.metricaLabel}</p>
                
                <div className="flex items-center gap-2 text-[#22C55E]">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Resultado mensurável em 90 dias</span>
                </div>
              </div>

              {/* Right - Quote */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Quote className="w-10 h-10 text-[#2563EB]/20 mb-6" />
                
                <motion.p
                  key={currentCase.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl lg:text-2xl text-[#475569] leading-relaxed mb-8"
                >
                  &ldquo;{currentCase.quote}&rdquo;
                </motion.p>
                
                <motion.div
                  key={`author-${currentCase.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-[#1E293B] font-semibold">{currentCase.autor}</p>
                  <p className="text-[#64748B] text-sm">{currentCase.cargo}</p>
                  <p className="text-[#94A3B8] text-sm mt-1">{currentCase.cliente}</p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {cases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 bg-[#2563EB]'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
