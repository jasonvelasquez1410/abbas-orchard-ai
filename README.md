# 🌿 The Abba's Orchard School — 24/7 AI Admissions Agent

> **Official Association Montessori Internationale (AMI) Multi-Campus Digital Employee** for The Abba's Orchard School.  
> Integrated across **Website Chat (`theabbasorchard.edu.ph`)** and **Official Facebook Messenger (`facebook.com/abbasorchardschool`)**.

---

## 🚀 Live Demo & Sandbox

Deploy this repository to **Vercel** with zero configuration. Visiting your Vercel URL will immediately serve the interactive dual-channel showcase.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### 📂 Workspace Assets
* **Interactive Showcase (Root):** [`index.html`](./index.html) or [`Abbas_Orchard_AI_Prototype.html`](./Abbas_Orchard_AI_Prototype.html)
  * Dual-mode preview: Website widget + Pixel-perfect Facebook Page UI (`facebook.com/abbasorchardschool/`).
  * Real-time Multi-Campus Auto-Routing across 15+ branches.
  * Live Email Dispatch drawer for campus coordinators and accounting desk.
  * Live LLM Engine switch (Google Gemini 2.0 Flash / OpenAI GPT-4o / Local Server).
* **Interactive Pitch Deck:** [`Abbas_Orchard_AI_Pitch_Presentation.html`](./Abbas_Orchard_AI_Pitch_Presentation.html)
* **Executive Proposal One-Pager:** [`Abbas_Orchard_AI_Executive_Proposal.html`](./Abbas_Orchard_AI_Executive_Proposal.html)
* **Single-Line Website Widget Embed Script:** [`abbas-widget-embed.js`](./abbas-widget-embed.js)

---

## ⚙️ Architecture & Endpoints

This project supports **both** standalone Node.js Express server execution AND Vercel Serverless Functions:

| Endpoint | Method | Purpose |
| :--- | :---: | :--- |
| `/` | `GET` | Serves the interactive prototype & Facebook Page simulator |
| `/api/chat` | `POST` | Website Chat API powering the embedded widget |
| `/api/webhook` | `GET` / `POST` | Meta Graph API Facebook Messenger Webhook verification and automated replies |
| `/health` | `GET` | System health check and model status |

---

## 🔑 Environment Variables (Vercel & Local)

Add these environment variables in your **Vercel Project Settings > Environment Variables** (or in `.env` for local):

```env
# AI Model Selection
AI_PROVIDER=gemini
AI_MODEL=gemini-2.0-flash

# Google Gemini API Key (Get from https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=AIzaSy...

# Optional OpenAI Key
OPENAI_API_KEY=sk-proj-...

# Meta Facebook Messenger Webhook (Developers.facebook.com)
META_VERIFY_TOKEN=abbas_orchard_meta_verify_token_2026
META_PAGE_ACCESS_TOKEN=EAA...
META_APP_SECRET=...

# Central Inboxes
CENTRAL_ADMISSIONS_EMAIL=admission_application@theabbasorchard.edu.ph
ACCOUNTING_EMAIL=accounting@theabbasorchard.edu.ph
```

---

## 🛠️ Deploying to GitHub & Vercel (Step-by-Step)

### Step 1: Push to GitHub

```powershell
# 1. Initialize git inside this directory (if not already done)
git init

# 2. Stage all files
git add .

# 3. Commit
git commit -m "Initial commit: The Abba's Orchard 24/7 AI Admissions Agent Prototype & Backend"

# 4. Create a new repository on GitHub (e.g. named abbas-orchard-ai)
# Then link remote and push:
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/abbas-orchard-ai.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Import your `abbas-orchard-ai` GitHub repository.
3. In **Environment Variables**, add:
   * `GEMINI_API_KEY`: Your Google AI Studio key.
   * `META_VERIFY_TOKEN`: `abbas_orchard_meta_verify_token_2026`
   * `META_PAGE_ACCESS_TOKEN`: (Your Facebook page token when ready).
4. Click **Deploy**.

---

## 💬 Meta Facebook Messenger Webhook Setup

1. In [developers.facebook.com](https://developers.facebook.com/), go to your App > **Messenger** > **Webhooks**.
2. Set **Callback URL**: `https://your-project.vercel.app/api/webhook`
3. Set **Verify Token**: `abbas_orchard_meta_verify_token_2026`
4. Subscribe to `messages` and `messaging_postbacks`.

---

## 🌐 Embedding the Widget on `theabbasorchard.edu.ph`

Add this single tag to the footer or `<head>` of `theabbasorchard.edu.ph`:

```html
<script src="https://your-project.vercel.app/abbas-widget-embed.js" data-server="https://your-project.vercel.app"></script>
```

---

## 🏫 Campus Directory Map

* **Mindanao:**
  * **Bukidnon - La Granja Estates:** `lagranja@theabbasorchard.edu.ph` | *(0917) 508 2668*
  * **CDO - Alwana:** `alwana@theabbasorchard.edu.ph` | *(0917) 707 2668*
  * **Davao - Obrero & Mandug:** `davao@theabbasorchard.edu.ph`
* **Visayas:**
  * **Cebu City - Magsaysay & Tandang Sora:** `cebu@theabbasorchard.edu.ph`
  * **Iloilo - Sta. Barbara Heights:** `iloilo@theabbasorchard.edu.ph`
* **Luzon:**
  * **Taguig - BGC McKinley Hill:** `mckinleyhill@theabbasorchard.edu.ph`
  * **Taguig - Bayani Road:** `bayani@theabbasorchard.edu.ph`
  * **Muntinlupa - Alabang:** `alabang@theabbasorchard.edu.ph`
  * **Mandaluyong - Greenhills:** `greenhills@theabbasorchard.edu.ph`
  * **Antipolo City - Taktak Road:** `antipolo@theabbasorchard.edu.ph`
  * **Quezon City - Calle Industria:** `calleindustria@theabbasorchard.edu.ph`
  * **Canlubang - Carmelray:** `carmelray@theabbasorchard.edu.ph`
