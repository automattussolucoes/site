import { MapPin, Phone, Mail, ExternalLink, Instagram, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const quickLinks = [
  { name: 'Automação', href: '#automacao' },
  { name: 'Sistemas', href: '#sistemas' },
  { name: 'Produtos', href: '#produtos' },
  { name: 'Contato', href: '#contato' },
  { name: 'Admin', href: '/admin' },
];

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-sm max-w-md ${type === 'success'
          ? 'bg-emerald-950/95 border-emerald-800 text-emerald-100'
          : 'bg-red-950/95 border-red-800 text-red-100'
        }`}
      role="alert"
      aria-live="polite"
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
      )}
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-white/60 hover:text-white transition-colors shrink-0"
        aria-label="Fechar notificação"
      >
        ✕
      </button>
    </motion.div>
  );
}

export default function Footer() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-white border-t border-gray-100">
      <div className="section-padding max-w-6xl mx-auto py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="group inline-block">
              <img src="/logo-escura.png" alt="Automattus Logo" className="h-8 w-auto group-hover:opacity-80 transition-opacity" />
            </a>
            <p className="text-[#64748B] text-sm mt-4 leading-relaxed">
              Automação de Casas e Sistemas de Empresas que entregam resultados mensuráveis.
            </p>
            <div className="flex mt-6">
              <a
                href="https://instagram.com/automatushome"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Automattus (abre em nova aba)"
                className="flex items-center gap-3 text-[#64748B] hover:text-[#2563EB] transition-colors group/insta"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center group-hover/insta:bg-gray-200 transition-colors">
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium">@automatushome</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#1E293B] font-semibold text-sm mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-[#64748B] hover:text-[#2563EB] text-sm transition-colors block py-0.5"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-[#64748B] hover:text-[#2563EB] text-sm transition-colors flex items-center gap-1.5 py-0.5"
                    >
                      {link.name}
                      {link.href === '/admin' && <Shield className="w-3.5 h-3.5 opacity-40" aria-hidden="true" />}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Store */}
          <div>
            <h4 className="text-[#1E293B] font-semibold text-sm mb-4">Loja Online</h4>
            <p className="text-[#64748B] text-sm mb-4">
              Conheça nossos produtos de automação na Loja Automattus.
            </p>
            <a
              href="https://loja.automattus.com.br"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Loja Automattus (abre em nova aba)"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-[#64748B] hover:text-[#2563EB] hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Visitar Loja
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#1E293B] font-semibold text-sm mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2563EB] mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[#1E293B] text-sm font-medium">(84) 98609-4938</p>
                  <p className="text-[#64748B] text-xs">WhatsApp Business</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#2563EB] mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[#1E293B] text-sm font-medium italic">contato@automattus.com.br</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2563EB] mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[#1E293B] text-sm font-medium">Rua Otávio Lamartine, 558</p>
                  <p className="text-[#64748B] text-xs">Petrópolis, Natal - RN</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-gray-50/30">
        <div className="section-padding max-w-6xl mx-auto py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-[#94A3B8] text-xs">
              &copy; {new Date().getFullYear()} Automattus. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => {
                  showToast('Página em desenvolvimento. Em breve nossa Política de Privacidade estará disponível.', 'error');
                }}
                className="text-[#94A3B8] hover:text-[#2563EB] text-xs transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Política de Privacidade
              </button>
              <button
                onClick={() => {
                  showToast('Página em desenvolvimento. Em breve nossos Termos de Uso estarão disponíveis.', 'error');
                }}
                className="text-[#94A3B8] hover:text-[#2563EB] text-xs transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Termos de Uso
              </button>
              <Link to="/admin" className="text-[#94A3B8] hover:text-[#2563EB] text-xs transition-colors flex items-center gap-1.5">
                Admin
                <Shield className="w-3 h-3 opacity-40" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </footer>
  );
}
