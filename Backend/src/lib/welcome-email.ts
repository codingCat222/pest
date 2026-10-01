import { sendMail } from './mailer';

const PURPLE = '#482b8f';
const GREEN = '#3d7a45';

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const STEPS = [
    'Pay the delivery charge to claim your free product.',
    'Use the product exactly as the instructions say.',
    'Monitor activity for 7 days and report what you see in your dashboard.',
    'Still seeing activity? You can book a professional visit.',
];

export async function sendWelcomeEmail(user: { email: string; fullName: string }): Promise<void> {
    try {
        const firstName = user.fullName.trim().split(/\s+/)[0] || 'there';
        const dashboardUrl = `${(process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '')}/dashboard`;
        const supportEmail = process.env.SUPPORT_EMAIL || 'support@freepestproducts.co.uk';

        const stepsHtml = STEPS.map(
            (step, i) =>
                `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:12px;background:${PURPLE};color:#ffffff;font-size:12px;font-weight:bold;">${i + 1}</span></td><td style="padding:6px 0;font-size:14px;color:#334155;">${escapeHtml(step)}</td></tr>`
        ).join('');

        const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f2fa;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2fa;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:${PURPLE};padding:24px 32px;">
                <span style="font-size:22px;font-weight:bold;color:#ffffff;">Free Pest Products</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 12px;font-size:24px;color:${PURPLE};">Welcome, ${escapeHtml(firstName)}!</h1>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                  Your account is ready. You can now sign in with this email address and the password you created to track everything in one place.
                </p>
                <p style="margin:0 0 8px;font-size:14px;font-weight:bold;color:#0f172a;">What happens next</p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">${stepsHtml}</table>
                <a href="${dashboardUrl}" style="display:inline-block;background:${GREEN};color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 28px;border-radius:999px;">Go to my dashboard</a>
                <p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:#64748b;">
                  Need help? Reply to this email or contact us at <a href="mailto:${supportEmail}" style="color:${PURPLE};">${supportEmail}</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

        const text = [
            `Welcome, ${firstName}!`,
            '',
            'Your Free Pest Products account is ready. Sign in with this email address and the password you created.',
            '',
            'What happens next:',
            ...STEPS.map((step, i) => `${i + 1}. ${step}`),
            '',
            `Go to your dashboard: ${dashboardUrl}`,
            '',
            `Need help? Contact ${supportEmail}.`,
        ].join('\n');

        await sendMail({
            to: user.email,
            subject: 'Welcome to Free Pest Products',
            html,
            text,
        });
    } catch (err) {
        console.error('Failed to send welcome email:', err);
    }
}