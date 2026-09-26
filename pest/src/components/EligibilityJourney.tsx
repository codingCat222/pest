import React, { useState } from 'react';
import { 
  PestType, 
  ActivityLocation, 
  DurationOption, 
  SightingOption, 
  EligibilitySubmission,
  CaseRecord
} from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Package, 
  Truck, 
  ShieldCheck, 
  Clock, 
  X,
  CreditCard,
  Lock
} from 'lucide-react';

interface EligibilityJourneyProps {
  initialPest?: PestType;
  initialLocation?: ActivityLocation;
  onClose: () => void;
  onOrderCompleted: (newCase: CaseRecord) => void;
}

export const EligibilityJourney: React.FC<EligibilityJourneyProps> = ({
  initialPest = 'Rats or mice',
  initialLocation = 'Inside my home',
  onClose,
  onOrderCompleted
}) => {
  const [step, setStep] = useState<'questionnaire' | 'checkout' | 'confirmation'>('questionnaire');
  
  const [pest, setPest] = useState<PestType>(initialPest);
  const [location, setLocation] = useState<ActivityLocation>(initialLocation);
  const [duration, setDuration] = useState<DurationOption>('1–4 weeks');
  const [sightings, setSightings] = useState<SightingOption[]>(['Droppings', 'Scratching/noises']);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [createdCase, setCreatedCase] = useState<CaseRecord | null>(null);

  const matchedProduct = INITIAL_PRODUCTS.find(p => p.pestTarget === pest) || INITIAL_PRODUCTS[0];

  const toggleSighting = (option: SightingOption) => {
    if (sightings.includes(option)) {
      setSightings(sightings.filter(s => s !== option));
    } else {
      setSightings([...sightings, option]);
    }
  };

  const handleStartEligibilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !postcode.trim()) {
      setErrorMsg('Please fill in all customer details so we can verify local availability.');
      return;
    }
    setErrorMsg('');
    setStep('checkout');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);

    setTimeout(() => {
      const orderRef = 'FPP-' + Math.floor(10000 + Math.random() * 90000);
      const newCase: CaseRecord = {
        id: 'case-' + Date.now(),
        referenceNumber: orderRef,
        propertyName: `${pest} — ${address.split(' ')[0] || 'Property'}`,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        propertyAddress: address,
        postcode: postcode,
        pest: pest,
        location: location,
        status: 'DELIVERY_PAID',
        productName: matchedProduct.name,
        deliveryFee: matchedProduct.deliveryCost,
        orderDate: 'Today',
        trackingNumber: 'RM-' + Math.floor(1000 + Math.random() * 9000) + '-GB',
        courier: 'Royal Mail Tracked 24',
        monitoringDay: 1,
        monitoringDaysTotal: 7,
        timeline: [
          { title: 'Product Claimed', date: 'Just now', completed: true, details: `${matchedProduct.name} allocated free of charge` },
          { title: 'Delivery Paid', date: 'Just now', completed: true, details: `£${matchedProduct.deliveryCost.toFixed(2)} standard delivery confirmed` },
          { title: 'Product Dispatched', date: 'Preparing', completed: false, current: true, details: 'Fulfillment queue - packaging for courier handover' },
          { title: 'Product Delivered', date: 'Estimated 24-48 hrs', completed: false, details: 'Tracked delivery to door' },
          { title: '7-Day Monitoring Begins', date: 'Upcoming', completed: false, details: 'Observe placement and log activity in dashboard' },
          { title: 'Activity Review / Escalation', date: 'Day 7', completed: false, details: 'Optional £99 professional treatment if required' }
        ]
      };

      setCreatedCase(newCase);
      setPaymentProcessing(false);
      setStep('confirmation');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden border border-slate-200">
        
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-sm tracking-tight">Free Pest Products • Application</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'questionnaire' && (
          <form onSubmit={handleStartEligibilitySubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                PAGE 11 — CHECK ELIGIBILITY / START JOURNEY
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Let's Get Started
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Tell us what you're dealing with. It only takes a few minutes.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Question 1: What pest are you dealing with?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Rats or mice', 'Bedbugs', 'Cockroaches', 'Foxes', 'Ants', 'Not sure'] as PestType[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPest(item)}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border text-left transition-all ${
                        pest === item
                          ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Question 2: Where are you seeing activity?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Inside my home', 'Garage', 'Loft/roof space', 'Garden/outside', 'Commercial property', 'Other'] as ActivityLocation[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setLocation(item)}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold border text-left transition-all ${
                        location === item
                          ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Question 3: How long have you noticed activity?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Less than a week', '1–4 weeks', '1–3 months', 'Longer'] as DurationOption[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setDuration(item)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                        duration === item
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Question 4: What have you seen? (Multiple selection)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {([
                    'Live rodent',
                    'Droppings',
                    'Scratching/noises',
                    'Gnawing',
                    'Damage',
                    'Other signs'
                  ] as SightingOption[]).map((item) => {
                    const isSelected = sightings.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSighting(item)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-semibold'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Customer Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="07700 900123"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Postcode</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SW11 3RU"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Property Address</label>
                    <input
                      type="text"
                      required
                      placeholder="House number and street name"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <span>CHECK MY ELIGIBILITY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 'checkout' && (
          <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 space-y-6">
            <div>
              <button
                type="button"
                onClick={() => setStep('questionnaire')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Questionnaire</span>
              </button>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                PAGE 12 — FREE PRODUCT CHECKOUT
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Your Free Product
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Great news — your property is eligible for our targeted treatment product.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Order Summary
              </div>

              <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                <div>
                  <div className="font-bold text-slate-900 text-base">
                    {matchedProduct.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Targeted formulation for {pest}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600 text-base">
                    £0.00
                  </div>
                  <div className="text-[11px] text-slate-400 line-through">
                    £{matchedProduct.regularPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>Royal Mail Tracked 24/48 Delivery</span>
                </span>
                <span className="font-semibold text-slate-900">
                  £{matchedProduct.deliveryCost.toFixed(2)}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-base">
                  Total Due Today
                </span>
                <span className="font-extrabold text-blue-600 text-xl">
                  £{matchedProduct.deliveryCost.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Delivery Address
              </div>
              <div className="text-slate-600 font-medium">
                {fullName}
              </div>
              <div className="text-slate-600">
                {address}, {postcode}
              </div>
              <div className="text-slate-500">
                Contact: {phone} • {email}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Payment Details
              </div>
              <div className="p-3 rounded-xl border border-slate-300 bg-slate-50/50 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="flex-1 text-xs text-slate-700">
                  Demo Fast-Checkout: Secure tokenization enabled. No real card charge will occur.
                </div>
                <Lock className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs leading-relaxed">
              <strong>Important Information:</strong> Please review the product information and applicable instructions before completing your order. Products must be used strictly in accordance with their instructions.
            </div>

            <button
              type="submit"
              disabled={paymentProcessing}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              {paymentProcessing ? (
                <span>Confirming delivery order...</span>
              ) : (
                <>
                  <span>PAY DELIVERY &amp; CLAIM PRODUCT (£{matchedProduct.deliveryCost.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {step === 'confirmation' && createdCase && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                PAGE 13 — ORDER CONFIRMATION
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                You're All Set!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your free product has been ordered and queued for dispatch.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Order Reference</span>
                <span className="font-mono font-bold text-slate-900">{createdCase.referenceNumber}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Product</span>
                <span className="font-bold text-slate-900">{createdCase.productName}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Delivery Fee Paid</span>
                <span className="font-bold text-emerald-600">£{createdCase.deliveryFee.toFixed(2)} (Paid)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Destination</span>
                <span className="text-slate-700">{createdCase.propertyAddress}, {createdCase.postcode}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                What Happens Next?
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </div>
                  <div>
                    <strong>We'll prepare your order:</strong> Packaged in our dispatch hub today.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </div>
                  <div>
                    <strong>We'll dispatch your product:</strong> Tracked Royal Mail service with SMS update.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </div>
                  <div>
                    <strong>You'll receive delivery confirmation:</strong> Inspect placement guide.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    4
                  </div>
                  <div>
                    <strong>Your monitoring journey begins:</strong> Track everything from your dashboard.
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOrderCompleted(createdCase)}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>GO TO MY DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
