const axios = require('axios');
const { generateAIResponse } = require('../ai-agent');
const { dispatchLead } = require('./_dispatcher');

// In-memory conversation session history per Facebook sender PSID (warm lambda cache)
const messengerSessions = new Map();

/**
 * Meta Graph API Version
 */
const GRAPH_API_VERSION = 'v20.0';

/**
 * The Abba's Orchard School - Production Meta Facebook Messenger Webhook Handler
 * Supports:
 * - GET: Webhook challenge verification handshake
 * - POST: Incoming message & postback handler with Gemini 2.0 Flash + True Montessori Pedagogical Engine
 */
module.exports = async function handler(req, res) {
  // --------------------------------------------------------------------------
  // GET: Webhook Verification Handshake for Meta Developer Dashboard
  // --------------------------------------------------------------------------
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'abbas_orchard_meta_verify_token_2026';

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Meta Webhook Verification Handshake Successful on Vercel!');
      return res.status(200).send(challenge);
    }
    console.warn('❌ Meta Webhook Verification Failed: Token mismatch or invalid mode.');
    return res.status(403).send('Forbidden: Verification token mismatch');
  }

  // --------------------------------------------------------------------------
  // POST: Incoming Messenger Event Processor
  // --------------------------------------------------------------------------
  if (req.method === 'POST') {
    const body = req.body;

    if (body && body.object === 'page') {
      // 1. Fast HTTP 200 acknowledgment to Meta to prevent retry loops
      res.status(200).send('EVENT_RECEIVED');

      const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN;
      if (!pageAccessToken) {
        console.warn('⚠️ Meta webhook received message, but META_PAGE_ACCESS_TOKEN is not configured.');
        return;
      }

      for (const entry of body.entry || []) {
        for (const webhookEvent of entry.messaging || []) {
          const senderPsid = webhookEvent.sender?.id;
          if (!senderPsid) continue;

          // Extract text from standard message, quick reply, or postback button
          let incomingText = null;
          if (webhookEvent.message && webhookEvent.message.text) {
            incomingText = webhookEvent.message.text;
          } else if (webhookEvent.message?.quick_reply?.payload) {
            incomingText = webhookEvent.message.quick_reply.payload;
          } else if (webhookEvent.postback?.payload) {
            incomingText = webhookEvent.postback.payload;
          } else if (webhookEvent.postback?.title) {
            incomingText = webhookEvent.postback.title;
          }

          if (!incomingText) continue;

          console.log(`📩 [MESSENGER INCOMING] From PSID: ${senderPsid} | Message: "${incomingText}"`);

          try {
            // 2. Send 'mark_seen' and 'typing_on' indicators
            await sendGraphAction(senderPsid, pageAccessToken, 'mark_seen');
            await sendGraphAction(senderPsid, pageAccessToken, 'typing_on');

            // 3. Retrieve or initialize multi-turn conversation history
            if (!messengerSessions.has(senderPsid)) {
              messengerSessions.set(senderPsid, []);
            }
            const history = messengerSessions.get(senderPsid);

            // 4. Generate intelligent AI response via unified Montessori engine
            const aiResult = await generateAIResponse(incomingText, history, null);
            const replyText = aiResult.reply || "Welcome to The Abba's Orchard School! How may I assist your family with admissions across our 15+ campuses?";

            // 5. Update session memory (capped at 16 messages / 8 turns)
            history.push({ role: 'user', content: incomingText });
            history.push({ role: 'model', content: replyText });
            if (history.length > 16) history.splice(0, 2);

            // 6. Send message chunks safely (handling Meta 2,000 char limit)
            await sendSplitMessages(senderPsid, pageAccessToken, replyText);

            // 7. Dispatch lead notification if contact details or walkthrough booked
            if (aiResult.dispatch) {
              console.log('⚡ [LEAD CAPTURED VIA FACEBOOK MESSENGER]:', aiResult.dispatch);
              dispatchLead(aiResult.dispatch, 'facebook_messenger').catch(dispErr => {
                console.warn('Facebook lead dispatch warning:', dispErr.message);
              });
            }

          } catch (eventErr) {
            console.error('❌ Error processing Messenger event:', eventErr.response?.data || eventErr.message);
          } finally {
            await sendGraphAction(senderPsid, pageAccessToken, 'typing_off');
          }
        }
      }
      return;
    }

    return res.status(404).send('Not Found');
  }

  return res.status(405).send('Method Not Allowed');
};

/**
 * Send Messenger typing or mark_seen actions
 */
async function sendGraphAction(recipientPsid, token, action) {
  try {
    await axios.post(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/me/messages?access_token=${token}`,
      {
        recipient: { id: recipientPsid },
        sender_action: action
      },
      { timeout: 4000 }
    );
  } catch (err) {
    // Non-critical action error
  }
}

/**
 * Splits text into safe chunks under Facebook's 2000 character limit
 */
async function sendSplitMessages(recipientPsid, token, fullText) {
  const MAX_CHUNK = 1900;
  if (!fullText) return;

  if (fullText.length <= MAX_CHUNK) {
    await axios.post(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/me/messages?access_token=${token}`,
      {
        recipient: { id: recipientPsid },
        message: { text: fullText }
      },
      { timeout: 8000 }
    );
    return;
  }

  // Split on double newlines or sentences
  const paragraphs = fullText.split('\n\n');
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + '\n\n' + para).length > MAX_CHUNK) {
      if (currentChunk.trim()) {
        await axios.post(
          `https://graph.facebook.com/${GRAPH_API_VERSION}/me/messages?access_token=${token}`,
          {
            recipient: { id: recipientPsid },
            message: { text: currentChunk.trim() }
          },
          { timeout: 8000 }
        );
      }
      currentChunk = para;
    } else {
      currentChunk = currentChunk ? (currentChunk + '\n\n' + para) : para;
    }
  }

  if (currentChunk.trim()) {
    await axios.post(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/me/messages?access_token=${token}`,
      {
        recipient: { id: recipientPsid },
        message: { text: currentChunk.trim() }
      },
      { timeout: 8000 }
    );
  }
}
