/**
 * The Abba's Orchard School - 24/7 AI Admissions Embedded Chat Widget
 * Single-line integration script for theabbasorchard.edu.ph (Laravel / Inertia / WordPress / Static HTML)
 * 
 * Usage:
 * <script src="http://localhost:3000/abbas-widget-embed.js" data-server="http://localhost:3000"></script>
 */

(function () {
  const currentScript = document.currentScript;
  const SERVER_URL = (currentScript && currentScript.getAttribute('data-server')) || 'http://localhost:3000';

  // Inject CSS Styles
  const style = document.createElement('style');
  style.innerHTML = `
    #abbas-ai-bubble {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2d6a38, #1b3d22);
      box-shadow: 0 10px 25px rgba(45, 106, 56, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 28px;
      cursor: pointer;
      z-index: 99999;
      transition: transform 0.2s, box-shadow 0.2s;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    #abbas-ai-bubble:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 30px rgba(45, 106, 56, 0.5);
    }
    #abbas-ai-window {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 380px;
      height: 580px;
      max-width: calc(100vw - 48px);
      max-height: calc(100vh - 120px);
      background: #0f172a;
      border-radius: 18px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.1);
      display: none;
      flex-direction: column;
      z-index: 99999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
    }
    #abbas-ai-header {
      background: #1e293b;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      color: white;
    }
    #abbas-ai-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #090d16;
    }
    .abbas-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 13px;
      line-height: 1.5;
    }
    .abbas-msg-user {
      align-self: flex-end;
      background: #2d6a38;
      color: white;
      border-bottom-right-radius: 4px;
    }
    .abbas-msg-agent {
      align-self: flex-start;
      background: #1e293b;
      color: #f1f5f9;
      border-bottom-left-radius: 4px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    #abbas-ai-chips {
      display: flex;
      gap: 6px;
      padding: 8px 12px;
      background: #0f172a;
      overflow-x: auto;
      white-space: nowrap;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    #abbas-ai-chips::-webkit-scrollbar { display: none; }
    .abbas-chip {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      color: #94a3b8;
      padding: 5px 10px;
      border-radius: 12px;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .abbas-chip:hover {
      background: #2d6a38;
      color: white;
      border-color: #2d6a38;
    }
    #abbas-ai-input-area {
      padding: 12px;
      background: #1e293b;
      display: flex;
      gap: 8px;
    }
    #abbas-ai-input {
      flex: 1;
      background: #0f172a;
      border: 1px solid rgba(255,255,255,0.15);
      color: white;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      outline: none;
    }
    #abbas-ai-send {
      background: #2d6a38;
      color: white;
      border: none;
      width: 38px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }
  `;
  document.head.appendChild(style);

  // Inject Widget DOM
  const bubble = document.createElement('div');
  bubble.id = 'abbas-ai-bubble';
  bubble.innerHTML = '🌱';
  bubble.onclick = toggleChat;

  const chatWindow = document.createElement('div');
  chatWindow.id = 'abbas-ai-window';
  chatWindow.innerHTML = `
    <div id="abbas-ai-header">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:20px;">🌱</span>
        <div>
          <div style="font-weight:700; font-size:14px;">The Abba's Orchard AI</div>
          <div style="font-size:10px; color:#86efac;">● Online · 24/7 Admissions Guide</div>
        </div>
      </div>
      <button id="abbas-ai-close-btn" style="background:transparent; border:none; color:#94a3b8; font-size:20px; cursor:pointer;">&times;</button>
    </div>
    <div id="abbas-ai-messages">
      <div class="abbas-msg abbas-msg-agent">
        <strong>Welcome to The Abba's Orchard School! 🌿</strong><br><br>
        I am your 24/7 AI Admissions Guide across our 15+ AMI Montessori campuses nationwide. How may I assist your family today?<br><br>
        <em>Pila man ang edad sa inyong anak, o asa nga campus ang inyong gipangita?</em>
      </div>
    </div>
    <div id="abbas-ai-chips">
      <button class="abbas-chip" data-q="What grade levels and Montessori programs do you offer?">🌱 Programs</button>
      <button class="abbas-chip" data-q="What are your tuition payment plans and fees?">💰 Tuition</button>
      <button class="abbas-chip" data-q="How do I schedule a morning campus walkthrough?">📅 Book Tour</button>
      <button class="abbas-chip" data-q="Tell me about the Bukidnon La Granja Erdkinder farm boarding campus">🌾 Bukidnon La Granja</button>
      <button class="abbas-chip" data-q="Tell me about the Cagayan de Oro Alwana campus admissions">📍 CDO Alwana</button>
      <button class="abbas-chip" data-q="Tell me about the Davao City Obrero and Mandug campuses">📍 Davao Campuses</button>
      <button class="abbas-chip" data-q="Tell me about the Cebu City Magsaysay and Tandang Sora campuses">📍 Cebu Campuses</button>
      <button class="abbas-chip" data-q="Tell me about the Iloilo Sta. Barbara Heights campus">📍 Iloilo Campus</button>
      <button class="abbas-chip" data-q="Tell me about the Taguig BGC McKinley Hill campus">📍 BGC McKinley</button>
      <button class="abbas-chip" data-q="Tell me about the Taguig Bayani Road campus">📍 Taguig Bayani Rd</button>
      <button class="abbas-chip" data-q="Tell me about the Muntinlupa Alabang Filinvest campus">📍 Alabang Filinvest</button>
      <button class="abbas-chip" data-q="Tell me about the Mandaluyong Greenhills campus">📍 Greenhills Campus</button>
      <button class="abbas-chip" data-q="Tell me about the Antipolo City Taktak Road campus">📍 Antipolo Taktak</button>
      <button class="abbas-chip" data-q="Tell me about the Quezon City Calle Industria Bridgetowne campus">📍 QC Calle Industria</button>
      <button class="abbas-chip" data-q="Tell me about the Canlubang Carmelray Laguna campus">📍 Laguna Carmelray</button>
    </div>
    <div id="abbas-ai-input-area">
      <input type="text" id="abbas-ai-input" placeholder="Ask in English, Bisaya, Tagalog..." />
      <button id="abbas-ai-send">➤</button>
    </div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(chatWindow);

  let history = [];

  function toggleChat() {
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      document.getElementById('abbas-ai-input').focus();
    }
  }

  const inputEl = chatWindow.querySelector('#abbas-ai-input');
  const sendBtn = chatWindow.querySelector('#abbas-ai-send');
  const messagesEl = chatWindow.querySelector('#abbas-ai-messages');
  const closeBtn = chatWindow.querySelector('#abbas-ai-close-btn');

  closeBtn.onclick = () => { chatWindow.style.display = 'none'; };

  // Chip buttons click
  chatWindow.querySelectorAll('.abbas-chip').forEach(btn => {
    btn.onclick = () => {
      const q = btn.getAttribute('data-q');
      if (q) {
        inputEl.value = q;
        handleSend();
      }
    };
  });

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
  sendBtn.onclick = handleSend;

  function formatText(txt) {
    if (!txt) return '';
    return txt
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  async function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';

    appendMsg('user', formatText(text));
    history.push({ role: 'user', content: text });

    const typingEl = document.createElement('div');
    typingEl.className = 'abbas-msg abbas-msg-agent';
    typingEl.style.fontStyle = 'italic';
    typingEl.style.color = '#94a3b8';
    typingEl.innerText = 'Abba\'s Orchard AI is typing...';
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const res = await fetch(`${SERVER_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history })
      });
      const data = await res.json();
      typingEl.remove();

      const reply = data.reply || "Thank you for reaching out to The Abba's Orchard School. How old is your child so we can guide you further?";
      appendMsg('agent', formatText(reply));
      history.push({ role: 'model', content: reply });

    } catch (err) {
      typingEl.remove();
      appendMsg('agent', 'I am currently connecting you with admissions. You may also contact us directly at lagranja@theabbasorchard.edu.ph or call (0917) 508 2668.');
    }
  }

  function appendMsg(sender, htmlContent) {
    const div = document.createElement('div');
    div.className = `abbas-msg abbas-msg-${sender}`;
    div.innerHTML = htmlContent;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
})();
