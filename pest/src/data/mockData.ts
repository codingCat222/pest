import { ProductItem, CaseRecord, OrderItemRecord, DocumentItem } from '../types';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-rat-mice',
    name: 'Targeted Rodent Activity Kit',
    category: 'Rats & Mice',
    pestTarget: 'Rats or mice',
    regularPrice: 28.50,
    deliveryCost: 4.95,
    description: 'UK approved tamper-resistant stations with dual-monitoring formulation and high-acceptance bait blocks designed for residential placement.',
    contents: [
      '2x Secure lockable tamper-resistant bait stations',
      'Dual-key security set',
      'Active rodent lure blocks (pre-measured)',
      'Step-by-step 7-day monitoring log'
    ],
    instructions: [
      'Place stations along wall edges or near identified runs.',
      'Check stations on Day 3 and Day 7 without moving unless empty.',
      'Always use enclosed safety key to inspect block status.',
      'Record activity level in your customer dashboard.'
    ],
    safetyNotice: 'Keep away from non-target animals, children and pets. Use strictly in supplied tamper-resistant stations.',
    badge: 'FREE + £4.95 DELIVERY',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-bedbugs',
    name: 'Bedbug Detection & Trapping Matrix',
    category: 'Bedbugs',
    pestTarget: 'Bedbugs',
    regularPrice: 32.00,
    deliveryCost: 4.95,
    description: 'Specialist adhesive interceptor traps and natural barrier spray formulated to halt bedbug movement across bed frames and skirting.',
    contents: [
      '4x Mattress post barrier interceptor cups',
      '2x Active pheromone harborage detection monitors',
      'Targeted perimeter repellent solution',
      'Inspection guide magnifier'
    ],
    instructions: [
      'Position interceptor cups directly beneath all four bed posts.',
      'Ensure bed linen does not touch the carpet or walls.',
      'Inspect harborage traps daily for nymphs or cast skins.',
      'Log findings on Day 7 to evaluate if heat steaming is needed.'
    ],
    safetyNotice: 'Non-toxic mechanical barriers. Safe around children and domestic pets when installed as directed.',
    badge: 'FREE + £4.95 DELIVERY',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-cockroach',
    name: 'Cockroach Attractant & Gel System',
    category: 'Cockroach',
    pestTarget: 'Cockroaches',
    regularPrice: 29.00,
    deliveryCost: 4.95,
    description: 'Professional high-potency insect attraction paste with enclosed precision dispensers for kitchens, pipe ducts, and under-sink units.',
    contents: [
      '4x Low-profile sticky harbourage detection zones',
      '1x Precision attractant gel application tube',
      'Surface preparation wipe wipes',
      'Dark-zone activity guide'
    ],
    instructions: [
      'Apply pea-sized dots near warm motor housings, hinges, and behind sinks.',
      'Avoid spraying cleaning chemicals over treated points.',
      'Leave detection zones undisturbed for 7 days.',
      'Check catch rate and log into dashboard.'
    ],
    safetyNotice: 'Store in cool place. Avoid direct skin contact and keep away from open food storage.',
    badge: 'FREE + £4.95 DELIVERY',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prod-fox',
    name: 'Fox Perimeter Deterrent Compound',
    category: 'Fox',
    pestTarget: 'Foxes',
    regularPrice: 26.00,
    deliveryCost: 4.95,
    description: 'Bio-scent boundary treatment formulated to discourage urban foxes from denning in gardens, under decking, or disturbing bins.',
    contents: [
      '1x Concentrated natural sensory deterrent solution',
      '1x Easy-mist trigger dispenser bottle',
      'Marking flags for perimeter border',
      'Den detection guide'
    ],
    instructions: [
      'Spray around boundary fence perimeters, under sheds, and near waste bins.',
      'Re-apply after heavy rainfall or after 5 days.',
      'Monitor whether digging or nocturnal scent marking ceases.',
      'Escalate to professional exclusion if access under decking persists.'
    ],
    safetyNotice: 'Natural scent based. Harmless to flora and pets once dry.',
    badge: 'FREE + £4.95 DELIVERY',
    imageUrl: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=600&q=80'
  }
];

