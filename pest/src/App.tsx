import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import {
  CustomerNavTab,
  AdminNavTab,
  PortalPersona,
  CaseRecord,
  PestType,
} from './types';
import { MOCK_CASES, MOCK_ORDERS, INITIAL_PRODUCTS } from './data/mockData';
import { CustomerSidebar } from './components/dashboard/CustomerSidebar';
import { CustomerTopHeader } from './components/dashboard/CustomerTopHeader';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { MyJourneyView } from './components/dashboard/MyJourneyView';
import { ActivityMonitoringView } from './components/dashboard/ActivityMonitoringView';
import { MyOrdersView } from './components/dashboard/MyOrdersView';
import { AppointmentsView } from './components/dashboard/AppointmentsView';
import { ProofingView } from './components/dashboard/ProofingView';
import { DocumentsView } from './components/dashboard/DocumentsView';
import { AccountSettingsView } from './components/dashboard/AccountSettingsView';
import { HelpSupportView } from './components/dashboard/HelpSupportView';
import { MobileBottomNav } from './components/dashboard/MobileBottomNav';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeSections } from './components/HomeSections';
import { Footer } from './components/Footer';
import { EligibilityPage } from './components/pages/EligibilityPage';
import { ProfessionalBookingModal } from './components/ProfessionalBookingModal';
import { LoginPage } from './components/pages/LoginPage';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminOverviewView } from './components/admin/AdminOverviewView';
import { AdminCasesView } from './components/admin/AdminCasesView';
import { AdminProductsView } from './components/admin/AdminProductsView';
import { AdminTechniciansView } from './components/admin/AdminTechniciansView';
import { AdminPaymentsView } from './components/admin/AdminPaymentsView';
import { AdminProofingView } from './components/admin/AdminProofingView';
import { AdminReportsView } from './components/admin/AdminReportsView';
import { CookieBanner } from './components/CookieBanner';
import { HowItWorksPage } from './components/pages/HowItWorksPage';
import { FreeProductsPage } from './components/pages/FreeProductsPage';
import { PestHubPage } from './components/pages/PestHubPage';
import { ProfessionalTreatmentPage } from './components/pages/ProfessionalTreatmentPage';
import { ProofingPage } from './components/pages/ProofingPage';
import { FaqsPage } from './components/pages/FaqsPage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';
import { X } from 'lucide-react';

function PublicLayout({
  onOpenBooking,
  cases,
  setCases,
  setActiveCase,
  activeCase,
  onLoginSuccess,
}: {
  onOpenBooking: () => void;
  cases: CaseRecord[];
  setCases: (c: CaseRecord[]) => void;
  setActiveCase: (c: CaseRecord) => void;
  activeCase: CaseRecord;
  onLoginSuccess: (role: 'customer' | 'admin') => void;
}) {
  const navigate = useNavigate();

  const goToEligibility = (pest?: PestType) => {
    const params = pest ? `?pest=${encodeURIComponent(pest)}` : '';
    navigate(`/check-eligibility${params}`);
  };

  const handleOrderCompleted = (newCase: CaseRecord) => {
    setCases([newCase, ...cases]);
    setActiveCase(newCase);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar
        onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)}
        onOpenEligibility={() => goToEligibility()}
        onOpenLogin={() => navigate('/login')}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero onStartEligibility={goToEligibility} onBookProfessional={onOpenBooking} />
                <HomeSections onStartEligibility={goToEligibility} onBookProfessional={onOpenBooking} />
              </>
            }
          />
          <Route path="/how-it-works" element={<HowItWorksPage onStartEligibility={() => goToEligibility()} onBookProfessional={onOpenBooking} />} />
          <Route path="/free-products" element={<FreeProductsPage onStartEligibility={() => goToEligibility()} />} />
          <Route path="/pests/rats-mice" element={<PestHubPage pestKey="rats-mice" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Rats or mice')} onBookProfessional={onOpenBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/pests/bedbugs" element={<PestHubPage pestKey="bedbugs" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Bedbugs')} onBookProfessional={onOpenBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/pests/cockroaches" element={<PestHubPage pestKey="cockroaches" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Cockroaches')} onBookProfessional={onOpenBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/pests/foxes" element={<PestHubPage pestKey="foxes" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Foxes')} onBookProfessional={onOpenBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/pests/ants" element={<PestHubPage pestKey="ants" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Ants')} onBookProfessional={onOpenBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/professional-treatment" element={<ProfessionalTreatmentPage onBookProfessional={onOpenBooking} />} />
          <Route path="/proofing" element={<ProofingPage onStartEligibility={() => goToEligibility()} onBookProfessional={onOpenBooking} />} />
          <Route path="/faqs" element={<FaqsPage onStartEligibility={() => goToEligibility()} />} />
          <Route path="/about" element={<AboutUsPage onStartEligibility={() => goToEligibility()} />} />
          <Route path="/contact" element={<ContactPage onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/terms" element={<LegalPage initialSection="terms" onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/privacy" element={<LegalPage initialSection="privacy" onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/cookies" element={<LegalPage initialSection="cookies" onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/check-eligibility" element={<EligibilityPage onOrderCompleted={handleOrderCompleted} />} />
          <Route
            path="/login"
            element={
              <LoginPage
                currentCase={activeCase}
                onLoginSuccess={(role) => {
                  onLoginSuccess(role);
                  navigate(role === 'admin' ? '/admin' : '/dashboard');
                }}
                onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)}
              />
            }
          />
        </Routes>
      </main>

      <Footer
        onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)}
        onOpenEligibility={() => goToEligibility()}
        onOpenBooking={onOpenBooking}
        onOpenLogin={() => navigate('/login')}
      />

      <CookieBanner onNavigate={(type) => navigate(`/${type}`)} />
    </div>
  );
}

