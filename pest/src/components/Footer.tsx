import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { NavigationPage, PestType } from '../types';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenEligibility: (pest?: PestType) => void;
  onOpenBooking: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenEligibility,
  onOpenBooking,
  onOpenLogin
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors text-left"
            >
              Free Pest Products
            </button>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Free pest-control products. Pay delivery. Professional help when you need it.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>0800 048 7291 (Mon–Sat: 8am–7pm)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>support@freepestproducts.co.uk</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>High Holborn House, London WC1V 6BX</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('free-products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Free Products
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('rats-mice')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rats &amp; Mice
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('professional-treatment')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Professional Treatment
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('proofing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Proofing
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('about-us')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Customer
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  type="button"
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Login
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Dashboard
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Orders
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Appointments
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Legal
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('cookies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 leading-normal">
              Always read product labels and supplied instructions. Only use products for authorised purposes. Keep away from non-target animals, children and pets.
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; 2026 Free Pest Products UK Ltd. Registered in England &amp; Wales.
          </div>
          <div className="flex items-center gap-6">
            <span>UK Standards Compliant</span>
            <span>Secure 256-bit SSL</span>
            <span>Royal Mail Tracked</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