export const MOCK_CASES: CaseRecord[] = [
  {
    id: 'case-84920',
    referenceNumber: 'FP-10482',
    propertyName: 'Rat & Mouse — Home',
    customerName: 'John Samuel',
    customerEmail: 'john.samuel@example.co.uk',
    customerPhone: '07700 900382',
    propertyAddress: '14 Meadowcroft Grove',
    postcode: 'SW11 3RU',
    pest: 'Rats or mice',
    location: 'Inside my home',
    status: 'MONITORING',
    productName: 'Free Rat & Mouse Product',
    deliveryFee: 4.95,
    orderDate: '21 Sep 2026',
    trackingNumber: 'RM-7739-8291-GB',
    courier: 'Royal Mail Tracked 24',
    monitoringDay: 4,
    monitoringDaysTotal: 7,
    activityReported: 'Less activity',
    activityNotes: 'Checked bait stations in kitchen void; slight feeding marks observed.',
    lastReportedDate: 'Yesterday',
    appointmentDate: '26 Sep 2026',
    appointmentTime: '10:00 AM',
    appointmentStatus: 'Scheduled',
    technicianName: 'Michael Vance',
    timeline: [
      { title: 'Eligibility Approved', date: '21 Sep 2026, 09:45', completed: true, details: 'Pest questionnaire completed for residential address.' },
      { title: 'Free Product Claimed', date: '21 Sep 2026, 09:47', completed: true, details: 'Targeted Rodent Activity Kit allocated at £0.00.' },
      { title: 'Delivery Payment Received', date: '21 Sep 2026, 09:48', completed: true, details: '£4.95 Royal Mail Tracked 24 postage confirmed.' },
      { title: 'Product Dispatched', date: '21 Sep 2026, 14:30', completed: true, details: 'Shipped from UK Central Depot. Tracking #RM-7739-8291-GB.' },
      { title: 'Product Delivered', date: '22 Sep 2026, 09:15', completed: true, details: 'Delivered to porch and confirmed by resident.' },
      { title: 'Monitoring Started', date: '22 Sep 2026, 10:00', completed: true, current: true, details: '7-day observation period underway. Day 4 in progress.' },
      { title: 'Activity Report Submitted', date: 'Yesterday, 18:20', completed: true, details: 'Reported: Less activity observed in subfloor.' },
      { title: 'Professional Treatment Available', date: 'Optional', completed: false, details: '£99 inspection available if signs persist after Day 7.' },
      { title: 'Proofing Assessment', date: 'If needed', completed: false, details: 'Structural gap closure and physical exclusion survey.' },
      { title: 'Resolved', date: 'Pending', completed: false, details: 'Target resolution state once activity ceases.' }
    ],
    proofingQuote: {
      id: 'quote-1021',
      reference: 'PQ-1021',
      description: 'Rear door threshold exclusion, copper mesh packing to kitchen soil pipe cavity, and air brick barrier fitting.',
      technicianExplanation: 'Inspection revealed a 18mm opening under the rear scullery door and an unsealed soil stack penetration through the cavity wall.',
      findings: [
        {
          id: 'find-1',
          title: 'Gap beneath rear door',
          description: 'Potential pest access point beneath timber threshold allowing rodent ingress.',
          recommendedWork: 'Install heavy-duty aluminium brush strip and seal surrounding perimeter frame.',
          severity: 'high',
          imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'find-2',
          title: 'Soil pipe wall breach',
          description: '35mm diameter void around external waste plumbing entering kitchen subfloor.',
          recommendedWork: 'Pack void with expanding stainless steel wire mesh and elastomeric rodent sealant.',
          severity: 'high',
          imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'find-3',
          title: 'Subfloor terracotta air brick',
          description: 'Missing original grill bars leaving 20mm openings directly into cavity.',
          recommendedWork: 'Affix precision galvanized stainless steel air brick rodent exclusion cowl.',
          severity: 'medium',
          imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=600&q=80'
        }
      ],
      materialsCost: 110.00,
      labourCost: 94.17,
      subtotal: 204.17,
      vat: 40.83,
      total: 245.00,
      validUntil: '30 Sep 2026',
      status: 'pending'
    }
  },
  {
    id: 'case-93104',
    referenceNumber: 'FP-10928',
    propertyName: 'Cockroach — Rental Property',
    customerName: 'John Samuel',
    customerEmail: 'john.samuel@example.co.uk',
    customerPhone: '07700 900382',
    propertyAddress: 'Flat 4, 19 Brick Lane',
    postcode: 'E1 6PU',
    pest: 'Cockroaches',
    location: 'Inside my home',
    status: 'PROFESSIONAL_BOOKED',
    productName: 'Cockroach Attractant & Gel System',
    deliveryFee: 4.95,
    orderDate: '15 Sep 2026',
    trackingNumber: 'RM-3392-1102-GB',
    courier: 'Royal Mail Tracked 24',
    monitoringDay: 7,
    monitoringDaysTotal: 7,
    activityReported: 'More activity',
    activityNotes: 'Nymphs seen around warm refrigerator motor cavity. Escalated to £99 professional treatment.',
    lastReportedDate: '20 Sep 2026',
    appointmentDate: '28 Sep 2026',
    appointmentTime: '02:00 PM',
    appointmentStatus: 'Scheduled',
    technicianName: 'Marcus Vance',
    timeline: [
      { title: 'Eligibility Approved', date: '15 Sep 2026', completed: true },
      { title: 'Free Product Claimed', date: '15 Sep 2026', completed: true },
      { title: 'Product Delivered', date: '16 Sep 2026', completed: true },
      { title: '7-Day Monitoring Complete', date: '22 Sep 2026', completed: true },
      { title: 'Activity Reported (Continued)', date: '22 Sep 2026', completed: true, details: 'Continued sightings confirmed in kitchen.' },
      { title: '£99 Professional Service Booked', date: '23 Sep 2026', completed: true, current: true, details: 'Appointment confirmed with Marcus Vance for 28 Sep.' },
      { title: 'Technician Inspection & Treatment', date: '28 Sep 2026', completed: false }
    ]
  },
  {
    id: 'case-71829',
    referenceNumber: 'FP-10114',
    propertyName: 'Bedbug — Office Studio',
    customerName: 'John Samuel',
    customerEmail: 'john.samuel@example.co.uk',
    customerPhone: '07700 900382',
    propertyAddress: 'Studio 3, 88 Clerkenwell Rd',
    postcode: 'EC1M 5RJ',
    pest: 'Bedbugs',
    location: 'Commercial property',
    status: 'PROOFING_RECOMMENDED',
    productName: 'Bedbug Detection & Trapping Matrix',
    deliveryFee: 4.95,
    orderDate: '02 Sep 2026',
    trackingNumber: 'RM-9901-4421-GB',
    courier: 'Royal Mail Tracked 24',
    monitoringDay: 7,
    monitoringDaysTotal: 7,
    activityReported: 'Same activity',
    appointmentDate: '12 Sep 2026',
    appointmentTime: '11:00 AM',
    appointmentStatus: 'Completed',
    technicianName: 'Michael Vance',
    technicianNotes: 'Heat treatment carried out on sofa and skirting perimeter. Baseboard gaps require acoustic mastic sealing.',
    timeline: [
      { title: 'Free Detection Kit Claimed', date: '02 Sep 2026', completed: true },
      { title: 'Product Delivered', date: '04 Sep 2026', completed: true },
      { title: 'Monitoring Complete', date: '10 Sep 2026', completed: true },
      { title: 'Professional Treatment (£99)', date: '12 Sep 2026', completed: true, details: 'Thermal steam treatment deployed by Michael Vance.' },
      { title: 'Proofing Quote Issued', date: '14 Sep 2026', completed: true, current: true, details: 'Quotation #PQ-0982 awaiting customer approval.' }
    ],
    proofingQuote: {
      id: 'quote-0982',
      reference: 'PQ-0982',
      description: 'Acoustic and thermal perimeter sealing across partition skirting joints to prevent migration between tenant studios.',
      technicianExplanation: 'Inspection indicated bedbugs migrating through partition wall skirting expansion gaps from neighbouring service duct.',
      findings: [
        {
          id: 'find-b1',
          title: 'Skirting board expansion gap',
          description: '12mm clearance beneath plasterboard partition allowing insect transit.',
          recommendedWork: 'Deep insecticide dusting and silicone sealing along entire 18m perimeter.',
          severity: 'high',
          imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
        }
      ],
      materialsCost: 95.00,
      labourCost: 105.00,
      subtotal: 200.00,
      vat: 40.00,
      total: 240.00,
      validUntil: '05 Oct 2026',
      status: 'pending'
    }
  }
];

