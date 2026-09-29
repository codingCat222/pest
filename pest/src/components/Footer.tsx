import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { NavigationPage } from '../types';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenEligibility: () => void;
  onOpenBooking: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenEligibility,
  onOpenBooking,
  onOpenLogin,
}) => {
  const linkClass =
    'block text-left text-sm text-white/70 hover:text-brand-green-light transition-colors cursor-pointer';

  const headingClass =
    'text-xs font-bold uppercase tracking-widest text-brand-green-light mb-4';

  return (
    <footer className="bg-brand-purple text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr] gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xl font-extrabold tracking-tight cursor-pointer text-left"
            >
              <span className="text-brand-green-light">Free Pest</span>{' '}
              <span className="text-white">Products</span>
            </button>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Free pest-control products. Pay delivery. Professional help when you need it.
            </p>
            <button
              type="button"
              onClick={onOpenEligibility}
              className="inline-flex items-center bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer"
            >
              GET YOUR FREE PRODUCTS
            </button>
          </div>

          {/* Explore */}
          <div>
            <h3 className={headingClass}>Explore</h3>
            <ul className="space-y-2.5">
              <li><button type="button" onClick={() => onNavigate('how-it-works')} className={linkClass}>How It Works</button></li>
              <li><button type="button" onClick={() => onNavigate('free-products')} className={linkClass}>Free Products</button></li>
              <li><button type="button" onClick={() => onNavigate('rats-mice')} className={linkClass}>Rats &amp; Mice</button></li>
              <li><button type="button" onClick={() => onNavigate('bedbugs')} className={linkClass}>Bedbugs</button></li>
              <li><button type="button" onClick={() => onNavigate('cockroaches')} className={linkClass}>Cockroaches</button></li>
              <li><button type="button" onClick={() => onNavigate('foxes')} className={linkClass}>Foxes</button></li>
              <li><button type="button" onClick={() => onNavigate('professional-treatment')} className={linkClass}>Professional Treatment</button></li>
              <li><button type="button" onClick={() => onNavigate('proofing')} className={linkClass}>Proofing</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={headingClass}>Company</h3>
            <ul className="space-y-2.5">
              <li><button type="button" onClick={() => onNavigate('about-us')} className={linkClass}>About Us</button></li>
              <li><button type="button" onClick={() => onNavigate('faqs')} className={linkClass}>FAQs</button></li>
              <li><button type="button" onClick={() => onNavigate('contact')} className={linkClass}>Contact</button></li>
              <li><button type="button" onClick={onOpenBooking} className={linkClass}>Book £99 Visit</button></li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className={headingClass}>Customer</h3>
            <ul className="space-y-2.5">
              <li><button type="button" onClick={onOpenLogin} className={linkClass}>Log in</button></li>
              <li><button type="button" onClick={onOpenLogin} className={linkClass}>My Dashboard</button></li>
              <li><button type="button" onClick={onOpenLogin} className={linkClass}>My Orders</button></li>
              <li><button type="button" onClick={onOpenLogin} className={linkClass}>My Appointments</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className={headingClass}>Contact</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-green-light shrink-0 mt-0.5" />
                <span>support@freepestproducts.co.uk</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-green-light shrink-0 mt-0.5" />
                <span>0800 048 7291</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-green-light shrink-0 mt-0.5" />
                <span>[Company address]</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Safety note: from the compliance direction in the spec */}
        <div className="mt-12 pt-6 border-t border-white/15">
          <p className="text-xs text-white/55 leading-relaxed max-w-3xl">
            Always read the product label and follow the supplied instructions. Use products only for their authorised
            purpose, and keep them away from children, pets and non-target animals.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <span>© {new Date().getFullYear()} [Legal company name]. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => onNavigate('terms')} className="hover:text-brand-green-light transition-colors cursor-pointer">
              Terms &amp; Conditions
            </button>
            <button type="button" onClick={() => onNavigate('privacy')} className="hover:text-brand-green-light transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button type="button" onClick={() => onNavigate('cookies')} className="hover:text-brand-green-light transition-colors cursor-pointer">
              Cookie Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};