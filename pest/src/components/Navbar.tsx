import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { NavigationPage } from '../types';

interface NavbarProps {
  currentPage?: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenEligibility: (pest?: string) => void;
  onOpenLogin: () => void;
}

const SERVICE_LINKS: { page: NavigationPage; label: string }[] = [
  { page: 'free-products', label: 'Free Products' },
  { page: 'professional-treatment', label: 'Professional Treatment' },
  { page: 'proofing', label: 'Proofing' },
  { page: 'rats-mice', label: 'Rats & Mice' },
  { page: 'bedbugs', label: 'Bedbugs' },
  { page: 'cockroaches', label: 'Cockroaches' },
  { page: 'foxes', label: 'Foxes' },
  { page: 'ants', label: 'Ants & Other' },
];

const SEARCH_PESTS = ['Rats or mice', 'Bedbugs', 'Cockroaches', 'Foxes', 'Ants'];

const SERVICE_PAGES: NavigationPage[] = SERVICE_LINKS.map((l) => l.page);

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
  onOpenEligibility,
  onOpenLogin,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchPest, setSearchPest] = useState(SEARCH_PESTS[0]);
  const [pestMenuOpen, setPestMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isServicesActive = SERVICE_PAGES.includes(currentPage);

  const linkClass = (active: boolean) =>
    `whitespace-nowrap transition-colors cursor-pointer ${active ? 'text-brand-green font-semibold' : 'text-brand-purple hover:text-brand-green'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-purple/10">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex items-center h-[76px]">

          {/* Logo */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="shrink-0 whitespace-nowrap text-xl sm:text-[23px] font-extrabold tracking-tight cursor-pointer text-left"
          >
            <span className="text-brand-green">Free Pest</span>{' '}
            <span className="text-brand-purple">Products</span>
          </button>

          {/* Desktop links, stretched across the middle */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-10 xl:gap-12 text-[15px] font-medium px-8">
            <button type="button" onClick={() => onNavigate('home')} className={linkClass(currentPage === 'home')}>
              Home
            </button>

            <button type="button" onClick={() => onNavigate('how-it-works')} className={linkClass(currentPage === 'how-it-works')}>
              How It Works
            </button>

            <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                onMouseEnter={() => setServicesOpen(true)}
                className={`flex items-center gap-1 ${linkClass(isServicesActive)}`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {servicesOpen && (
                <div
                  onMouseEnter={() => setServicesOpen(true)}
                  className="absolute top-full left-0 pt-2 z-50"
                >
                  <div className="w-60 bg-white rounded-xl shadow-xl border border-brand-purple/10 py-2 text-sm">
                    {SERVICE_LINKS.map((link) => (
                      <button
                        key={link.page}
                        type="button"
                        onClick={() => { onNavigate(link.page); setServicesOpen(false); }}
                        className="w-full text-left whitespace-nowrap px-4 py-2 font-medium text-brand-purple hover:bg-brand-green/10 hover:text-brand-green transition-colors"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button type="button" onClick={() => onNavigate('about-us')} className={linkClass(currentPage === 'about-us')}>
              About
            </button>
            <button type="button" onClick={() => onNavigate('contact')} className={linkClass(currentPage === 'contact')}>
              Contact
            </button>
            <button type="button" onClick={() => onNavigate('faqs')} className={linkClass(currentPage === 'faqs')}>
              FAQ
            </button>
          </nav>

          {/* Right side: scroll-reveal search + auth */}
          <div className="hidden md:flex items-center gap-5 ml-auto lg:ml-0 shrink-0">

            {/* Search pill, fades in after the hero */}
            <div
              className={`relative transition-all duration-300 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
            >
              <div className="flex items-center rounded-full border border-brand-purple/20 bg-white shadow-sm pl-4 pr-1 h-11">
                <Search className="w-4 h-4 text-brand-purple/60 shrink-0" />
                <button
                  type="button"
                  onClick={() => onOpenEligibility(searchPest)}
                  className="px-3 text-sm whitespace-nowrap text-brand-purple/60 hover:text-brand-purple text-left cursor-pointer"
                >
                  Check eligibility
                </button>
                <div className="w-px h-6 bg-brand-purple/15" />
                <button
                  type="button"
                  onClick={() => setPestMenuOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-4 text-sm font-semibold whitespace-nowrap text-brand-purple cursor-pointer"
                >
                  <span className="w-28 text-left truncate">{searchPest}</span>
                  <ChevronDown className="w-4 h-4 shrink-0" />
                </button>
              </div>

              {pestMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-brand-purple/10 py-2 z-50">
                  {SEARCH_PESTS.map((pest) => (
                    <button
                      key={pest}
                      type="button"
                      onClick={() => { setSearchPest(pest); setPestMenuOpen(false); }}
                      className={`w-full text-left whitespace-nowrap px-4 py-2 text-sm font-medium hover:bg-brand-green/10 ${pest === searchPest ? 'text-brand-green' : 'text-brand-purple'
                        }`}
                    >
                      {pest}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onOpenLogin}
              className="whitespace-nowrap text-[15px] font-medium text-brand-purple hover:text-brand-green transition-colors cursor-pointer"
            >
              Log in
            </button>

            <button
              type="button"
              onClick={() => onOpenEligibility()}
              className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-[15px] px-7 h-11 rounded-full shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Sign up
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => onOpenEligibility()}
              className="bg-brand-green text-white text-xs font-semibold px-3.5 py-2 rounded-full whitespace-nowrap"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-brand-purple cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-brand-purple/10 px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
          {[
            { page: 'home' as NavigationPage, label: 'Home' },
            { page: 'how-it-works' as NavigationPage, label: 'How It Works' },
          ].map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
              className="block w-full text-left py-2 text-sm font-medium text-brand-purple hover:text-brand-green"
            >
              {link.label}
            </button>
          ))}

          <div className="py-1 px-2 text-[10px] font-bold uppercase tracking-wider text-brand-purple/50">
            Services
          </div>
          <div className="grid grid-cols-2 gap-1 pl-2">
            {SERVICE_LINKS.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
                className="text-left py-1.5 text-xs text-brand-purple/80 hover:text-brand-green"
              >
                {link.label}
              </button>
            ))}
          </div>

          {[
            { page: 'about-us' as NavigationPage, label: 'About' },
            { page: 'contact' as NavigationPage, label: 'Contact' },
            { page: 'faqs' as NavigationPage, label: 'FAQ' },
          ].map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
              className="block w-full text-left py-2 text-sm font-medium text-brand-purple hover:text-brand-green"
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-brand-purple/10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => { onOpenLogin(); setMobileOpen(false); }}
              className="text-sm font-semibold text-brand-purple"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => { onOpenEligibility(); setMobileOpen(false); }}
              className="text-xs font-bold text-brand-green"
            >
              Sign up →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};