// ---------- Customer dashboard layout ----------
function DashboardLayout({
  cases,
  activeCase,
  setActiveCase,
  onUpdateActiveCase,
  onOpenBooking,
  onOpenReport,
}: {
  cases: CaseRecord[];
  activeCase: CaseRecord;
  setActiveCase: (c: CaseRecord) => void;
  onUpdateActiveCase: (c: CaseRecord) => void;
  onOpenBooking: () => void;
  onOpenReport: () => void;
}) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentTab: CustomerNavTab = (() => {
    const path = window.location.pathname.split('/dashboard/')[1];
    return (path as CustomerNavTab) || 'dashboard';
  })();

  const goTab = (tab: CustomerNavTab) => navigate(tab === 'dashboard' ? '/dashboard' : `/dashboard/${tab}`);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex selection:bg-blue-600 selection:text-white antialiased font-sans">

      <div className="hidden lg:block">
        <CustomerSidebar
          currentTab={currentTab}
          onSelectTab={goTab}
          cases={cases}
          activeCase={activeCase}
          onSelectCase={(c) => { setActiveCase(c); setMobileMenuOpen(false); }}
          onSwitchPersona={() => navigate('/')}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <CustomerTopHeader
          currentTab={currentTab}
          activeCase={activeCase}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onSwitchPersona={() => navigate('/')}
        />

        <main className="flex-1 max-w-[1360px] w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardOverview activeCase={activeCase} onNavigateTab={goTab} onOpenReportModal={onOpenReport} onOpenBookingModal={onOpenBooking} onOpenQuoteModal={() => goTab('proofing')} onUpdateCase={onUpdateActiveCase} />} />
            <Route path="/journey" element={<MyJourneyView activeCase={activeCase} onNavigateTab={goTab} onOpenReportModal={onOpenReport} />} />
            <Route path="/monitoring" element={<ActivityMonitoringView activeCase={activeCase} onUpdateCase={onUpdateActiveCase} />} />
            <Route path="/orders" element={<MyOrdersView />} />
            <Route path="/appointments" element={<AppointmentsView activeCase={activeCase} onOpenBookingModal={onOpenBooking} onUpdateCase={onUpdateActiveCase} />} />
            <Route path="/proofing" element={<ProofingView activeCase={activeCase} onUpdateCase={onUpdateActiveCase} />} />
            <Route path="/documents" element={<DocumentsView />} />
            <Route path="/account" element={<AccountSettingsView activeCase={activeCase} />} />
            <Route path="/help" element={<HelpSupportView activeCase={activeCase} />} />
          </Routes>
        </main>

        <MobileBottomNav currentTab={currentTab} onSelectTab={goTab} onOpenMore={() => setMobileMenuOpen(true)} />
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full flex flex-col justify-between shadow-2xl">
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-bold text-sm">Customer Navigation</span>
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-4 flex-1 text-sm">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Property</div>
                <div className="p-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-800">{activeCase.propertyName}</div>
              </div>
              <div className="space-y-1">
                {(['dashboard', 'journey', 'orders', 'appointments', 'monitoring', 'proofing', 'documents', 'account', 'help'] as CustomerNavTab[]).map((tab) => (
                  <button key={tab} type="button" onClick={() => { goTab(tab); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium cursor-pointer capitalize">
                    {tab}
                  </button>
                ))}
              </div>
              <div className="pt-3 border-t space-y-1">
                <button type="button" onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg text-blue-700 bg-blue-50 text-xs font-bold cursor-pointer">
                  View Public Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Admin operations layout ----------
function AdminLayout({
  cases,
  activeCase,
  setActiveCase,
  onUpdateActiveCase,
  onLogout,
}: {
  cases: CaseRecord[];
  activeCase: CaseRecord;
  setActiveCase: (c: CaseRecord) => void;
  onUpdateActiveCase: (c: CaseRecord) => void;
  onLogout: () => void;
}) {
  const navigate = useNavigate();

  const currentTab: AdminNavTab = (() => {
    const path = window.location.pathname.split('/admin/')[1];
    return (path as AdminNavTab) || 'overview';
  })();

  const goTab = (tab: AdminNavTab) => navigate(tab === 'overview' ? '/admin' : `/admin/${tab}`);

  const activeCasesCount = cases.filter(
    (c) => !['RESOLVED', 'CLOSED', 'CANCELLED'].includes(c.status)
  ).length;
  const pendingProofingCount = cases.filter((c) => c.proofingQuote?.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex selection:bg-blue-600 selection:text-white antialiased font-sans">
      <div className="hidden lg:block">
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={goTab}
          onLogout={onLogout}
          activeCasesCount={activeCasesCount}
          pendingProofingCount={pendingProofingCount}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 max-w-[1360px] w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<AdminOverviewView cases={cases} />} />
            <Route
              path="/cases"
              element={
                <AdminCasesView
                  cases={cases}
                  activeCase={activeCase}
                  onUpdateCase={onUpdateActiveCase}
                  onSelectCase={setActiveCase}
                />
              }
            />
            <Route path="/products" element={<AdminProductsView products={INITIAL_PRODUCTS} />} />
            <Route path="/technicians" element={<AdminTechniciansView cases={cases} />} />
            <Route path="/payments" element={<AdminPaymentsView orders={MOCK_ORDERS} />} />
            <Route
              path="/proofing"
              element={<AdminProofingView cases={cases} onSelectCase={setActiveCase} />}
            />
            <Route path="/reports" element={<AdminReportsView cases={cases} orders={MOCK_ORDERS} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ---------- Root app ----------
export default function App() {
  const [cases, setCases] = useState<CaseRecord[]>(MOCK_CASES);
  const [activeCase, setActiveCase] = useState<CaseRecord>(MOCK_CASES[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [quickReportLevel, setQuickReportLevel] = useState<'No activity' | 'Less activity' | 'Same activity' | 'More activity' | 'Not sure'>('Less activity');
  const [quickReportNotes, setQuickReportNotes] = useState('');

  // Demo-only session state (frontend has no backend auth yet).
  const [session, setSession] = useState<{ role: 'customer' | 'admin' } | null>(null);

  const handleUpdateActiveCase = (updated: CaseRecord) => {
    setActiveCase(updated);
    setCases((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleBookingConfirmed = (date: string, time: string) => {
    const updated: CaseRecord = {
      ...activeCase,
      status: 'PROFESSIONAL_BOOKED',
      appointmentDate: date,
      appointmentTime: time,
      timeline: [
        ...activeCase.timeline,
        { title: 'Professional Service Booked', date: 'Today', completed: true, details: `Appointment confirmed for ${date} (${time}) with certified specialist.` },
      ],
    };
    handleUpdateActiveCase(updated);
    setIsBookingModalOpen(false);
  };

  const handleQuickReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CaseRecord = {
      ...activeCase,
      activityReported: quickReportLevel,
      activityNotes: quickReportNotes || activeCase.activityNotes,
      lastReportedDate: 'Today',
      timeline: [
        ...activeCase.timeline,
        { title: `Activity Report: ${quickReportLevel}`, date: 'Today', completed: true, details: quickReportNotes ? `Customer note: "${quickReportNotes}"` : `Reported: ${quickReportLevel}` },
      ],
    };
    handleUpdateActiveCase(updated);
    setIsReportModalOpen(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            session?.role === 'customer' ? (
              <DashboardLayout
                cases={cases}
                activeCase={activeCase}
                setActiveCase={setActiveCase}
                onUpdateActiveCase={handleUpdateActiveCase}
                onOpenBooking={() => setIsBookingModalOpen(true)}
                onOpenReport={() => setIsReportModalOpen(true)}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/*"
          element={
            session?.role === 'admin' ? (
              <AdminLayout
                cases={cases}
                activeCase={activeCase}
                setActiveCase={setActiveCase}
                onUpdateActiveCase={handleUpdateActiveCase}
                onLogout={() => setSession(null)}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/*"
          element={
            <PublicLayout
              onOpenBooking={() => setIsBookingModalOpen(true)}
              cases={cases}
              setCases={setCases}
              setActiveCase={setActiveCase}
              activeCase={activeCase}
              onLoginSuccess={(role) => setSession({ role })}
            />
          }
        />
      </Routes>

      {isBookingModalOpen && (
        <ProfessionalBookingModal
          currentCase={activeCase}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Day 4 of 7</span>
                <h3 className="text-lg font-bold text-slate-900">Report Pest Activity</h3>
              </div>
              <button type="button" onClick={() => setIsReportModalOpen(false)} className="text-slate-400 hover:text-slate-900 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleQuickReportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">What are you seeing?</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {(['No activity', 'Less activity', 'Same activity', 'More activity', 'Not sure'] as const).map((lvl) => (
                    <label key={lvl} className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer font-medium ${quickReportLevel === lvl ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <span>{lvl}</span>
                      <input type="radio" name="quickReport" checked={quickReportLevel === lvl} onChange={() => setQuickReportLevel(lvl)} className="text-blue-600 focus:ring-0" />
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes &amp; Details</label>
                <textarea rows={2} value={quickReportNotes} onChange={(e) => setQuickReportNotes(e.target.value)} placeholder="e.g. Bait checked; partial consumption in subfloor station." className="w-full p-2.5 rounded-xl border border-slate-300 font-medium" />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer">
                Record Observation
              </button>
            </form>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}