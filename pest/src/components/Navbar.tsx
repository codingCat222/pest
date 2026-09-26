import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavigationPage } from '../types';

interface NavbarProps {
  currentPage?: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenEligibility: () => void;
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

const SERVICE_PAGES: NavigationPage[] = SERVICE_LINKS.map((l) => l.page);

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
  onOpenEligibility,
  onOpenLogin,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const isServicesActive = SERVICE_PAGES.includes(currentPage);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 cursor-pointer text-left"
          >
            Free Pest Products
          </button>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`transition-colors cursor-pointer ${currentPage === 'home' ? 'text-blue-600 font-semibold' : 'hover:text-slate-950'
                }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => onNavigate('how-it-works')}
              className={`transition-colors cursor-pointer ${currentPage === 'how-it-works' ? 'text-blue-600 font-semibold' : 'hover:text-slate-950'
                }`}
            >
              How It Works
            </button>

            <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                onMouseEnter={() => setServicesOpen(true)}
                className={`flex items-center gap-1 transition-colors cursor-pointer ${isServicesActive ? 'text-blue-600 font-semibold' : 'hover:text-slate-950'
                  }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {servicesOpen && (
                <div
                  onMouseEnter={() => setServicesOpen(true)}
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 text-sm"
                >
                  {SERVICE_LINKS.map((link) => (
                    <button
                      key={link.page}
                      type="button"
                      onClick={() => { onNavigate(link.page); setServicesOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 font-medium text-slate-700"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('about-us')}
              className={`transition-colors cursor-pointer ${currentPage === 'about-us' ? 'text-blue-600 font-semibold' : 'hover:text-slate-950'
                }`}
            >
              About
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className={`transition-colors cursor-pointer ${currentPage === 'contact' ? 'text-blue-600 font-semibold' : 'hover:text-slate-950'
                }`}
            >
              Contact
            </button>

            <button
              type="button"
              onClick={() => onNavigate('faqs')}
              className={`transition-colors cursor-pointer ${currentPage === 'faqs' ? 'text-blue-600 font-semibold' : 'hover:text-slate-950'
                }`}
            >
              FAQ
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenLogin}
              className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors cursor-pointer px-2"
            >
              Log in
            </button>

            <button
              type="button"
              onClick={onOpenEligibility}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Sign up
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenEligibility}
              className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
          <button
            type="button"
            onClick={() => { onNavigate('home'); setMobileOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => { onNavigate('how-it-works'); setMobileOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            How It Works
          </button>

          <div className="py-1 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Services
          </div>
          <div className="grid grid-cols-2 gap-1 pl-2">
            {SERVICE_LINKS.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
                className="text-left py-1 text-xs text-slate-600"
              >
                • {link.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => { onNavigate('about-us'); setMobileOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => { onNavigate('contact'); setMobileOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => { onNavigate('faqs'); setMobileOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            FAQ
          </button>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => { onOpenLogin(); setMobileOpen(false); }}
              className="text-sm font-semibold text-slate-700"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => { onOpenEligibility(); setMobileOpen(false); }}
              className="text-xs font-bold text-blue-600"
            >
              Sign up →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};