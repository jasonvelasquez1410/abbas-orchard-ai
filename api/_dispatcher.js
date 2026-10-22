const axios = require('axios');

/**
 * The Abba's Orchard School - Automated Lead Dispatcher
 * Dispatches captured admissions leads across:
 * 1. Webhook (Google Sheets, Zapier, Make, CRM, Discord/Slack) via LEAD_WEBHOOK_URL
 * 2. Real-time Transactional Email (Resend) via RESEND_API_KEY
 * 3. Structured Serverless Audit Logging for zero-loss lead tracking
 *
 * @param {Object} dispatchData - The captured lead information
 * @param {string} channel - 'website' | 'facebook_messenger'
 * @returns {Promise<Object>}
 */
async function dispatchLead(dispatchData, channel = 'website') {
  if (!dispatchData || typeof dispatchData !== 'object') {
    return { success: false, reason: 'Invalid dispatch data' };
  }

  const timestamp = new Date().toISOString();
  const campus = dispatchData.campus || 'General Admissions';
  const targetEmail = dispatchData.to || process.env.CENTRAL_ADMISSIONS_EMAIL || 'admission_application@theabbasorchard.edu.ph';
  const parentName = dispatchData.parentName || 'Prospective Parent';
  const parentContact = dispatchData.parentContact || 'Captured via AI Session';
  const subject = dispatchData.subject || 'Admissions Inquiry / Tour Request';
  const details = dispatchData.details || 'Parent engaged with AI Admissions Guide.';

  const payload = {
    timestamp,
    channel: channel === 'facebook_messenger' ? 'Facebook Messenger' : 'Official Website Widget',
    campus,
    targetEmail,
    parentName,
    parentContact,
    subject,
    details
  };

  // Always emit high-visibility audit log in serverless runtime
  console.log(`🌿 [ADMISSIONS LEAD DISPATCH - ${channel.toUpperCase()}]`, JSON.stringify(payload));

  const results = {
    webhook: false,
    email: false
  };

  // --------------------------------------------------------------------------
  // 1. Webhook Dispatch (Google Sheets AppScript, Zapier, CRM, Discord/Slack)
  // --------------------------------------------------------------------------
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      await axios.post(webhookUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 6000
      });
      results.webhook = true;
      console.log('✅ Lead successfully forwarded to webhook URL.');
    } catch (whErr) {
      console.warn('⚠️ Webhook lead dispatch failed:', whErr.message);
    }
  }

  // --------------------------------------------------------------------------
  // 2. Transactional Email Dispatch via Resend API
  // --------------------------------------------------------------------------
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyRecipient = process.env.NOTIFICATION_EMAIL_TO || targetEmail;

  if (resendApiKey && notifyRecipient) {
    try {
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Admissions Lead - The Abba's Orchard</title>
</head>
<body style="margin:0; padding:20px; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #2d6a38, #1b3d22); padding: 24px; color: #ffffff;">
        <table role="presentation" width="100%">
          <tr>
            <td>
              <div style="font-size: 24px; line-height: 1;">🌿</div>
              <h1 style="margin: 8px 0 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Admissions Lead Captured</h1>
              <p style="margin: 4px 0 0; font-size: 13px; color: #86efac;">The Abba's Orchard School · 24/7 AI Admissions Digital Employee</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Content -->
    <tr>
      <td style="padding: 24px;">
        <table role="presentation" width="100%" style="font-size: 14px; line-height: 1.6; color: #334155;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; width: 140px; font-weight: 600;">Campus:</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${campus}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Channel:</td>
            <td style="padding: 6px 0; color: #0f172a;">${payload.channel}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Parent Name:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${parentName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Contact Details:</td>
            <td style="padding: 6px 0;">
              <span style="display:inline-block; background:#dcfce7; color:#166534; font-weight:700; padding:4px 10px; border-radius:6px; font-size:15px;">
                ${parentContact}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Inquiry Type:</td>
            <td style="padding: 6px 0; color: #0f172a;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Assigned Desk:</td>
            <td style="padding: 6px 0; color: #2d6a38; font-weight: 600;">${targetEmail}</td>
          </tr>
        </table>

        <!-- Details Card -->
        <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 4px solid #2d6a38; border-radius: 6px;">
          <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Summary & Context</div>
          <div style="margin-top: 6px; font-size: 14px; color: #1e293b; line-height: 1.5;">${details}</div>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          Captured on ${new Date(timestamp).toLocaleString('en-US', { timeZone: 'Asia/Manila' })} (Philippine Standard Time)
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      await axios.post('https://api.resend.com/emails', {
        from: process.env.RESEND_FROM_EMAIL || "The Abba's Orchard Admissions <onboarding@resend.dev>",
        to: [notifyRecipient],
        subject: `🌿 [Admissions Lead] ${campus} — ${parentName} (${subject})`,
        html: emailHtml
      }, {
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 6000
      });

      results.email = true;
      console.log(`✅ Lead notification email delivered to ${notifyRecipient}`);
    } catch (emailErr) {
      console.warn('⚠️ Resend email dispatch failed:', emailErr.response?.data || emailErr.message);
    }
  }

  return { success: true, results };
}

module.exports = { dispatchLead };
