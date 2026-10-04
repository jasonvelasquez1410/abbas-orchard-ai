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
          <div style="font-size:10px; color:#94a3b8;">24/7 Multi-Campus Admissions</div>
        </div>
      </div>
      <button onclick="document.getElementById('abbas-ai-window').style.display='none'" style="background:transparent; border:none; color:#94a3b8; font-size:20px; cursor:pointer;">&times;</button>
    </div>
    <div id="abbas-ai-messages">
      <div class="abbas-msg abbas-msg-agent">
        <strong>Welcome to The Abba's Orchard School!</strong><br>
        Discover True Montessori®. How may I assist you with programs, tuition, or campus tours across our 15+ campuses in Luzon, Visayas, and Mindanao?
        <br><br>
        <em>Unsay akong matabang ninyo karon?</em>
      </div>
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

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
  sendBtn.onclick = handleSend;

  async function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';

    appendMsg('user', text);
    history.push({ role: 'user', content: text });

    const typingEl = document.createElement('div');
    typingEl.className = 'abbas-msg abbas-msg-agent';
    typingEl.innerText = 'Thinking...';
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

      const reply = data.reply || "Thank you for reaching out to The Abba's Orchard School.";
      appendMsg('agent', reply.replace(/\n/g, '<br>'));
      history.push({ role: 'model', content: reply });

    } catch (err) {
      typingEl.remove();
      appendMsg('agent', 'Sorry, I had trouble connecting. Please contact us directly at lagranja@theabbasorchard.edu.ph.');
    }
  }

  function appendMsg(sender, text) {
    const div = document.createElement('div');
    div.className = `abbas-msg abbas-msg-${sender}`;
    div.innerHTML = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
})();
