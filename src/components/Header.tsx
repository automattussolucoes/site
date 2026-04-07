import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const navLinks = [
  { name: 'Automação', href: '#automacao', external: false },
  { name: 'Projetos', href: '/projetos', external: false },
  { name: 'Comparador', href: 'https://compare.automattus.com.br', external: true },
  { name: 'Sistema', href: 'https://sistema.automattus.com.br', external: true },
  { name: 'Blog', href: 'https://blog.automattus.com.br', external: true },
  { name: 'Contato', href: '#contato', external: false },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSettings() {
      const { data} = await supabase.from('site_settings').select('value').eq('setting_key', 'logo_url').single();
      if (data?.value) setLogoUrl(data.value);
    }
    loadSettings();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Detect active section (only for internal links)
      const internalLinks = navLinks.filter(l => !l.external).map(link => link.href.slice(1));
      for (const section of internalLinks) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#2563EB] focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>
      
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg'
          : 'bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/50'
          }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link to="/" className="flex items-center gap-2">
                {logoUrl ? (
                  <img src={logoUrl} alt="Automattus" className="h-6 w-auto object-contain" />
                ) : (
                  <span className="text-xl font-bold tracking-tight text-white">
                    Auto<span className="text-[#2563EB]">mattus</span>
                  </span>
                )}
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
              {navLinks.map((link) => (
                link.external ? (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -1 }}
                    aria-label={`Ir para ${link.name} (abre em nova aba)`}
                    className="text-sm text-slate-300 hover:text-white transition-colors relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-2 py-1"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-[2px] bg-[#2563EB] transition-all duration-300 w-0 group-hover:w-full" />
                  </motion.a>
                ) : (
                  <motion.button
                    key={link.name}
                    whileHover={{ y: -1 }}
                    onClick={() => scrollToSection(link.href)}
                    aria-label={`Ir para seção ${link.name}`}
                    aria-current={activeSection === link.href ? 'page' : undefined}
                    className={`text-sm transition-colors relative group cursor-pointer bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-2 py-1 ${
                      activeSection === link.href ? 'text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#2563EB] transition-all duration-300 ${
                      activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </motion.button>
                )
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="https://loja.automattus.com.br"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Loja
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-slate-950 rounded"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl border-l border-gray-200 p-6 pt-20"
              aria-label="Menu de navegação mobile"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  link.external ? (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      aria-label={`Ir para ${link.name} (abre em nova aba)`}
                      className="px-4 py-3 rounded-lg transition-all block text-left w-full text-[#475569] hover:text-[#1E293B] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    >
                      {link.name}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(link.href)}
                      aria-label={`Ir para seção ${link.name}`}
                      aria-current={activeSection === link.href ? 'page' : undefined}
                      className={`px-4 py-3 rounded-lg transition-all block text-left w-full bg-transparent border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
                        activeSection === link.href 
                          ? 'text-[#2563EB] bg-[#2563EB]/10 font-semibold' 
                          : 'text-[#475569] hover:text-[#1E293B] hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </motion.button>
                  )
                ))}

                <motion.a
                  href="https://loja.automattus.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  aria-label="Visitar loja online (abre em nova aba)"
                  className="mt-4 mx-4 px-4 py-3 rounded-lg bg-[#2563EB] text-white text-sm font-medium flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Loja Online
                </motion.a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