export const INITIAL_CASE: CaseRecord = MOCK_CASES[0];

export const MOCK_ORDERS: OrderItemRecord[] = [
  {
    id: 'ord-10482',
    orderNumber: '#FP-10482',
    productName: 'Targeted Rodent Activity Kit',
    caseRef: 'FP-10482',
    productPrice: 0.00,
    deliveryFee: 4.95,
    total: 4.95,
    status: 'Delivered',
    carrier: 'Royal Mail Tracked 24',
    trackingNumber: 'RM-7739-8291-GB',
    placedDate: '21 Sep 2026',
    deliveryDate: '22 Sep 2026',
    propertyAddress: '14 Meadowcroft Grove, SW11 3RU'
  },
  {
    id: 'ord-10928',
    orderNumber: '#FP-10928',
    productName: 'Cockroach Attractant & Gel System',
    caseRef: 'FP-10928',
    productPrice: 0.00,
    deliveryFee: 4.95,
    total: 4.95,
    status: 'Delivered',
    carrier: 'Royal Mail Tracked 24',
    trackingNumber: 'RM-3392-1102-GB',
    placedDate: '15 Sep 2026',
    deliveryDate: '16 Sep 2026',
    propertyAddress: 'Flat 4, 19 Brick Lane, E1 6PU'
  },
  {
    id: 'ord-10114',
    orderNumber: '#FP-10114',
    productName: 'Bedbug Detection & Trapping Matrix',
    caseRef: 'FP-10114',
    productPrice: 0.00,
    deliveryFee: 4.95,
    total: 4.95,
    status: 'Delivered',
    carrier: 'Royal Mail Tracked 24',
    trackingNumber: 'RM-9901-4421-GB',
    placedDate: '02 Sep 2026',
    deliveryDate: '04 Sep 2026',
    propertyAddress: 'Studio 3, 88 Clerkenwell Rd, EC1M 5RJ'
  }
];

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Product Instructions — Targeted Rodent Activity Kit',
    category: 'Instructions',
    format: 'PDF',
    date: '21 Sep 2026',
    size: '1.2 MB',
    caseRef: 'FP-10482'
  },
  {
    id: 'doc-2',
    title: 'Delivery Receipt — Order #FP-10482',
    category: 'Receipt',
    format: 'PDF',
    date: '21 Sep 2026',
    size: '140 KB',
    caseRef: 'FP-10482'
  },
  {
    id: 'doc-3',
    title: 'Activity Report — Day 3 Inspection Log',
    category: 'Report',
    format: 'PDF',
    date: 'Yesterday',
    size: '320 KB',
    caseRef: 'FP-10482'
  },
  {
    id: 'doc-4',
    title: 'Proofing Quotation — PQ-1021',
    category: 'Quote',
    format: 'PDF',
    date: '24 Sep 2026',
    size: '480 KB',
    caseRef: 'FP-10482'
  },
  {
    id: 'doc-5',
    title: 'Pre-Visit Inspection Checklist & Health Safety',
    category: 'Instructions',
    format: 'PDF',
    date: '23 Sep 2026',
    size: '890 KB',
    caseRef: 'FP-10482'
  }
];

