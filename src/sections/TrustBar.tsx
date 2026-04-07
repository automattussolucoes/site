import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Home, Landmark, Store, Hotel } from 'lucide-react';

const clients = [
  { name: 'Residencial', icon: Home },
  { name: 'Corporativo', icon: Building2 },
  { name: 'Varejo', icon: Store },
  { name: 'Hospitalidade', icon: Hotel },
  { name: 'Institucional', icon: Landmark },
];

export default function TrustBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-12 bg-white border-y border-gray-100" aria-label="Segmentos atendidos">
      <div className="section-padding max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <p className="text-sm text-[#475569] whitespace-nowrap font-medium">
            Atendemos diversos segmentos:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2.5 min-w-[44px] min-h-[44px] px-3 py-2 text-[#64748B] hover:text-[#2563EB] transition-colors rounded-lg hover:bg-gray-50"
              >
                <client.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
