export type CaseStatus =
  | 'NEW' | 'ELIGIBILITY_CHECK' | 'PRODUCT_CLAIMED' | 'AWAITING_DELIVERY_PAYMENT'
  | 'DELIVERY_PAID' | 'DISPATCHED' | 'DELIVERED' | 'MONITORING' | 'ACTIVITY_REPORTED'
  | 'PROFESSIONAL_OFFERED' | 'PROFESSIONAL_BOOKED' | 'PROFESSIONAL_COMPLETED'
  | 'FOLLOW_UP_MONITORING' | 'PROOFING_RECOMMENDED' | 'PROOFING_QUOTE_SENT'
  | 'PROOFING_ACCEPTED' | 'PROOFING_BOOKED' | 'PROOFING_COMPLETED' | 'RESOLVED'
  | 'CLOSED' | 'CANCELLED';

export type PortalRole = 'CUSTOMER' | 'ADMIN' | 'TECHNICIAN';
export type ProofingQuoteStatus = 'pending' | 'accepted' | 'declined';
export type OrderStatus = 'Delivered' | 'In Transit' | 'Preparing' | 'Cancelled';
export type DocumentCategory = 'Instructions' | 'Receipt' | 'Report' | 'Quote' | 'Certificate';

export const CASE_STATUSES: CaseStatus[] = [
  'NEW', 'ELIGIBILITY_CHECK', 'PRODUCT_CLAIMED', 'AWAITING_DELIVERY_PAYMENT',
  'DELIVERY_PAID', 'DISPATCHED', 'DELIVERED', 'MONITORING', 'ACTIVITY_REPORTED',
  'PROFESSIONAL_OFFERED', 'PROFESSIONAL_BOOKED', 'PROFESSIONAL_COMPLETED',
  'FOLLOW_UP_MONITORING', 'PROOFING_RECOMMENDED', 'PROOFING_QUOTE_SENT',
  'PROOFING_ACCEPTED', 'PROOFING_BOOKED', 'PROOFING_COMPLETED', 'RESOLVED',
  'CLOSED', 'CANCELLED',
];

export const ACTIVITY_LEVELS = ['No activity', 'Less activity', 'Same activity', 'More activity', 'Not sure'];