export const FAQ_DATA = [
  {
    category: 'Product & Eligibility',
    questions: [
      {
        q: 'Is the product really free?',
        a: 'Yes. Eligible homeowners receive the targeted pest control product free of charge. You only cover the standard delivery fee of £4.95 so we can dispatch via tracked courier.'
      },
      {
        q: 'Why do I have to pay delivery?',
        a: 'We provide high-grade products at no cost to help you solve the problem simply, but postage and packaging are fulfilled through tracked Royal Mail 24/48 delivery.'
      },
      {
        q: 'What if the product does not work?',
        a: 'If after your 7-day monitoring period you still see activity or signs persist, you can immediately book our comprehensive £99 Professional Inspection & Treatment service.'
      },
      {
        q: 'How long should I monitor the product?',
        a: 'The standard monitoring period is 7 days. Your customer dashboard guides you day-by-day and prompts you to log activity.'
      },
      {
        q: 'Can I report activity before seven days?',
        a: 'Yes, anytime. If you see elevated activity or require immediate help, you can report early and book a technician visit straight away.'
      }
    ]
  },
  {
    category: 'Professional Service',
    questions: [
      {
        q: 'What does the £99 service include?',
        a: 'A certified pest technician attends your property and performs: complete property inspection, powerful ultrasonic inspection camera survey, high-strength commercial bait placement, heat steaming (for bedbugs), assessment of entry points, and an official report.'
      },
      {
        q: 'Does £99 include proofing?',
        a: 'The £99 visit includes assessment of potential entry routes and initial golf-ball sized proofing where applicable. If extensive structural sealing is required, the technician provides a clear itemised quote.'
      },
      {
        q: 'Do I have to buy proofing?',
        a: 'No, proofing quotes are completely optional with no obligation. You can review the technician findings and photos before making any decision.'
      }
    ]
  },
  {
    category: 'Safety',
    questions: [
      {
        q: 'Are the products safe?',
        a: 'All supplied products are UK compliant and supplied in tamper-resistant, lockable housings or pet-safe dispensers. Always follow the included label instructions.'
      },
      {
        q: 'Can I use the product if I have pets?',
        a: 'Our rodent kits use lockable tamper-proof stations that prevent dogs, cats, and non-target animals from accessing active blocks. We advise placing them in sheltered runs.'
      }
    ]
  },
  {
    category: 'Property',
    questions: [
      {
        q: 'What if I rent my property?',
        a: 'Tenants are fully eligible to claim free products and book inspections. You may share the treatment report directly with your landlord or agent.'
      },
      {
        q: 'What if I live in a flat?',
        a: 'Our products and professional services cover flats, maisonettes, terraced homes, detached residences, and shared buildings across the UK.'
      },
      {
        q: 'What if I do not know whether I have rats or mice?',
        a: 'Start our eligibility check. We ask simple questions about droppings, sounds, and location to supply the exact appropriate kit or have a technician verify.'
      }
    ]
  },
  {
    category: 'Account & Orders',
    questions: [
      {
        q: 'Can I upload photographs?',
        a: 'Yes! Inside your customer dashboard or during activity reporting, you can upload clear photos of droppings, damage, or entry points for our team.'
      },
      {
        q: 'Can I cancel or reschedule my appointment?',
        a: 'Appointments can be rescheduled or cancelled directly through your dashboard up to 24 hours prior to your scheduled time slot.'
      }
    ]
  }
];

