import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

const catalogue = [
    {
        "name": "Targeted Rodent Activity Kit",
        "category": "Rats & Mice",
        "pestTarget": "Rats or mice",
        "regularPrice": 28.5,
        "deliveryCost": 4.95,
        "description": "UK approved tamper-resistant stations with dual-monitoring formulation and high-acceptance bait blocks designed for residential placement.",
        "contents": [
            "2x Secure lockable tamper-resistant bait stations",
            "Dual-key security set",
            "Active rodent lure blocks (pre-measured)",
            "Step-by-step 7-day monitoring log"
        ],
        "instructions": [
            "Place stations along wall edges or near identified runs.",
            "Check stations on Day 3 and Day 7 without moving unless empty.",
            "Always use enclosed safety key to inspect block status.",
            "Record activity level in your customer dashboard."
        ],
        "safetyNotice": "Keep away from non-target animals, children and pets. Use strictly in supplied tamper-resistant stations.",
        "badge": "FREE + £4.95 DELIVERY",
        "imageUrl": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Bedbug Detection & Trapping Matrix",
        "category": "Bedbugs",
        "pestTarget": "Bedbugs",
        "regularPrice": 32,
        "deliveryCost": 4.95,
        "description": "Specialist adhesive interceptor traps and natural barrier spray formulated to halt bedbug movement across bed frames and skirting.",
        "contents": [
            "4x Mattress post barrier interceptor cups",
            "2x Active pheromone harborage detection monitors",
            "Targeted perimeter repellent solution",
            "Inspection guide magnifier"
        ],
        "instructions": [
            "Position interceptor cups directly beneath all four bed posts.",
            "Ensure bed linen does not touch the carpet or walls.",
            "Inspect harborage traps daily for nymphs or cast skins.",
            "Log findings on Day 7 to evaluate if heat steaming is needed."
        ],
        "safetyNotice": "Non-toxic mechanical barriers. Safe around children and domestic pets when installed as directed.",
        "badge": "FREE + £4.95 DELIVERY",
        "imageUrl": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Cockroach Attractant & Gel System",
        "category": "Cockroach",
        "pestTarget": "Cockroaches",
        "regularPrice": 29,
        "deliveryCost": 4.95,
        "description": "Professional high-potency insect attraction paste with enclosed precision dispensers for kitchens, pipe ducts, and under-sink units.",
        "contents": [
            "4x Low-profile sticky harbourage detection zones",
            "1x Precision attractant gel application tube",
            "Surface preparation wipe wipes",
            "Dark-zone activity guide"
        ],
        "instructions": [
            "Apply pea-sized dots near warm motor housings, hinges, and behind sinks.",
            "Avoid spraying cleaning chemicals over treated points.",
            "Leave detection zones undisturbed for 7 days.",
            "Check catch rate and log into dashboard."
        ],
        "safetyNotice": "Store in cool place. Avoid direct skin contact and keep away from open food storage.",
        "badge": "FREE + £4.95 DELIVERY",
        "imageUrl": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Fox Perimeter Deterrent Compound",
        "category": "Fox",
        "pestTarget": "Foxes",
        "regularPrice": 26,
        "deliveryCost": 4.95,
        "description": "Bio-scent boundary treatment formulated to discourage urban foxes from denning in gardens, under decking, or disturbing bins.",
        "contents": [
            "1x Concentrated natural sensory deterrent solution",
            "1x Easy-mist trigger dispenser bottle",
            "Marking flags for perimeter border",
            "Den detection guide"
        ],
        "instructions": [
            "Spray around boundary fence perimeters, under sheds, and near waste bins.",
            "Re-apply after heavy rainfall or after 5 days.",
            "Monitor whether digging or nocturnal scent marking ceases.",
            "Escalate to professional exclusion if access under decking persists."
        ],
        "safetyNotice": "Natural scent based. Harmless to flora and pets once dry.",
        "badge": "FREE + £4.95 DELIVERY",
        "imageUrl": "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=600&q=80"
    }
];

async function main() {
    if (process.env.NODE_ENV === 'production' && !process.env.SEED_ALLOW_PRODUCTION) {
        throw new Error('Refusing to seed demo accounts in production (set SEED_ALLOW_PRODUCTION=1 to override).');
    }

    for (const product of catalogue) {
        const exists = await prisma.product.findFirst({ where: { name: product.name } });
        if (!exists) {
            await prisma.product.create({
                data: { ...product, contents: JSON.stringify(product.contents), instructions: JSON.stringify(product.instructions) },
            });
        }
    }

    const adminEmail = 'admin@freepestproducts.test';
    const customerEmail = 'customer@freepestproducts.test';

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            passwordHash: await bcrypt.hash('Admin123!', 10),
            fullName: 'Demo Admin',
            role: 'ADMIN',
        },
    });

    const customer = await prisma.user.upsert({
        where: { email: customerEmail },
        update: {},
        create: {
            email: customerEmail,
            passwordHash: await bcrypt.hash('Customer123!', 10),
            fullName: 'Sarah Jenkins',
            phone: '07700 900123',
            role: 'CUSTOMER',
        },
    });

    await prisma.technician.upsert({
        where: { email: 'tech@freepestproducts.test' },
        update: {},
        create: { fullName: 'Dan Whitaker', email: 'tech@freepestproducts.test', phone: '07700 900456' },
    });

    const referenceNumber = 'FPP-10001';
    const existing = await prisma.case.findUnique({ where: { referenceNumber } });
    if (existing) {
        console.log('Demo case already exists, skipping.');
        return;
    }

    const demoCase = await prisma.case.create({
        data: {
            referenceNumber,
            userId: customer.id,
            propertyName: '14 Meadowcroft Grove',
            customerName: customer.fullName,
            customerEmail,
            customerPhone: '07700 900123',
            propertyAddress: '14 Meadowcroft Grove, Manchester',
            postcode: 'M14 5AB',
            pest: 'Rats or mice',
            location: 'Inside my home',
            status: 'MONITORING',
            productName: 'Rodent Activity Treatment Kit',
            deliveryFee: 4.99,
            orderDate: daysAgo(5),
            trackingNumber: 'RM123456789GB',
            courier: 'Royal Mail',
            monitoringDay: 4,
            monitoringDaysTotal: 7,
            timelineEntries: {
                create: [
                    { title: 'Product claimed', date: daysAgo(5), completed: true },
                    { title: 'Delivery paid', date: daysAgo(5), completed: true },
                    { title: 'Dispatched', date: daysAgo(4), completed: true, details: 'Royal Mail Tracked 48' },
                    { title: 'Delivered', date: daysAgo(3), completed: true },
                    { title: 'Monitoring started', date: daysAgo(3), completed: false, current: true },
                ],
            },
            orders: {
                create: [
                    {
                        orderNumber: 'ORD-10001',
                        productName: 'Rodent Activity Treatment Kit',
                        productPrice: 0,
                        deliveryFee: 4.99,
                        total: 4.99,
                        status: 'Delivered',
                        carrier: 'Royal Mail',
                        trackingNumber: 'RM123456789GB',
                        placedDate: daysAgo(5),
                        deliveryDate: daysAgo(3),
                        propertyAddress: '14 Meadowcroft Grove, Manchester, M14 5AB',
                    },
                ],
            },
            documents: {
                create: [
                    { title: 'Product instructions', category: 'Instructions', size: '412 KB', date: daysAgo(5) },
                    { title: 'Delivery receipt', category: 'Receipt', size: '96 KB', date: daysAgo(5) },
                ],
            },
        },
    });

    console.log(`Seeded demo case ${demoCase.referenceNumber} for ${customerEmail}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());