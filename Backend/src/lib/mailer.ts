import nodemailer, { Transporter } from 'nodemailer';

let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
    if (transporter !== undefined) return transporter;

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.warn('SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASS). Emails will not be sent.');
        transporter = null;
        return null;
    }

    const port = Number(SMTP_PORT) || 587;
    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    return transporter;
}

export interface MailOptions {
    to: string;
    subject: string;
    html: string;
    text: string;
}

export async function sendMail(options: MailOptions): Promise<void> {
    const client = getTransporter();
    if (!client) return;

    await client.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
    });
}