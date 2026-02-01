import { MapPin, Phone, Mail, ExternalLink, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';

const quickLinks = [
  { name: 'Soluções', href: '#solucoes' },
  { name: 'Processo', href: '#processo' },
  { name: 'Contato', href: '#contato' },
  { name: 'Admin', href: '/admin' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

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
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}>
              <span className="text-xl font-bold tracking-tight text-[#2563EB]">
                Automattus
              </span>
            </a>
            <p className="text-[#64748B] text-sm mt-4 leading-relaxed">
              Automação residencial e sistemas empresariais que entregam resultados mensuráveis.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:bg-gray-200 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:bg-gray-200 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#1E293B] font-semibold text-sm mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-[#64748B] hover:text-[#2563EB] text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#1E293B] font-semibold text-sm mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2563EB] mt-0.5" />
                <div>
                  <p className="text-[#1E293B] text-sm">(11) 4000-1234</p>
                  <p className="text-[#64748B] text-xs">WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#2563EB] mt-0.5" />
                <div>
                  <p className="text-[#1E293B] text-sm">contato@automattus.com.br</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2563EB] mt-0.5" />
                <div>
                  <p className="text-[#1E293B] text-sm">Rua Otávio Lamartine 558</p>
                  <p className="text-[#1E293B] text-sm">Petrópolis, Natal-RN</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#2563EB] mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <div>
                  <a href="https://instagram.com/automatushome" target="_blank" rel="noopener noreferrer" className="text-[#1E293B] text-sm hover:text-[#2563EB] transition-colors">
                    @automatushome
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter + Store */}
          <div>
            <h4 className="text-[#1E293B] font-semibold text-sm mb-4">Newsletter</h4>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-[#1E293B] text-sm placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
              />
              <button className="px-3 py-2 rounded-lg bg-[#2563EB] text-white text-sm font-medium hover:brightness-110 transition-colors">
                OK
              </button>
            </div>

            <a
              href="https://loja.automattus.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-[#64748B] hover:text-[#2563EB] hover:bg-gray-200 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Loja Online
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="section-padding max-w-6xl mx-auto py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#94A3B8] text-xs">
              &copy; 2024 Automattus. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[#94A3B8] hover:text-[#2563EB] text-xs transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-[#94A3B8] hover:text-[#2563EB] text-xs transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
