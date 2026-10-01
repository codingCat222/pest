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
        a: 'If after your 7-day monitoring period you still see activity or signs persist, you can immediately book our comprehensive £95.99 Professional Inspection & Treatment service.'
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
        q: 'What does the £95.99 service include?',
        a: 'A certified pest technician attends your property and performs: complete property inspection, powerful ultrasonic inspection camera survey, high-strength commercial bait placement, heat steaming (for bedbugs), assessment of entry points, and an official report.'
      },
      {
        q: 'Does £95.99 include proofing?',
        a: 'The £95.99 visit includes assessment of potential entry routes and initial golf-ball-size hole proofing where applicable (rodents). If extensive structural sealing is required, the technician provides a clear itemised quote.'
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

// -------------------------------------------------------------
// PACK ITEMS — now pest-specific
// -------------------------------------------------------------
export const PACK_ITEMS: Record<string, string[]> = {
  'rats-mice': [
    '2 Ultrasonic Pest Repellents',
    '2 Wooden Traps',
    '2 Plastic Bait boxes'
  ],
  'bedbugs': [
    '2 Ultrasonic Pest Repellents',
    '2 Bedbug Interception Traps',
    '2 Monitoring Disks'
  ],
  'cockroaches': [
    '2 Ultrasonic Pest Repellents',
    '2 Cockroach Gel Bait Stations',
    '2 Sticky Monitoring Traps'
  ],
  'foxes': [
    '2 Ultrasonic Pest Repellents',
    '2 Fox Deterrent Sachets',
    '2 Perimeter Marking Stakes'
  ],
  'ants': [
    '2 Ultrasonic Pest Repellents',
    '2 Ant Bait Stations',
    '2 Ant Gel Syringes'
  ],
  'other': [
    '2 Ultrasonic Pest Repellents',
    '2 Multi-Species Monitoring Traps',
    '2 Specialist Bait Stations'
  ]
};

export const PACK_LABELS: Record<string, string> = {
  'rats-mice': 'rat-control',
  'bedbugs': 'bedbug-control',
  'cockroaches': 'cockroach-control',
  'foxes': 'fox-control',
  'ants': 'ant-control',
  'other': 'pest-control'
};

export const PRO_SERVICE_INCLUDES: Record<string, { title: string; items: string[] }> = {
  'rats-mice': {
    title: 'Still Seeing Rats or Mice?',
    items: [
      'Property inspection',
      'High Strength bait',
      'Powerful ultrasonic inspection camera',
      'Golf-ball-size hole proofing materials',
      'Assessment of signs of activity',
      'Identification of likely activity areas',
      'Review of previous treatment',
      'Appropriate professional treatment where applicable',
      'Recommendations for next steps',
      'Assessment of potential entry points'
    ]
  },
  'bedbugs': {
    title: 'Still Seeing Bed bugs?',
    items: [
      'Property inspection',
      'Powerful ultrasonic inspection camera',
      'Spraying of one room',
      'Micro session with Heat Steamer (for stubborn bedbugs)',
      'UV Light inspection',
      'Assessment of signs of activity',
      'Identification of likely activity areas',
      'Review of previous treatment',
      'Appropriate professional treatment where applicable',
      'Recommendations for next steps',
      'Assessment of potential entry points'
    ]
  },
  'ants': {
    title: 'Still Seeing Ants?',
    items: [
      'Property inspection',
      'High Strength bait',
      'Powerful ultrasonic inspection camera',
      'Gap proofing materials',
      'Assessment of signs of activity',
      'Identification of likely activity areas',
      'Review of previous treatment',
      'Appropriate professional treatment where applicable',
      'Recommendations for next steps',
      'Assessment of potential entry points'
    ]
  },
  'cockroaches': {
    title: 'Still Seeing Cockroaches?',
    items: [
      'Property inspection',
      'High Strength bait / professional spray treatment',
      'Powerful ultrasonic inspection camera',
      'Assessment of signs of activity',
      'Identification of likely activity areas',
      'Review of previous treatment',
      'Appropriate professional treatment where applicable',
      'Recommendations for next steps',
      'Assessment of potential entry points'
    ]
  },
  'foxes': {
    title: 'Still Seeing Foxes?',
    items: [
      'Property inspection',
      'Assessment of signs of activity',
      'Identification of likely activity areas',
      'Application of High strength deterrent treatment',
      'Appropriate professional treatment where applicable',
      'Recommendations for Trapping Upgrade',
      'Assessment of potential entry points'
    ]
  },
  'other': {
    title: 'Still Seeing Other Pests?',
    items: [
      'Property inspection',
      'Powerful ultrasonic inspection camera',
      'Assessment of signs of activity',
      'Identification of likely activity areas',
      'Review of previous treatment',
      'Appropriate professional treatment where applicable',
      'Recommendations for next steps',
      'Assessment of potential entry points'
    ]
  }
};

export const PEST_DETAILS: Record<string, {
  name: string;
  headline: string;
  subheading?: string;
  signs: string[];
  description: string;
  nextSteps: string;
  kitName: string;
  image: string;
}> = {
  'rats-mice': {
    name: 'Rats & Mice',
    headline: 'Seeing Rats or Mice?',
    subheading: "You're not alone.",
    image: '/Images/rodents-hero.jpg',
    signs: [
      'Droppings',
      'Scratching or movement sounds',
      'Gnawing',
      'Damage to food packaging',
      'Nesting material',
      'Grease marks',
      'Sightings'
    ],
    description: "You're not alone. Rodents enter homes and properties seeking warmth and food sources. You don't always need an expensive exterminator on day one. Start with our free targeted kit, monitor for 7 days, and move to our £95.99 professional service only if activity continues.",
    nextSteps: "We'll ask you a few questions about what you've seen. If you're eligible, you'll be able to claim an available product and pay the delivery cost. You'll then monitor the situation. If activity continues, you can move to our professional service.",
    kitName: 'Targeted Rodent Activity Kit'
  },
  'bedbugs': {
    name: 'Bedbugs',
    headline: 'Dealing with Bedbugs?',
    subheading: "You're not alone.",
    image: '/Images/bedbugs-hero.jpg',
    signs: [
      'Small, itchy red bites appearing in clusters or lines',
      'Blood spots or rust-coloured marks on sheets and mattresses',
      'Shed insect skins or tiny pale eggshells around bed joints',
      'Sweet, musty unpleasant odour in sleeping areas',
      'Live flat, reddish-brown oval insects (4-5mm) in seams',
      'Bites occurring overnight on exposed arms, legs, or neck'
    ],
    description: "You're not alone. Bedbug infestations can spread rapidly across furniture and fabrics. Our targeted interception kit isolates active zones immediately, helping you monitor before escalating to heat treatment.",
    nextSteps: "We'll ask you a few questions about what you've seen. If you're eligible, you'll be able to claim an available product and pay the delivery cost. You'll then monitor the situation. If activity continues, you can move to our professional service.",
    kitName: 'Bedbug Detection & Trapping Matrix'
  },
  'cockroaches': {
    name: 'Cockroaches',
    headline: 'Cockroaches in Your Property?',
    subheading: "You're not alone.",
    image: '/Images/cockroaches-hero.jpg',
    signs: [
      'Droppings resembling ground black pepper or coffee grounds',
      'Foul, lingering oily or damp smell under sinks and appliances',
      'Brown oval egg cases (oothecae) hidden in warm crevices',
      'Shed skins and damage to food packaging or wallpaper glue',
      'Sightings of insects scuttling when lights are turned on at night',
      'High activity near heat sources like refrigerators and boilers'
    ],
    description: "You're not alone. Cockroaches seek damp, warm spaces near food sources. Our professional-grade attractant system draws them out of harbourages so you can quantify and curb the infestation quickly.",
    nextSteps: "We'll ask you a few questions about what you've seen. If you're eligible, you'll be able to claim an available product and pay the delivery cost. You'll then monitor the situation. If activity continues, you can move to our professional service.",
    kitName: 'Cockroach Attractant & Gel System'
  },
  'foxes': {
    name: 'Foxes',
    headline: 'Fox Activity Around Your Property?',
    subheading: "You're not alone.",
    image: '/Images/foxes-hero.jpg',
    signs: [
      'Excavation holes and burrowing under decking, sheds, or outbuildings',
      'Pungent, musky territorial scent marking along perimeter paths',
      'Overturned domestic wheelie bins or torn waste bags',
      'Loud screaming, barking, or howling calls after dark',
      'Droppings containing bone fragments, fur, or berries in visible areas',
      'Frequent sightings across garden lawns during daytime or dusk'
    ],
    description: "You're not alone. Urban foxes frequently establish dens near human settlements. Our humane perimeter bio-deterrent interrupts their territorial markings without causing harm to wildlife or domestic pets.",
    nextSteps: "We'll ask you a few questions about what you've seen. If you're eligible, you'll be able to claim an available product and pay the delivery cost. You'll then monitor the situation. If activity continues, you can move to our professional service.",
    kitName: 'Fox Perimeter Deterrent Compound'
  },
  'ants': {
    name: 'Ants',
    headline: 'Ant Trails & Infestations?',
    subheading: "You're not alone.",
    image: '/Images/ants-hero.jpg',
    signs: [
      'Continuous worker ant trails along skirting boards and door frames',
      'Fine sand or soil mounds emerging from tiles, pavers, or brickwork',
      'Heavy clusters around sweet foods, pet bowls, or kitchen pantries',
      'Nesting activity under flooring, patio slabs, or insulation',
      'Winged flying ant swarms emerging during warm humid spells'
    ],
    description: "You're not alone. Surface insecticides only target foragers while the queen remains safe underground. Our dual-action bait stations allow worker ants to carry active treatment directly back to eradicate the nest core.",
    nextSteps: "We'll ask you a few questions about what you've seen. If you're eligible, you'll be able to claim an available product and pay the delivery cost. You'll then monitor the situation. If activity continues, you can move to our professional service.",
    kitName: 'Targeted Ant Nest Elimination Kit'
  },
  'other': {
    name: 'Other Pests',
    headline: 'Dealing with Other Pests?',
    subheading: "You're not alone.",
    image: '/Images/technician.jpeg',
    signs: [
      'Unexplained buzzing, fluttering, or scratching sounds in roof spaces',
      'Wasp, hornet, or bee nests under roof tiles or garden structures',
      'Moth larvae feeding on natural fibres, carpets, or stored woollens',
      'Flea bites on ankles or pets scratching persistently',
      'Silverfish or beetle sightings in bathrooms, kitchens, or basements',
      'Damage to electrical cabling, pipe insulation, or timber beams'
    ],
    description: "You're not alone. From flying insects and textiles pests to garden wildlife, diagnosing the exact pest is key to effective control. Our diagnostic questionnaire guides you to the correct targeted product or rapid expert inspection.",
    nextSteps: "We'll ask you a few questions about what you've seen. If you're eligible, you'll be able to claim an available product and pay the delivery cost. You'll then monitor the situation. If activity continues, you can move to our professional service.",
    kitName: 'Specialist Pest Assessment & Control Kit'
  }
};