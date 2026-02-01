import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, FileText, Wrench } from 'lucide-react';

const etapas = [
  {
    step: '01',
    title: 'Diagnóstico',
    duration: '1 dia',
    description: 'Análise completa das suas necessidades e levantamento técnico do espaço.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Proposta',
    duration: '2 dias',
    description: 'Projeto personalizado com investimento detalhado e cronograma.',
    icon: FileText,
  },
  {
    step: '03',
    title: 'Implementação',
    duration: '3-7 dias',
    description: 'Instalação profissional e configuração completa do sistema.',
    icon: Wrench,
  },
];

export default function Processo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="processo" className="relative py-24 bg-[#F8FAFC]">
      <div className="section-padding max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-sm mb-4">
            Como Funciona
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
            Processo <span className="text-gradient-blue">Simplificado</span>
          </h2>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Da primeira conversa à entrega final. Transparência e eficiência em cada etapa.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {etapas.map((etapa, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < etapas.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-[#2563EB]/20 to-transparent" />
              )}

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#2563EB]/20 hover:shadow-sm transition-colors h-full">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-[#2563EB]/10">{etapa.step}</span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[#64748B] text-xs">
                    {etapa.duration}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center mb-4">
                  <etapa.icon className="w-5 h-5 text-[#2563EB]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-[#1E293B] mb-2">{etapa.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{etapa.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
