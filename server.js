require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const { generateAIResponse } = require('./ai-agent');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Simple in-memory session history for Messenger users (sender PSID -> history array)
const messengerSessions = new Map();

// ============================================================================
// 1. META FACEBOOK MESSENGER WEBHOOK ENDPOINTS
// ============================================================================

/**
 * GET /webhook
 * Verification handshake for Meta Graph API / Facebook App setup
 */
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'abbas_orchard_meta_verify_token_2026';

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Meta Webhook Verified Successfully!');
      return res.status(200).send(challenge);
    } else {
      console.warn('❌ Meta Webhook Verification Token Mismatch!');
      return res.sendStatus(403);
    }
  }
  return res.sendStatus(400);
});

/**
 * POST /webhook
 * Incoming Messenger message receiver from Facebook Page
 */
app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    // Acknowledge immediately with 200 OK so Meta doesn't retry
    res.status(200).send('EVENT_RECEIVED');

    for (const entry of body.entry) {
      const webhookEvent = entry.messaging?.[0];
      if (!webhookEvent) continue;

      const senderPsid = webhookEvent.sender?.id;
      const message = webhookEvent.message;

      if (senderPsid && message && message.text) {
        console.log(`📩 Received Messenger text from [${senderPsid}]: "${message.text}"`);
        await handleMessengerMessage(senderPsid, message.text);
      }
    }
  } else {
    res.sendStatus(404);
  }
});

/**
 * Send typing indicator and AI reply back to Meta Messenger user
 */
async function handleMessengerMessage(senderPsid, userText) {
  const pageAccessToken = process.env.META_PAGE_ACCESS_TOKEN;

  if (!pageAccessToken) {
    console.warn("⚠️ META_PAGE_ACCESS_TOKEN is not configured in .env");
    return;
  }

  try {
    // 1. Send Typing Indicator ON
    await sendMessengerAction(senderPsid, 'typing_on');

    // 2. Fetch or initialize conversation history
    if (!messengerSessions.has(senderPsid)) {
      messengerSessions.set(senderPsid, []);
    }
    const history = messengerSessions.get(senderPsid);

    // 3. Generate response from AI model
    const aiResult = await generateAIResponse(userText, history);

    // 4. Update session history (cap at last 10 turns)
    history.push({ role: 'user', content: userText });
    history.push({ role: 'model', content: aiResult.reply });
    if (history.length > 20) history.splice(0, 2);

    // 5. Send AI Text Message via Meta Graph API
    await sendMessengerTextMessage(senderPsid, aiResult.reply);

    // 6. Log or dispatch lead if campus lead tag was generated
    if (aiResult.dispatch) {
      console.log('⚡ [LEAD DISPATCHED VIA MESSENGER]:', aiResult.dispatch);
    }

  } catch (err) {
    console.error('❌ Error handling Messenger message:', err.response?.data || err.message);
  } finally {
    await sendMessengerAction(senderPsid, 'typing_off');
  }
}

async function sendMessengerAction(senderPsid, action) {
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  if (!token) return;

  try {
    await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${token}`, {
      recipient: { id: senderPsid },
      sender_action: action
    });
  } catch (e) {
    // Ignore transient typing action errors
  }
}

async function sendMessengerTextMessage(senderPsid, text) {
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  if (!token) return;

  // Split messages if exceeding Meta's 2000 character limit
  const maxLen = 1900;
  const chunks = text.length > maxLen ? text.match(new RegExp(`.{1,${maxLen}}`, 'g')) : [text];

  for (const chunk of chunks) {
    await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${token}`, {
      recipient: { id: senderPsid },
      message: { text: chunk }
    });
  }
}

// ============================================================================
// 2. WEBSITE CHAT API ENDPOINTS (theabbasorchard.edu.ph)
// ============================================================================

/**
 * POST /api/chat
 * Endpoint for the embedded website chat widget
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], campus = null } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const aiResult = await generateAIResponse(message, history, campus);
    return res.json(aiResult);

  } catch (err) {
    console.error('API Chat Error:', err.message);
    return res.status(500).json({
      error: 'Failed to process AI response',
      details: err.message
    });
  }
});

/**
 * GET /health
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: "The Abba's Orchard 24/7 AI Admissions Agent",
    provider: process.env.AI_PROVIDER || 'gemini',
    time: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log('==================================================================');
  console.log(`🌱 The Abba's Orchard AI Agent Server running on port ${PORT}`);
  console.log(`🌐 Website Chat Endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`💬 Meta Webhook Endpoint: http://localhost:${PORT}/webhook`);
  console.log('==================================================================');
});
