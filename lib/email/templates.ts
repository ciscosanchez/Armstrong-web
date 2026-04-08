import 'server-only';
import { Resend } from 'resend';
import type { Lead } from '@prisma/client';

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY not configured');
  return new Resend(key);
}

const FROM = process.env.RESEND_FROM_ADDRESS ?? 'no-reply@goarmstrong.com';
const SALES_EMAIL = process.env.SALES_NOTIFICATION_EMAIL ?? 'sales@goarmstrong.com';

const MOVE_TYPE_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Residential Moving',
  COMMERCIAL: 'Commercial Moving',
  SUPPLY_CHAIN: 'Supply Chain',
  DATA_CENTER: 'Data Center Logistics',
};

/**
 * Send a confirmation email to the user after form submission.
 */
export async function sendLeadConfirmation(
  toEmail: string,
  firstName: string,
  moveType: string,
): Promise<void> {
  const resend = getResend();

  await resend.emails.send({
    from: `The Armstrong Company <${FROM}>`,
    to: toEmail,
    subject: "We've received your request — The Armstrong Company",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #00263F;">
        <div style="background: #00263F; padding: 32px 40px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">The Armstrong Company</h1>
        </div>
        <div style="padding: 40px;">
          <h2 style="margin-top: 0;">Hi ${firstName},</h2>
          <p>Thanks for reaching out. We've received your request for
          <strong>${MOVE_TYPE_LABELS[moveType.toUpperCase()] ?? moveType}</strong> services.</p>
          <p>One of our moving experts will be in touch within 1 business hour.</p>
          <p>In the meantime, you can:</p>
          <ul>
            <li><a href="https://goarmstrong.com/ballpark-estimate" style="color: #00a4eb;">Get an instant ballpark estimate</a></li>
            <li><a href="https://goarmstrong.com/virtual-survey" style="color: #00a4eb;">Schedule a virtual survey</a></li>
            <li><a href="https://goarmstrong.com/resources" style="color: #00a4eb;">Browse moving resources and tips</a></li>
          </ul>
          <p>Questions? Call us at <a href="tel:+18002887396" style="color: #00a4eb;">800-288-7396</a>.</p>
          <p style="margin-top: 40px; font-size: 14px; color: #69829e;">
            Our world moves around you.<br />
            <strong>The Armstrong Company</strong><br />
            8275 Tournament Drive, Suite 200 · Memphis, TN 38125
          </p>
        </div>
      </div>
    `,
  });
}

/**
 * Send a lead notification to the sales team.
 * Hot leads (score ≥ 100) get an urgent subject line.
 */
export async function sendLeadNotification(lead: Lead): Promise<void> {
  const resend = getResend();
  const isHot = (lead.score ?? 0) >= 100;
  const moveType = MOVE_TYPE_LABELS[lead.type] ?? lead.type;

  const subject = isHot
    ? `🔥 Hot Lead: ${lead.firstName} ${lead.lastName} — ${moveType}`
    : `New Lead: ${lead.firstName} ${lead.lastName} — ${moveType}`;

  await resend.emails.send({
    from: `Armstrong Leads <${FROM}>`,
    to: SALES_EMAIL,
    subject,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #00263F;">
        <div style="background: ${isHot ? '#00bc82' : '#00263F'}; padding: 24px 32px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 18px;">
            ${isHot ? '🔥 Hot Lead' : 'New Lead'} — Armstrong
          </h2>
        </div>
        <div style="padding: 32px; border: 1px solid #d2dae2; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: 600; width: 40%;">Name</td>
                <td>${lead.firstName} ${lead.lastName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Email</td>
                <td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Phone</td>
                <td><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Move Type</td>
                <td>${moveType}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Origin ZIP</td>
                <td>${lead.originZip ?? '—'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Destination ZIP</td>
                <td>${lead.destZip ?? '—'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Move Date</td>
                <td>${lead.moveDate ? lead.moveDate.toLocaleDateString() : '—'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Lead Score</td>
                <td><strong>${lead.score}</strong></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Source</td>
                <td>${lead.utmSource ?? 'direct'} / ${lead.utmMedium ?? '—'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Location</td>
                <td>${lead.geoCity ? `${lead.geoCity}, ${lead.geoState}` : '—'}</td></tr>
            ${
              lead.notes
                ? `<tr><td style="padding: 8px 0; font-weight: 600;">Notes</td>
                <td>${lead.notes}</td></tr>`
                : ''
            }
          </table>
          <div style="margin-top: 24px;">
            <a href="https://goarmstrong.com/dashboard/leads/${lead.id}"
               style="background: #00a4eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
              View in Dashboard
            </a>
          </div>
        </div>
      </div>
    `,
  });
}
