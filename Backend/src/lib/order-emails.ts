import { sendMail } from './mailer';
import { renderEmail } from './email-template';

interface OrderEmailData {
    email: string;
    fullName: string;
    productName: string;
    referenceNumber: string;
}

function firstNameOf(fullName: string): string {
    return fullName.trim().split(/\s+/)[0] || 'there';
}

export async function sendDispatchedEmail(
    data: OrderEmailData & { courier: string; trackingNumber?: string | null }
): Promise<void> {
    try {
        const details = [
            { label: 'Order', value: data.referenceNumber },
            { label: 'Product', value: data.productName },
            { label: 'Courier', value: data.courier },
        ];
        if (data.trackingNumber) details.push({ label: 'Tracking number', value: data.trackingNumber });

        const royalMail = /royal\s*mail/i.test(data.courier) && data.trackingNumber;
        const { html, text } = renderEmail({
            heading: 'Your free product is on its way',
            paragraphs: [
                `Hi ${firstNameOf(data.fullName)}, good news: your ${data.productName} has been dispatched.`,
                'When it arrives, read the instructions carefully before you start. Your 7-day monitoring period begins once it has been delivered.',
            ],
            details,
            ctaLabel: 'View my order',
            ctaPath: '/dashboard/orders',
            secondaryLink: royalMail
                ? {
                    label: 'Track your parcel',
                    url: `https://www.royalmail.com/track-your-item#/tracking-results/${encodeURIComponent(data.trackingNumber as string)}`,
                }
                : undefined,
        });

        await sendMail({ to: data.email, subject: 'Your free product is on its way', html, text });
    } catch (err) {
        console.error('Failed to send dispatch email:', err);
    }
}

export async function sendDeliveredEmail(data: OrderEmailData & { monitoringDays: number }): Promise<void> {
    try {
        const { html, text } = renderEmail({
            heading: 'Your product has been delivered',
            paragraphs: [
                `Hi ${firstNameOf(data.fullName)}, your ${data.productName} has been delivered, and your ${data.monitoringDays}-day monitoring period starts today.`,
                'Use the product exactly as the instructions say, then report what you see in your dashboard. If you are still seeing activity at the end of the period, you can book a professional visit from your dashboard.',
            ],
            details: [
                { label: 'Order', value: data.referenceNumber },
                { label: 'Product', value: data.productName },
                { label: 'Monitoring period', value: `${data.monitoringDays} days` },
            ],
            ctaLabel: 'Go to my dashboard',
            ctaPath: '/dashboard',
        });

        await sendMail({ to: data.email, subject: 'Your product has been delivered', html, text });
    } catch (err) {
        console.error('Failed to send delivery email:', err);
    }
}