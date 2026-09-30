import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import {
  CustomerNavTab,
  AdminNavTab,
  CaseRecord,
  PestType,
} from './types';
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
import { ProductShowcase } from './components/ProductShowcase';
import { HomeSections } from './components/HomeSections';
import { Footer } from './components/Footer';
import { EligibilityPage } from './components/pages/EligibilityPage';
import { BookProfessionalPage } from './components/pages/BookProfessionalPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminTopHeader } from './components/admin/AdminTopHeader';
import { AdminOverviewView } from './components/admin/AdminOverviewView';
import { AdminCasesView } from './components/admin/AdminCasesView';
import { AdminProductsView } from './components/admin/AdminProductsView';
import { AdminTechniciansView } from './components/admin/AdminTechniciansView';
import { AdminPaymentsView } from './components/admin/AdminPaymentsView';
import { AdminProofingView } from './components/admin/AdminProofingView';
import { AdminReportsView } from './components/admin/AdminReportsView';
import { AdminAuditLogView } from './components/admin/AdminAuditLogView';
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
import { X, Inbox } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CasesService, UNPAID_CASE_STATUSES } from './services/cases';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderConfirmationPage } from './components/pages/OrderConfirmationPage';
import { ActivityReportsService } from './services/activityReports';
import { AppointmentsService } from './services/appointments';
import { apiErrorMessage } from './services/format';

function EmptyDashboard({ onCheckEligibility }: { onCheckEligibility: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
        <Inbox className="w-6 h-6" />
      </div>
      <div>
        <h2 className="font-bold text-brand-purple">No active case yet</h2>
        <p className="text-sm text-brand-purple/70 mt-1">
          Your treatment journey will appear here once your order is set up.
        </p>
      </div>
      <button
        type="button"
        onClick={onCheckEligibility}
        className="px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white font-bold text-sm rounded-xl shadow-sm transition-colors cursor-pointer"
      >
        Check eligibility
      </button>
    </div>
  );
}

function NoCaseNotice({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
        <Inbox className="w-6 h-6" />
      </div>
      <div>
        <h2 className="font-bold text-brand-purple">{title}</h2>
        <p className="text-sm text-brand-purple/70 mt-1">{message}</p>
      </div>
    </div>
  );
}

