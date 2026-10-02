const PURPLE = '#482b8f';
const GREEN = '#3d7a45';

export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export interface EmailContent {
    heading: string;
    paragraphs: string[];
    details?: { label: string; value: string }[];
    ctaLabel: string;
    ctaPath: string;
    secondaryLink?: { label: string; url: string };
}

export function renderEmail(content: EmailContent): { html: string; text: string } {
    const baseUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');
    const ctaUrl = `${baseUrl}${content.ctaPath}`;
    const supportEmail = process.env.SUPPORT_EMAIL || 'support@freepestproducts.co.uk';

    const paragraphsHtml = content.paragraphs
        .map((p) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">${escapeHtml(p)}</p>`)
        .join('');

    const detailsHtml = content.details?.length
        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border:1px solid #e2e8f0;border-radius:12px;">${content.details
            .map(
                (d) =>
                    `<tr><td style="padding:10px 14px;font-size:13px;color:#64748b;border-bottom:1px solid #f1f5f9;">${escapeHtml(d.label)}</td><td style="padding:10px 14px;font-size:13px;font-weight:bold;color:#0f172a;text-align:right;border-bottom:1px solid #f1f5f9;">${escapeHtml(d.value)}</td></tr>`
            )
            .join('')}</table>`
        : '';

    const secondaryHtml = content.secondaryLink
        ? `<p style="margin:20px 0 0;font-size:13px;"><a href="${content.secondaryLink.url}" style="color:${PURPLE};">${escapeHtml(content.secondaryLink.label)}</a></p>`
        : '';

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
                <h1 style="margin:0 0 16px;font-size:24px;color:${PURPLE};">${escapeHtml(content.heading)}</h1>
                ${paragraphsHtml}
                ${detailsHtml}
                <a href="${ctaUrl}" style="display:inline-block;background:${GREEN};color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 28px;border-radius:999px;">${escapeHtml(content.ctaLabel)}</a>
                ${secondaryHtml}
                <p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:#64748b;">
                  Need help? Contact us at <a href="mailto:${supportEmail}" style="color:${PURPLE};">${supportEmail}</a>.
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
        content.heading,
        '',
        ...content.paragraphs,
        '',
        ...(content.details ?? []).map((d) => `${d.label}: ${d.value}`),
        ...(content.details?.length ? [''] : []),
        `${content.ctaLabel}: ${ctaUrl}`,
        ...(content.secondaryLink ? [`${content.secondaryLink.label}: ${content.secondaryLink.url}`] : []),
        '',
        `Need help? Contact ${supportEmail}.`,
    ].join('\n');

    return { html, text };
}