export const PEST_DETAILS: Record<string, {
  name: string;
  headline: string;
  signs: string[];
  description: string;
  nextSteps: string;
  kitName: string;
}> = {
  'rats-mice': {
    name: 'Rats & Mice',
    headline: 'Seeing Rats or Mice?',
    signs: [
      'Dark spindle-shaped droppings along walls or behind appliances',
      'Scratching, scuttling or chewing sounds inside lofts or cavity walls',
      'Gnawing marks on wood, wiring, baseboards or plastic food packaging',
      'Shredded paper, insulation or fabric nesting materials',
      'Dark greasy smear marks along baseboards and regular floor runs',
      'Direct sightings during twilight or nocturnal hours'
    ],
    description: 'You are not alone. Rodents enter homes seeking warmth and food. You do not always need a costly contractor on day one. Start with our free targeted kit, monitor for 7 days, and escalate to our £99 visit only if needed.',
    nextSteps: 'Answer 4 simple questions about your home. Claim your free kit, monitor for 7 days, and fix the root entry points.',
    kitName: 'Targeted Rodent Activity Kit'
  },
  'bedbugs': {
    name: 'Bedbugs',
    headline: 'Dealing with Bedbugs?',
    signs: [
      'Small, itchy red bites often appearing in clusters or straight lines',
      'Tiny blood spots on bedsheets, pillowcases, or mattress seams',
      'Dark rusty spots of bedbug excrement on sheets, bed frames or walls',
      'Discarded pale insect skins or tiny translucent egg shells',
      'Unpleasant sweet, musty odor in severe infestations',
      'Live flat, oval insects (around 4-5mm) in mattress seams'
    ],
    description: 'Bedbugs multiply quickly and hide in the smallest mattress crevices. Our detection and interception matrix allows you to immediately identify active zones and isolate your bed.',
    nextSteps: 'Claim your free detection kit. If bedbug activity persists after 7 days, our £99 professional service provides industrial heat steaming and deep eradication.',
    kitName: 'Bedbug Detection & Trapping Matrix'
  },
  'cockroaches': {
    name: 'Cockroaches',
    headline: 'Cockroaches in Your Property?',
    signs: [
      'Cylindrical droppings resembling ground black pepper',
      'Foul, lingering oily or musty smell under appliances',
      'Brown oval egg cases (oothecae) behind kitchen appliances',
      'Irregular chew marks on paper, packaging or book bindings',
      'Shed skins in dark, humid cupboards or boiler cupboards',
      'Nocturnal sightings when switching on kitchen lights'
    ],
    description: 'Cockroaches thrive in warmth and moisture. Our specialized insect attractant paste draws cockroaches out from inaccessible voids and starts reducing colonies fast.',
    nextSteps: 'Get our free attractant kit. Log daily findings in your dashboard. If activity is persistent, book our £99 technician service.',
    kitName: 'Cockroach Attractant & Gel System'
  },
  'foxes': {
    name: 'Foxes',
    headline: 'Fox Activity Around Your Property?',
    signs: [
      'Excavation holes and burrowing under sheds, decking or lawns',
      'Pungent, musky territorial scent marking along garden paths',
      'Overturned domestic wheelie bins or scattered rubbish bags',
      'Loud screaming, barking or howling at night',
      'Droppings containing fur, berries or bone fragments in prominent spots',
      'Regular daytime or evening sightings across your garden'
    ],
    description: 'Urban foxes can damage garden structures and create disturbance. Our bio-scent boundary solution disrupts their territorial pathways safely and humanely.',
    nextSteps: 'Claim the free deterrent kit and monitor for 7 days. If a fox den has been established under decking, book our £99 professional assessment.',
    kitName: 'Fox Perimeter Deterrent Compound'
  },
  'ants': {
    name: 'Ants',
    headline: 'Ant Trails & Infestations?',
    signs: [
      'Visible ant trails entering through door sills or window frames',
      'Small mounds of soil or sand particles emerging from floor tiles',
      'Concentrations of worker ants inside kitchens, pantries, or pet bowls',
      'Occasional swarms of flying ants in warm summer conditions'
    ],
    description: 'Surface sprays often kill only workers while the queen continues laying. Our bait stations allow workers to carry food back to the central nest.',
    nextSteps: 'Claim the free ant control kit. Check results across 7 days. Escalate to £99 professional treatment for deep subfloor nest elimination.',
    kitName: 'Targeted Ant Nest Elimination Kit'
  }
};
