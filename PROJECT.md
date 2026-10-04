# The Abba's Orchard School — 24/7 AI Admissions Agent Project

**Last Updated:** September 24, 2026  
**Project Owner / Principal Developer:** Jason Velasquez (SETHCON)  
**Client / Stakeholders:** Sir Angelo, Sir Ram, Mr. Xavier, Dr. Maria Angelica Paez-Barrameda ("Teacher Ann"), Joseph Christopher N. Barrameda ("Mr. Chris")  
**Target Organization:** The Abba's Orchard School (15+ Campuses nationwide — Luzon, Visayas, Mindanao)  
**Website:** [https://www.theabbasorchard.edu.ph/](https://www.theabbasorchard.edu.ph/)

---

## 📌 Project Overview & Scope
Activation of an intelligent, multi-campus, polyglot (Bisaya / Tagalog / English) **24/7 AI Admissions Digital Employee** embedded into:
1. **Official Website Chat Widget:** Embedded seamlessly into `theabbasorchard.edu.ph` (Laravel/Inertia stack).
2. **Facebook Messenger Integration:** Official Meta Graph API integration with The Abba's Orchard Facebook page.
3. **Multi-Campus Knowledge System:** 15+ branches across Luzon, Visayas, and Mindanao (Alwana CDO, Bukidnon La Granja, Davao Obrero/Mandug, Cebu Magsaysay/Tandang Sora, Taguig BGC McKinley, Greenhills, Alabang, etc.).
4. **True Montessori® & AMI Tone of Voice:** Trained in Association Montessori Internationale terminology across Infant Community, Casa, Elementary, and Erdkinder farm environments.
5. **Staff Escalation Workflow:** Seamless notification/handoff to human admissions officers and Roxane's accounting desk for custom requests, billing, and escalations.

---

## 💰 Agreed Commercial Terms & Pricing
* **One-Time Setup & Custom Training:** **₱28,000**
  * Multi-campus knowledge ingestion & configuration.
  * Custom styled website chat widget.
  * Facebook Messenger Meta API integration & webhook configuration.
  * Multi-lingual prompt tuning (Bisaya, English, Tagalog).
  * Staff handoff and notification pipeline.
* **Monthly Maintenance & Retainer:** **₱2,500 / month**
  * Server hosting & 24/7 uptime monitoring.
  * AI token usage & Meta API quota coverage.
  * Continuous knowledge updates (school calendar, events, fee announcements).
  * Monthly conversation audit & developer support.

---

## 📂 Project Assets & Deliverables in Workspace
* 🧪 **Live Interactive Prototype (PoC Sandbox):** [`Abbas_Orchard_AI_Prototype.html`](./Abbas_Orchard_AI_Prototype.html)  
  * *Dual-Channel Simulator: Authentic Website Widget (`theabbasorchard.edu.ph`) and Pixel-Perfect Facebook Page App (`facebook.com/abbasorchardschool/`).*
  * *Supports both **Instant Rule Simulation** and **Real Live LLM Activation** (Google Gemini 2.0 Flash / OpenAI GPT-4o) with client-side API key configuration and structured lead auto-dispatching.*
* ⚙️ **Production Node.js Backend Server:** [`server.js`](./server.js), [`ai-agent.js`](./ai-agent.js), [`package.json`](./package.json), [`.env.example`](./.env.example)
  * *Meta Facebook Messenger Graph API webhook (`GET /webhook`, `POST /webhook`) with real-time typing indicators, automated replies, and session history.*
  * *Website Chat API endpoint (`POST /api/chat`) for the production school site.*
* 📦 **Single-Line Website Chat Embed Widget:** [`abbas-widget-embed.js`](./abbas-widget-embed.js)
  * *Drop-in script snippet for `theabbasorchard.edu.ph` to render the floating admissions assistant on any page.*
* 🖥️ **Presentation Deck:** [`Abbas_Orchard_AI_Pitch_Presentation.html`](./Abbas_Orchard_AI_Pitch_Presentation.html)  
  * *8-Slide Interactive Deck with Fullscreen, progress bar, interactive AI simulator, and hidden Speaker Notes (Press 'N').*
* 📄 **Executive Proposal:** [`Abbas_Orchard_AI_Executive_Proposal.html`](./Abbas_Orchard_AI_Executive_Proposal.html)  
  * *Printable / PDF Executive One-Pager summarizing scope, features, and commercial terms.*
* 📋 **Project Documentation:** [`PROJECT.md`](./PROJECT.md) (This file)

---

## 🗺️ Official Campus Directory & Email Routing Map
* **Mindanao:**
  * **Bukidnon - La Granja Estates:** `lagranja@theabbasorchard.edu.ph` | *(0917) 508 2668* (IC, Casa, Elementary, Erdkinder Farm Boarding)
  * **Cagayan de Oro - Alwana:** `alwana@theabbasorchard.edu.ph` | *(0917) 707 2668* (IC, Casa, Elementary)
  * **Davao City - Obrero & Mandug:** `davao@theabbasorchard.edu.ph` (IC, Casa, Elementary, Erdkinder)
* **Visayas:**
  * **Cebu City - Magsaysay & Tandang Sora:** `cebu@theabbasorchard.edu.ph` (IC, Casa, Elementary)
  * **Iloilo - Sta. Barbara Heights:** `iloilo@theabbasorchard.edu.ph` (Casa, Elementary)
* **Luzon:**
  * **Taguig - BGC McKinley Hill:** `mckinleyhill@theabbasorchard.edu.ph` (IC, Casa, Elementary)
  * **Taguig - Bayani Road:** `bayani@theabbasorchard.edu.ph`
  * **Muntinlupa - Alabang:** `alabang@theabbasorchard.edu.ph`
  * **Mandaluyong - Greenhills:** `greenhills@theabbasorchard.edu.ph`
  * **Antipolo City - Taktak Road:** `antipolo@theabbasorchard.edu.ph`
  * **Quezon City - Calle Industria:** `calleindustria@theabbasorchard.edu.ph`
  * **Canlubang - Carmelray:** `carmelray@theabbasorchard.edu.ph`
* **Central Admissions & Accounting:**
  * `admission_application@theabbasorchard.edu.ph`
  * Roxane / Accounting Desk CC for fee inquiries

---

## ✅ Current Status & Next Steps
- [x] **Meeting with Sir Angelo:** Successfully concluded; Sir Angelo approved testing the interactive prototype.
- [x] **Live Dual-Channel Prototype Developed:** [`Abbas_Orchard_AI_Prototype.html`](./Abbas_Orchard_AI_Prototype.html) created with Website widget & Facebook Page simulation (`facebook.com/abbasorchardschool/`).
- [x] **Real AI Agent Integration:** Added client-side Live LLM activation (Gemini / OpenAI) directly in the prototype with AMI Montessori & multi-campus system prompt.
- [x] **Production Backend Server Constructed:** [`server.js`](./server.js) with Meta Facebook Messenger Webhook & Website Chat API ready for deployment.
- [ ] **Demonstration to Sir Angelo / Board:** Send or screen-share the prototype link with Sir Angelo to demonstrate:
  1. Bukidnon La Granja Erdkinder inquiry dispatching to `lagranja@theabbasorchard.edu.ph`.
  2. Bisaya language handling for CDO Alwana inquiry routing to `alwana@theabbasorchard.edu.ph`.
  3. BGC McKinley Hill and Cebu tour bookings with live AI reasoning.
- [ ] **Deployment & Go-Live:** Configure Meta Graph API Webhook on Facebook App settings and embed [`abbas-widget-embed.js`](./abbas-widget-embed.js) on `theabbasorchard.edu.ph`.
