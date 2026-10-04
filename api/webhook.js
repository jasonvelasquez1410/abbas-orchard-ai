const axios = require('axios');

const ABBAS_SYSTEM_PROMPT = `
You are the official 24/7 AI Admissions Digital Employee for "The Abba's Orchard School", the premier and first Association Montessori Internationale (AMI) school network in the Philippines.

Campus Directory & Direct Routing:
1. Bukidnon - La Granja Estates: lagranja@theabbasorchard.edu.ph | (0917) 508 2668 (IC, Casa, Elementary, Erdkinder Farm Boarding)
2. Cagayan de Oro - Alwana: alwana@theabbasorchard.edu.ph | (0917) 707 2668 (IC, Casa, Elementary)
3. Davao City - Obrero & Mandug: davao@theabbasorchard.edu.ph | (0917) 707 2669 (IC, Casa, Elementary, Erdkinder)
4. Cebu City - Magsaysay & Tandang Sora: cebu@theabbasorchard.edu.ph | (0917) 321 2668 (IC, Casa, Elementary)
5. Iloilo - Sta. Barbara Heights: iloilo@theabbasorchard.edu.ph | (0917) 322 2668 (Casa, Elementary)
6. Taguig - BGC McKinley Hill: mckinleyhill@theabbasorchard.edu.ph | (0917) 854 2668 (IC, Casa, Elementary)
7. Taguig - Bayani Road: bayani@theabbasorchard.edu.ph | (0917) 854 2669 (Casa, Elementary)
8. Muntinlupa - Alabang (Filinvest City): alabang@theabbasorchard.edu.ph | (0917) 855 2668 (IC, Casa, Elementary)
9. Mandaluyong - Greenhills: greenhills@theabbasorchard.edu.ph | (0917) 856 2668 (IC, Casa, Elementary)
10. Antipolo City - Taktak Road: antipolo@theabbasorchard.edu.ph | (0917) 857 2668 (IC, Casa, Elementary)
11. Quezon City - Calle Industria (Bridgetowne): calleindustria@theabbasorchard.edu.ph | (0917) 858 2668 (IC, Casa, Elementary)
12. Canlubang - Carmelray Laguna: carmelray@theabbasorchard.edu.ph | (0917) 859 2668 (Casa, Elementary)
Central Admissions: admission_application@theabbasorchard.edu.ph | Accounting Desk: Ms. Roxane

Language: English, Bisaya/Cebuano, and Tagalog.
`;

module.exports = async function handler(req, res) {
  // GET: Webhook verification handshake
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'abbas_orchard_meta_verify_token_2026';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Meta Webhook Verified on Vercel!');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  // POST: Incoming message handler
  if (req.method === 'POST') {
    const body = req.body;
    if (body && body.object === 'page') {
      res.status(200).send('EVENT_RECEIVED');

      const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN;
      const geminiKey = process.env.GEMINI_API_KEY;

      for (const entry of body.entry || []) {
        const webhookEvent = entry.messaging?.[0];
        if (!webhookEvent) continue;

        const senderPsid = webhookEvent.sender?.id;
        const message = webhookEvent.message;

        if (senderPsid && message && message.text && pageAccessToken) {
          try {
            // Typing on
            await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`, {
              recipient: { id: senderPsid },
              sender_action: 'typing_on'
            }).catch(() => {});

            // Generate AI text
            let replyText = "Welcome to The Abba's Orchard School! How may I assist you with admissions across our 15+ campuses in Luzon, Visayas, and Mindanao?";

            if (geminiKey) {
              const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
              const aiRes = await axios.post(url, {
                system_instruction: { parts: [{ text: ABBAS_SYSTEM_PROMPT }] },
                contents: [{ role: 'user', parts: [{ text: message.text }] }],
                generationConfig: { maxOutputTokens: 600, temperature: 0.4 }
              });
              replyText = aiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || replyText;
            }

            // Clean dispatch tag if any
            replyText = replyText.replace(/<!--\s*DISPATCH:.*?-->/s, '').trim();

            // Send back message via Graph API
            await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`, {
              recipient: { id: senderPsid },
              message: { text: replyText }
            });

          } catch (err) {
            console.error('Webhook processing error:', err.message);
          }
        }
      }
      return;
    }
    return res.status(404).send('Not Found');
  }

  return res.status(405).send('Method Not Allowed');
};
