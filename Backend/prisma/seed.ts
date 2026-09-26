import { PrismaClient, UserRole, PestType, ActivityLocation, DurationOption, OrderStatus, AppointmentStatus, Severity, ActivityLevel } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Users ──────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('demo1234', 12);

  const admin = await prisma.user.upsert({
    where:  { email: 'admin@pestcontrol.co.uk' },
    update: {},
    create: {
      email: 'admin@pestcontrol.co.uk',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      isEmailVerified: true,
    },
  });

  const customer = await prisma.user.upsert({
    where:  { email: 'john.samuel@example.co.uk' },
    update: {},
    create: {
      email: 'john.samuel@example.co.uk',
      passwordHash,
      firstName: 'John',
      lastName: 'Samuel',
      phone: '07700 900382',
      role: UserRole.CUSTOMER,
      isEmailVerified: true,
    },
  });

  console.log(`✅ Users created: admin (${admin.email}), customer (${customer.email})`);

  // ── Products ───────────────────────────────────────────
  const rodentProduct = await prisma.product.upsert({
    where:  { id: 'prod-rat-mice' },
    update: {},
    create: {
      id:           'prod-rat-mice',
      name:         'Targeted Rodent Activity Kit',
      category:     'Rats & Mice',
      pestTarget:   PestType.RATS_OR_MICE,
      regularPrice: 28.50,
      deliveryCost: 4.95,
      description:  'UK approved tamper-resistant stations with dual-monitoring formulation and high-acceptance bait blocks designed for residential placement.',
      badge:        'FREE + £4.95 DELIVERY',
      imageUrl:     'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      productContents: {
        create: [
          { item: '2x Secure lockable tamper-resistant bait stations', sortOrder: 0 },
          { item: 'Dual-key security set', sortOrder: 1 },
          { item: 'Active rodent lure blocks (pre-measured)', sortOrder: 2 },
          { item: 'Step-by-step 7-day monitoring log', sortOrder: 3 },
        ],
      },
      instructions: {
        create: [
          { step: 'Place stations along wall edges or near identified runs.', sortOrder: 0 },
          { step: 'Check stations on Day 3 and Day 7 without moving unless empty.', sortOrder: 1 },
          { step: 'Always use enclosed safety key to inspect block status.', sortOrder: 2 },
          { step: 'Record activity level in your customer dashboard.', sortOrder: 3 },
        ],
      },
    },
  });

  console.log(`✅ Product seeded: ${rodentProduct.name}`);

  // ── Case ──────────────────────────────────────────────
  const caseRecord = await prisma.case.upsert({
    where:  { referenceNumber: 'FP-10482' },
    update: {},
    create: {
      referenceNumber:  'FP-10482',
      propertyName:     'Rat & Mouse — Home',
      propertyAddress:  '14 Meadowcroft Grove',
      postcode:         'SW11 3RU',
      pest:             PestType.RATS_OR_MICE,
      activityLocation: ActivityLocation.INSIDE_HOME,
      duration:         DurationOption.ONE_TO_FOUR_WEEKS,
      status:           'MONITORING',
      monitoringDay:    4,
      monitoringDaysTotal: 7,
      activityReported: ActivityLevel.LESS_ACTIVITY,
      activityNotes:    'Checked bait stations in kitchen void; slight feeding marks observed.',
      lastReportedDate: new Date(),
      technicianName:   'Michael Vance',
      customerId:       customer.id,
      productId:        rodentProduct.id,
      sightings: {
        create: [
          { sighting: 'Droppings' },
          { sighting: 'Scratching/noises' },
        ],
      },
      timeline: {
        create: [
          { title: 'Eligibility Approved', details: 'Pest questionnaire completed for residential address.', completed: true },
          { title: 'Free Product Claimed', details: 'Targeted Rodent Activity Kit allocated at £0.00.', completed: true },
          { title: 'Delivery Payment Received', details: '£4.95 Royal Mail Tracked 24 postage confirmed.', completed: true },
          { title: 'Product Dispatched', details: 'Shipped from UK Central Depot. Tracking #RM-7739-8291-GB.', completed: true },
          { title: 'Product Delivered', details: 'Delivered to porch and confirmed by resident.', completed: true },
          { title: 'Monitoring Started', details: '7-day observation period underway. Day 4 in progress.', completed: true, isCurrent: true },
        ],
      },
    },
  });

  // Create Order
  await prisma.order.upsert({
    where:  { caseId: caseRecord.id },
    update: {},
    create: {
      orderNumber:   '#FP-10482',
      caseId:        caseRecord.id,
      productPrice:  0,
      deliveryFee:   4.95,
      total:         4.95,
      status:        OrderStatus.DELIVERED,
      carrier:       'Royal Mail Tracked 24',
      trackingNumber: 'RM-7739-8291-GB',
      placedAt:      new Date('2026-09-21'),
      deliveredAt:   new Date('2026-09-22'),
    },
  });

  // Create Appointment
  await prisma.appointment.upsert({
    where:  { caseId: caseRecord.id },
    update: {},
    create: {
      caseId:          caseRecord.id,
      appointmentDate: new Date('2026-09-26'),
      appointmentTime: '10:00 AM',
      status:          AppointmentStatus.SCHEDULED,
      technicianName:  'Michael Vance',
    },
  });

  // Create Proofing Quote
  await prisma.proofingQuote.upsert({
    where:  { caseId: caseRecord.id },
    update: {},
    create: {
      reference:            'PQ-1021',
      caseId:               caseRecord.id,
      description:          'Rear door threshold exclusion, copper mesh packing to kitchen soil pipe cavity, and air brick barrier fitting.',
      technicianExplanation: 'Inspection revealed a 18mm opening under the rear scullery door and an unsealed soil stack penetration through the cavity wall.',
      materialsCost:        110.00,
      labourCost:           94.17,
      subtotal:             204.17,
      vat:                  40.83,
      total:                245.00,
      validUntil:           new Date('2026-09-30'),
      status:               'PENDING',
      findings: {
        create: [
          {
            title: 'Gap beneath rear door',
            description: 'Potential pest access point beneath timber threshold allowing rodent ingress.',
            recommendedWork: 'Install heavy-duty aluminium brush strip and seal surrounding perimeter frame.',
            severity: Severity.HIGH,
            imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
            sortOrder: 0,
          },
          {
            title: 'Soil pipe wall breach',
            description: '35mm diameter void around external waste plumbing entering kitchen subfloor.',
            recommendedWork: 'Pack void with expanding stainless steel wire mesh and elastomeric rodent sealant.',
            severity: Severity.HIGH,
            imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
            sortOrder: 1,
          },
          {
            title: 'Subfloor terracotta air brick',
            description: 'Missing original grill bars leaving 20mm openings directly into cavity.',
            recommendedWork: 'Affix precision galvanized stainless steel air brick rodent exclusion cowl.',
            severity: Severity.MEDIUM,
            imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=600&q=80',
            sortOrder: 2,
          },
        ],
      },
    },
  });

  console.log(`✅ Case seeded: ${caseRecord.referenceNumber}`);
  console.log('\n🎉 Database seeded successfully!');
  console.log('\nDemo credentials:');
  console.log('  Customer: john.samuel@example.co.uk / demo1234');
  console.log('  Admin:    admin@pestcontrol.co.uk / demo1234');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
