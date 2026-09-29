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
        a: 'The £95.99 visit includes assessment of potential entry routes and initial golf-ball sized proofing where applicable. If extensive structural sealing is required, the technician provides a clear itemised quote.'
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
    description: 'You are not alone. Rodents enter homes seeking warmth and food. You do not always need a costly contractor on day one. Start with our free targeted kit, monitor for 7 days, and escalate to our £95.99 visit only if needed.',
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
    nextSteps: 'Claim your free detection kit. If bedbug activity persists after 7 days, our £95.99 professional service provides industrial heat steaming and deep eradication.',
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
    nextSteps: 'Get our free attractant kit. Log daily findings in your dashboard. If activity is persistent, book our £95.99 technician service.',
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
    nextSteps: 'Claim the free deterrent kit and monitor for 7 days. If a fox den has been established under decking, book our £95.99 professional assessment.',
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
    nextSteps: 'Claim the free ant control kit. Check results across 7 days. Escalate to £95.99 professional treatment for deep subfloor nest elimination.',
    kitName: 'Targeted Ant Nest Elimination Kit'
  }
};