// ---------- Public site layout (navbar + footer wrap every public page) ----------
function PublicLayout({
  cases,
  setCases,
  setActiveCase,
  activeCase,
  onBookingConfirmed,
  onLoginSuccess,
  onPaymentSettled,
}: {
  cases: CaseRecord[];
  setCases: (c: CaseRecord[]) => void;
  setActiveCase: (c: CaseRecord) => void;
  activeCase: CaseRecord | null;
  onBookingConfirmed: (date: string, time: string, isoDate: string) => Promise<void>;
  onLoginSuccess: (role: 'customer' | 'admin') => void;
  onPaymentSettled: () => Promise<void>;
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToEligibility = (pest?: PestType) => {
    const params = pest ? `?pest=${encodeURIComponent(pest)}` : '';
    navigate(`/check-eligibility${params}`);
  };

  const goToBooking = () => navigate('/book-professional');

  const handleOrderCompleted = (newCase: CaseRecord) => {
    setCases([newCase, ...cases]);
    setActiveCase(newCase);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-brand-green selection:text-white">
      <Navbar
        onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)}
        onOpenEligibility={() => goToEligibility()}
        onOpenLogin={() => navigate('/login')}
        onOpenSignup={() => navigate('/signup')}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero onStartEligibility={goToEligibility} onBookProfessional={goToBooking} />
                <ProductShowcase />
                <HomeSections onStartEligibility={goToEligibility} onBookProfessional={goToBooking} />
              </>
            }
          />
          <Route path="/how-it-works" element={<HowItWorksPage onStartEligibility={() => goToEligibility()} onBookProfessional={goToBooking} />} />
          <Route path="/free-products" element={<FreeProductsPage onStartEligibility={() => goToEligibility()} />} />
          <Route path="/pests/rats-mice" element={<PestHubPage pestKey="rats-mice" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Rats or mice')} onBookProfessional={goToBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/pests/bedbugs" element={<PestHubPage pestKey="bedbugs" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Bedbugs')} onBookProfessional={goToBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/pests/cockroaches" element={<PestHubPage pestKey="cockroaches" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Cockroaches')} onBookProfessional={goToBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/pests/foxes" element={<PestHubPage pestKey="foxes" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Foxes')} onBookProfessional={goToBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/pests/ants" element={<PestHubPage pestKey="ants" onStartEligibility={(p) => goToEligibility((p as PestType) || 'Ants')} onBookProfessional={goToBooking} onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/professional-treatment" element={<ProfessionalTreatmentPage onBookProfessional={goToBooking} />} />
          <Route path="/proofing" element={<ProofingPage onStartEligibility={() => goToEligibility()} onBookProfessional={goToBooking} />} />
          <Route path="/faqs" element={<FaqsPage onStartEligibility={() => goToEligibility()} />} />
          <Route path="/about" element={<AboutUsPage onStartEligibility={() => goToEligibility()} />} />
          <Route path="/contact" element={<ContactPage onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/terms" element={<LegalPage initialSection="terms" onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/privacy" element={<LegalPage initialSection="privacy" onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/cookies" element={<LegalPage initialSection="cookies" onNavigate={(page) => navigate(`/${page}`)} />} />
          <Route path="/check-eligibility" element={<EligibilityPage onOrderCompleted={handleOrderCompleted} />} />
          <Route
            path="/checkout/:caseId"
            element={user ? <CheckoutPage onPaymentSettled={onPaymentSettled} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/order-confirmation/:caseId"
            element={user ? <OrderConfirmationPage onPaymentSettled={onPaymentSettled} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/book-professional"
            element={
              activeCase ? (
                <BookProfessionalPage
                  currentCase={activeCase}
                  onBookingConfirmed={onBookingConfirmed}
                  onBack={() => navigate(-1)}
                  onGoToDashboard={() => navigate('/dashboard')}
                />
              ) : (
                <Navigate to={user ? '/dashboard' : '/login'} replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSuccess={(role) => {
                  onLoginSuccess(role);
                  navigate(role === 'admin' ? '/admin' : '/dashboard');
                }}
                onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupPage
                onSignupSuccess={() => {
                  onLoginSuccess('customer');
                  navigate('/dashboard');
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
        onOpenBooking={goToBooking}
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
  onOpenReport,
  casesStatus,
  casesError,
}: {
  cases: CaseRecord[];
  activeCase: CaseRecord | null;
  setActiveCase: (c: CaseRecord) => void;
  onUpdateActiveCase: (c: CaseRecord) => void;
  onOpenReport: () => void;
  casesStatus: 'idle' | 'loading' | 'ready' | 'error';
  casesError: string | null;
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const signOut = async () => {
    await logout();
    navigate('/login');
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goToBooking = () => navigate('/book-professional');

  const currentTab: CustomerNavTab = (() => {
    const path = window.location.pathname.split('/dashboard/')[1];
    return (path as CustomerNavTab) || 'dashboard';
  })();

  const goTab = (tab: CustomerNavTab) => navigate(tab === 'dashboard' ? '/dashboard' : `/dashboard/${tab}`);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex selection:bg-brand-green selection:text-white antialiased font-sans">

      <div className="hidden lg:block">
        <CustomerSidebar
          currentTab={currentTab}
          onSelectTab={goTab}
          cases={cases}
          activeCase={activeCase}
          onSelectCase={(c) => { setActiveCase(c); setMobileMenuOpen(false); }}
          onSwitchPersona={() => navigate('/')}
          onSignOut={signOut}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <CustomerTopHeader
          currentTab={currentTab}
          activeCase={activeCase}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onSwitchPersona={() => navigate('/')}
          onOpenAccount={() => goTab('account')}
          onSignOut={signOut}
        />

        <main className="flex-1 max-w-[1360px] w-full mx-auto p-4 sm:p-6 lg:p-8">
          {casesStatus === 'ready' && activeCase && UNPAID_CASE_STATUSES.includes(activeCase.status) && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-amber-900">Your free product is reserved</div>
                <div className="text-xs text-amber-800 mt-0.5">Pay the delivery charge to claim it and start your monitoring period.</div>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/checkout/${activeCase.id}`)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shrink-0"
              >
                Pay delivery
              </button>
            </div>
          )}
          {casesStatus === 'error' ? (
            <p className="py-24 text-center text-sm font-semibold text-red-600">{casesError}</p>
          ) : casesStatus !== 'ready' ? (
            <p className="py-24 text-center text-sm text-slate-500">Loading your dashboard...</p>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  activeCase ? (
                    <DashboardOverview activeCase={activeCase} onNavigateTab={goTab} onOpenReportModal={onOpenReport} onOpenBookingModal={goToBooking} onOpenQuoteModal={() => goTab('proofing')} onUpdateCase={onUpdateActiveCase} />
                  ) : (
                    <EmptyDashboard onCheckEligibility={() => navigate('/check-eligibility')} />
                  )
                }
              />
              <Route
                path="/journey"
                element={
                  activeCase ? (
                    <MyJourneyView activeCase={activeCase} onNavigateTab={goTab} onOpenReportModal={onOpenReport} />
                  ) : (
                    <NoCaseNotice title="Your journey starts here" message="Your step-by-step journey will appear once you've claimed a product." />
                  )
                }
              />
              <Route
                path="/monitoring"
                element={
                  activeCase ? (
                    <ActivityMonitoringView activeCase={activeCase} onUpdateCase={onUpdateActiveCase} />
                  ) : (
                    <NoCaseNotice title="Nothing to monitor yet" message="Activity reporting opens once your product has been delivered." />
                  )
                }
              />
              <Route path="/orders" element={<MyOrdersView />} />
              <Route
                path="/appointments"
                element={
                  activeCase ? (
                    <AppointmentsView activeCase={activeCase} onOpenBookingModal={goToBooking} onUpdateCase={onUpdateActiveCase} />
                  ) : (
                    <NoCaseNotice title="No appointments yet" message="Professional visits you book will appear here." />
                  )
                }
              />
              <Route
                path="/proofing"
                element={
                  activeCase ? (
                    <ProofingView activeCase={activeCase} onUpdateCase={onUpdateActiveCase} />
                  ) : (
                    <NoCaseNotice title="No proofing quotes yet" message="If proofing is recommended after a visit, your quote will appear here." />
                  )
                }
              />
              <Route path="/documents" element={<DocumentsView />} />
              <Route path="/account" element={<AccountSettingsView activeCase={activeCase} />} />
              <Route path="/help" element={<HelpSupportView activeCase={activeCase} />} />
            </Routes>
          )}
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
                <div className="p-2.5 rounded-xl bg-slate-50 border text-xs font-semibold text-slate-800">
                  {activeCase ? activeCase.propertyName : 'No case yet'}
                </div>
              </div>
              <div className="space-y-1">
                {(['dashboard', 'journey', 'orders', 'appointments', 'monitoring', 'proofing', 'documents', 'account', 'help'] as CustomerNavTab[]).map((tab) => (
                  <button key={tab} type="button" onClick={() => { goTab(tab); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-medium cursor-pointer capitalize">
                    {tab}
                  </button>
                ))}
              </div>
              <div className="pt-3 border-t space-y-1">
                <button type="button" onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 rounded-lg text-brand-green bg-brand-green/10 text-xs font-bold cursor-pointer">
                  View Public Website
                </button>
                <button type="button" onClick={() => { setMobileMenuOpen(false); signOut(); }} className="w-full text-left py-2 px-3 rounded-lg text-red-600 bg-red-50 text-xs font-bold cursor-pointer">
                  Sign Out
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
  onCaseCreated,
  onLogout,
  onCasesChanged,
}: {
  cases: CaseRecord[];
  activeCase: CaseRecord | null;
  setActiveCase: (c: CaseRecord) => void;
  onUpdateActiveCase: (c: CaseRecord) => void;
  onCaseCreated: (c: CaseRecord) => void;
  onLogout: () => void;
  onCasesChanged: () => void;
}) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex selection:bg-brand-green selection:text-white antialiased font-sans">
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
        <AdminTopHeader
          currentTab={currentTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenAuditLog={() => goTab('audit-log')}
        />

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
                  onCaseCreated={onCaseCreated}
                />
              }
            />
            <Route path="/products" element={<AdminProductsView />} />
            <Route path="/technicians" element={<AdminTechniciansView cases={cases} onCasesChanged={onCasesChanged} />} />
            <Route path="/payments" element={<AdminPaymentsView />} />
            <Route
              path="/proofing"
              element={<AdminProofingView cases={cases} onSelectCase={setActiveCase} onCasesChanged={onCasesChanged} />}
            />
            <Route path="/audit-log" element={<AdminAuditLogView cases={cases} />} />
            <Route path="/reports" element={<AdminReportsView cases={cases} />} />
          </Routes>
        </main>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full flex flex-col justify-between shadow-2xl">
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-bold text-sm">Operations Console</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-1 flex-1 text-sm">
              {(['overview', 'cases', 'products', 'technicians', 'payments', 'proofing', 'reports', 'audit-log'] as AdminNavTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => { goTab(tab); setMobileMenuOpen(false); }}
                  className={`w-full text-left py-2 px-3 rounded-lg font-medium cursor-pointer capitalize ${currentTab === tab ? 'bg-brand-green/10 text-brand-green' : 'hover:bg-slate-100'
                    }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>
            <div className="p-4 border-t">
              <button
                type="button"
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 px-3 rounded-lg text-red-600 bg-red-50 text-xs font-bold cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Root app ----------
function AppRoutes() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [activeCase, setActiveCase] = useState<CaseRecord | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [quickReportLevel, setQuickReportLevel] = useState<'No activity' | 'Less activity' | 'Same activity' | 'More activity' | 'Not sure'>('Less activity');
  const [quickReportNotes, setQuickReportNotes] = useState('');
  const [casesStatus, setCasesStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [reportError, setReportError] = useState<string | null>(null);
  const [isReportSaving, setIsReportSaving] = useState(false);
  const [casesError, setCasesError] = useState<string | null>(null);

  const { user, isLoading, logout } = useAuth();
  const session = user
    ? { role: (user.role === 'ADMIN' ? 'admin' : 'customer') as 'customer' | 'admin' }
    : null;

  useEffect(() => {
    if (!user) {
      setCases([]);
      setActiveCase(null);
      setCasesStatus('idle');
      return;
    }

    let cancelled = false;
    setCasesStatus('loading');
    setCasesError(null);

    const load = async () => {
      let fetched = await CasesService.list();
      let createdId: string | null = null;
      const pending = sessionStorage.getItem('pendingCase');
      if (pending) {
        sessionStorage.removeItem('pendingCase');
        const created = await CasesService.create(JSON.parse(pending));
        fetched = [created, ...fetched];
        createdId = created.id;
      }
      return { fetched, createdId };
    };

    load()
      .then(({ fetched, createdId }) => {
        if (cancelled) return;
        setCases(fetched);
        setActiveCase((prev) => fetched.find((c) => c.id === prev?.id) ?? fetched[0] ?? null);
        setCasesStatus('ready');
        if (createdId) navigate(`/checkout/${createdId}`);
      })
      .catch((err: any) => {
        if (cancelled) return;
        setCasesError(apiErrorMessage(err, 'Unable to load your dashboard right now.'));
        setCasesStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const reloadCases = async () => {
    const fetched = await CasesService.list();
    setCases(fetched);
    setActiveCase((prev) => fetched.find((c) => c.id === prev?.id) ?? fetched[0] ?? null);
  };

  const handleUpdateActiveCase = (updated: CaseRecord) => {
    setActiveCase(updated);
    setCases((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleCaseCreated = (created: CaseRecord) => {
    setCases((prev) => [created, ...prev]);
    setActiveCase(created);
  };

  const handleBookingConfirmed = async (_date: string, time: string, isoDate: string) => {
    if (!activeCase) return;
    await AppointmentsService.book(activeCase.id, isoDate, time);
    handleUpdateActiveCase(await CasesService.getById(activeCase.id));
  };

  const handleQuickReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCase) return;
    setReportError(null);
    setIsReportSaving(true);
    try {
      await ActivityReportsService.create(activeCase.id, { activityLevel: quickReportLevel, notes: quickReportNotes });
      handleUpdateActiveCase(await CasesService.getById(activeCase.id));
      setQuickReportNotes('');
      setIsReportModalOpen(false);
    } catch (err) {
      setReportError(apiErrorMessage(err, 'Unable to save your report. Please try again.'));
    } finally {
      setIsReportSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 text-sm font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <>
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
                onOpenReport={() => setIsReportModalOpen(true)}
                casesStatus={casesStatus}
                casesError={casesError}
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
                onCaseCreated={handleCaseCreated}
                onLogout={() => { logout(); }}
                onCasesChanged={reloadCases}
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
              cases={cases}
              setCases={setCases}
              setActiveCase={setActiveCase}
              activeCase={activeCase}
              onBookingConfirmed={handleBookingConfirmed}
              onPaymentSettled={reloadCases}
              onLoginSuccess={() => { /* navigation handled by LoginPage after real auth */ }}
            />
          }
        />
      </Routes>

      {isReportModalOpen && activeCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Day {activeCase.monitoringDay} of {activeCase.monitoringDaysTotal}</span>
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
                    <label key={lvl} className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer font-medium ${quickReportLevel === lvl ? 'border-brand-green bg-brand-green/5 text-brand-purple font-bold' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <span>{lvl}</span>
                      <input type="radio" name="quickReport" checked={quickReportLevel === lvl} onChange={() => setQuickReportLevel(lvl)} className="text-brand-green focus:ring-0" />
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes &amp; Details</label>
                <textarea rows={2} value={quickReportNotes} onChange={(e) => setQuickReportNotes(e.target.value)} placeholder="e.g. Bait checked; partial consumption in subfloor station." className="w-full p-2.5 rounded-xl border border-slate-300 font-medium" />
              </div>
              {reportError && <p className="text-red-600 font-semibold">{reportError}</p>}
              <button type="submit" disabled={isReportSaving} className="w-full py-3 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60">
                {isReportSaving ? 'Saving...' : 'Record Observation'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}