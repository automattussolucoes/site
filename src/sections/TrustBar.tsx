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
    <section className="relative py-12 bg-white border-y border-gray-100">
      <div className="section-padding max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <p className="text-sm text-[#64748B] whitespace-nowrap">
            Atendemos diversos segmentos:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-[#94A3B8] hover:text-[#2563EB] transition-colors"
              >
                <client.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
