export type PortalPersona = 'customer' | 'admin' | 'storefront';

export type CustomerNavTab =
  | 'dashboard'
  | 'journey'
  | 'orders'
  | 'appointments'
  | 'monitoring'
  | 'documents'
  | 'proofing'
  | 'account'
  | 'help';

export type AdminNavTab =
  | 'overview'
  | 'cases'
  | 'products'
  | 'technicians'
  | 'payments'
  | 'proofing'
  | 'reports'
  | 'audit-log';

export type NavigationPage =
  | 'home'
  | 'how-it-works'
  | 'free-products'
  | 'rats-mice'
  | 'bedbugs'
  | 'cockroaches'
  | 'foxes'
  | 'ants'
  | 'professional-treatment'
  | 'proofing'
  | 'faqs'
  | 'about-us'
  | 'contact'
  | 'eligibility'
  | 'checkout'
  | 'order-confirmation'
  | 'dashboard'
  | 'admin'
  | 'terms'
  | 'privacy'
  | 'cookies';

export type PestType = 'Rats or mice' | 'Bedbugs' | 'Cockroaches' | 'Foxes' | 'Ants' | 'Other' | 'Not sure';

export type ActivityLocation = 'Inside my home' | 'Garage' | 'Loft/roof space' | 'Garden/outside' | 'Commercial property' | 'Other';

export type DurationOption = 'Less than a week' | '1–4 weeks' | '1–3 months' | 'Longer';

export type SightingOption =
  | 'Live rodent'
  | 'Droppings'
  | 'Scratching/noises'
  | 'Gnawing'
  | 'Damage'
  | 'Other signs'
  | 'Not sure';

export type CaseStatus =
  | 'NEW'
  | 'ELIGIBILITY_CHECK'
  | 'PRODUCT_CLAIMED'
  | 'AWAITING_DELIVERY_PAYMENT'
  | 'DELIVERY_PAID'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'MONITORING'
  | 'ACTIVITY_REPORTED'
  | 'PROFESSIONAL_OFFERED'
  | 'PROFESSIONAL_BOOKED'
  | 'PROFESSIONAL_COMPLETED'
  | 'FOLLOW_UP_MONITORING'
  | 'PROOFING_RECOMMENDED'
  | 'PROOFING_QUOTE_SENT'
  | 'PROOFING_ACCEPTED'
  | 'PROOFING_BOOKED'
  | 'PROOFING_COMPLETED'
  | 'RESOLVED'
  | 'CLOSED'
  | 'CANCELLED';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  pestTarget: string;
  regularPrice: number;
  deliveryCost: number;
  description: string;
  contents: string[];
  instructions: string[];
  safetyNotice: string;
  badge: string;
  imageUrl: string;
}

export interface EligibilitySubmission {
  pest: PestType;
  location: ActivityLocation;
  duration: DurationOption;
  sightings: SightingOption[];
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
}

export interface ProofingFinding {
  id: string;
  title: string;
  description: string;
  recommendedWork: string;
  imageUrl: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ProofingQuoteData {
  id: string;
  reference?: string;
  description: string;
  technicianExplanation: string;
  findings?: ProofingFinding[];
  materials?: string;
  materialsCost?: number;
  labourCost?: number;
  subtotal?: number;
  price?: number;
  vat: number;
  total: number;
  validUntil: string;
  status: 'pending' | 'accepted' | 'declined';
  acceptedAt?: string;
}

export interface CaseRecord {
  id: string;
  referenceNumber: string;
  propertyName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  propertyAddress: string;
  postcode: string;
  pest: PestType;
  location: ActivityLocation;
  status: CaseStatus;
  productName: string;
  deliveryFee: number;
  orderDate: string;
  trackingNumber?: string;
  courier: string;
  monitoringDay: number;
  monitoringDaysTotal: number;
  activityReported?: string;
  activityNotes?: string;
  lastReportedDate?: string;
  photos?: string[];
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentStatus?: 'Scheduled' | 'Completed' | 'Pending';
  technicianName?: string;
  technicianNotes?: string;
  proofingQuote?: ProofingQuoteData;
  timeline: {
    title: string;
    date: string;
    completed: boolean;
    current?: boolean;
    details?: string;
    author?: string;
  }[];
}

export interface OrderItemRecord {
  id: string;
  orderNumber: string;
  productName: string;
  caseRef: string;
  productPrice: number;
  deliveryFee: number;
  total: number;
  status: 'Delivered' | 'In Transit' | 'Preparing' | 'Cancelled';
  carrier: string;
  trackingNumber: string;
  placedDate: string;
  deliveryDate?: string;
  propertyAddress: string;
}

export interface ActivityReportSubmission {
  activityLevel: 'No activity' | 'Less activity' | 'Same activity' | 'More activity' | 'Not sure';
  notes: string;
  photoUrl?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Instructions' | 'Receipt' | 'Report' | 'Quote' | 'Certificate';
  format: 'PDF';
  date: string;
  size: string;
  caseRef: string;
}