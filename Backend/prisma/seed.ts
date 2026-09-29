import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

async function main() {
    if (process.env.NODE_ENV === 'production' && !process.env.SEED_ALLOW_PRODUCTION) {
        throw new Error('Refusing to seed demo accounts in production (set SEED_ALLOW_PRODUCTION=1 to override).');
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