# The Abba's Orchard School — 24/7 AI Admissions Agent Project

**Last Updated:** October 5, 2026  
**Project Owner / Principal Developer:** Jason Velasquez (SETHCON)  
**Client / Stakeholders:** Sir Angelo, Sir Ram, Mr. Xavier, Dr. Maria Angelica Paez-Barrameda ("Teacher Ann"), Joseph Christopher N. Barrameda ("Mr. Chris")  
**Target Organization:** The Abba's Orchard School (15+ Campuses nationwide — Luzon, Visayas, Mindanao)  
**Official School Website:** [https://www.theabbasorchard.edu.ph/](https://www.theabbasorchard.edu.ph/)  
**Live Production App:** [https://abbas-orchard-ai.vercel.app](https://abbas-orchard-ai.vercel.app)  
**GitHub Repository:** [https://github.com/jasonvelasquez1410/abbas-orchard-ai](https://github.com/jasonvelasquez1410/abbas-orchard-ai)  

---

## 📌 Project Overview & Scope
Activation of an intelligent, multi-campus, polyglot (Bisaya / Tagalog / English) **24/7 AI Admissions Digital Employee** embedded into:
1. **Official Website Chat Widget:** Embedded seamlessly into `theabbasorchard.edu.ph` (Laravel/Inertia stack) via drop-in widget `abbas-widget-embed.js`.
2. **Facebook Messenger Integration:** Official Meta Graph API integration with The Abba's Orchard Facebook page (`facebook.com/abbasorchardschool/`).
3. **Multi-Campus Knowledge System:** 15+ branches across Luzon, Visayas, and Mindanao (Alwana CDO, Bukidnon La Granja, Davao Obrero/Mandug, Cebu Magsaysay/Tandang Sora, Taguig BGC McKinley, Greenhills, Alabang, etc.).
4. **True Montessori® & AMI Tone of Voice:** Trained in Association Montessori Internationale terminology across Infant Community (14m–3y), Casa (3–6y), Elementary (6–12y), and Erdkinder adolescent farm environments (12–18y).
5. **Staff Escalation Workflow:** Structured lead auto-dispatching with instant routing to campus coordinators and Roxane's accounting desk for custom requests and tuition schedule breakdowns.

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

## 🚀 Live Cloud Architecture & Deployment Stack

### 1. Production Hosting & Repository
* **Platform:** Vercel Serverless
* **URL:** `https://abbas-orchard-ai.vercel.app`
* **Git Remote:** `origin/main` (`https://github.com/jasonvelasquez1410/abbas-orchard-ai.git`)

### 2. Backend Serverless Functions (`/api`)
* `api/chat.js`: Real-time streaming & JSON admissions AI endpoint powered by **Google Gemini 2.0 Flash** with full system prompt context and lead dispatch extraction.
* `api/webhook.js`: Production Meta Graph API webhook endpoint supporting:
  * `GET /api/webhook`: Meta Webhook Challenge verification (`hub.verify_token`, `hub.challenge`).
  * `POST /api/webhook`: Instant Facebook Messenger event processing, typing indicator trigger, Gemini AI generation, and message dispatch via Send API.
* `vercel.json`: Edge routing configuration and API rewrites.

### 3. Environment Variables Configured on Vercel
* `GEMINI_API_KEY`: Google AI Studio production API key for Gemini 2.0 Flash.
* `META_VERIFY_TOKEN`: Verification token matching Meta Developer App webhook settings.
* `META_PAGE_ACCESS_TOKEN`: Page access token for message dispatching (configured awaiting admin authorization).

---

## 📂 Project Assets & Deliverables in Workspace
* 🧪 **Main Web Application & Interactive Sandbox:** [`index.html`](./index.html) & [`Abbas_Orchard_AI_Prototype.html`](./Abbas_Orchard_AI_Prototype.html)  
  * *Dual-Channel Simulator: Authentic Website Widget view & Pixel-Perfect Facebook Page mockup (`facebook.com/abbasorchardschool/`).*
  * *Live AI Engine: Connects to Vercel Serverless `/api/chat` or direct client keys (Gemini 2.0 / OpenAI).*
  * *Stakeholder Test Question Bank Modal & Quick Chips for Sir Angelo, CADO, and Campus Admins.*
  * *Real-Time Email Dispatch Payload Inspector modal.*
* ⚙️ **Vercel Serverless APIs:** [`api/chat.js`](./api/chat.js) & [`api/webhook.js`](./api/webhook.js)
* 🖥️ **Local Node.js Development Server:** [`server.js`](./server.js), [`ai-agent.js`](./ai-agent.js), [`package.json`](./package.json), [`.env.example`](./.env.example)
* 📦 **Single-Line Website Chat Embed Widget:** [`abbas-widget-embed.js`](./abbas-widget-embed.js)
* 🖥️ **Pitch Presentation Deck:** [`Abbas_Orchard_AI_Pitch_Presentation.html`](./Abbas_Orchard_AI_Pitch_Presentation.html) *(8 slides, interactive simulator, Speaker Notes on 'N')*
* 📄 **Executive Proposal:** [`Abbas_Orchard_AI_Executive_Proposal.html`](./Abbas_Orchard_AI_Executive_Proposal.html) *(Printable PDF one-pager)*
* 📋 **Project Master Reference:** [`PROJECT.md`](./PROJECT.md) (This file)

---

## 🎯 Stakeholder Testing Question Bank Matrix
Built-in test cases accessible via **"🎯 All Test Questions ▾"** in the prototype:

| Category | Target Campus | Test Question | Validation Target |
|---|---|---|---|
| **Executive & Board** | Bukidnon La Granja | *"Tell me about the Bukidnon La Granja campus, the Erdkinder farm environment, and dormitory boarding for adolescents."* | Verifies Montessori farm micro-economy briefing & routing to `lagranja@theabbasorchard.edu.ph`. |
| **Accounting & Billing** | CDO Alwana | *"What are the payment options and tuition breakdown for Casa and Elementary? Please forward our inquiry to Roxane at accounting."* | Verifies tuition payment plans (Annual/Semi/Quarterly) & lead forwarding to Roxane. |
| **Curriculum Continuity** | Nationwide | *"Explain authentic AMI Montessori curriculum continuity from Infant Community (14 mos) through Casa, Elementary, and Erdkinder."* | Verifies authentic AMI Montessori pedagogy explanation across all planes of development. |
| **CADO Admissions** | BGC McKinley Hill | *"What are the complete admissions requirements and assessment steps for Casa (3-6 years old)?"* | Verifies step-by-step admissions checklist & developmental observation procedure. |
| **Infant Community** | Alabang | *"What is the age range and developmental readiness focus of the Infant Community (14 mos - 3 yrs)?"* | Verifies Montessori toddler developmental focus (language, movement, independence). |
| **Campus Observation** | Greenhills | *"How do parents book a weekday morning Montessori prepared environment observation walkthrough?"* | Verifies weekday morning tour booking & coordinator scheduling. |
| **Mindanao (Bisaya)** | CDO Alwana | *"Maayong hapon! Tagpila ang tuition sa Casa 3 years old sa Alwana CDO campus ug unsaon pag-apply?"* | Verifies natural Bisaya/Cebuano language ingestion and warm localized response. |
| **Mindanao Hub** | Davao City | *"What programs and schedules are available at Davao City Obrero and Mandug campuses?"* | Verifies Davao multi-campus directory routing to `davao@theabbasorchard.edu.ph`. |
| **Visayas Hub** | Cebu Magsaysay | *"We would like to book an observation walkthrough at Cebu Magsaysay campus for our 4-year-old child."* | Verifies Visayas flagship routing to `cebu@theabbasorchard.edu.ph`. |
| **Western Visayas** | Iloilo | *"What levels are offered in Iloilo Sta. Barbara Heights and how do we apply for Elementary?"* | Verifies Casa & Elementary programs in Sta. Barbara Heights, Iloilo. |
| **Luzon Flagship** | BGC McKinley | *"What age groups and programs are offered at the BGC McKinley Hill Taguig campus?"* | Verifies Morgan Executive Suites Taguig directory & IC/Casa/Elementary availability. |

---

## 🗺️ Official Campus Directory & Email Routing Map
* **Mindanao:**
  * **Bukidnon - La Granja Estates:** `lagranja@theabbasorchard.edu.ph` | *(0917) 508 2668* (IC, Casa, Elementary, Erdkinder Farm Boarding)
  * **Cagayan de Oro - Alwana:** `alwana@theabbasorchard.edu.ph` | *(0917) 707 2668* (IC, Casa, Elementary)
  * **Davao City - Obrero & Mandug:** `davao@theabbasorchard.edu.ph` | *(0917) 707 2669* (IC, Casa, Elementary, Erdkinder)
* **Visayas:**
  * **Cebu City - Magsaysay & Tandang Sora:** `cebu@theabbasorchard.edu.ph` | *(0917) 321 2668* (IC, Casa, Elementary)
  * **Iloilo - Sta. Barbara Heights:** `iloilo@theabbasorchard.edu.ph` | *(0917) 322 2668* (Casa, Elementary)
* **Luzon:**
  * **Taguig - BGC McKinley Hill:** `mckinleyhill@theabbasorchard.edu.ph` | *(0917) 854 2668* (IC, Casa, Elementary)
  * **Taguig - Bayani Road:** `bayani@theabbasorchard.edu.ph` | *(0917) 854 2669* (Casa, Elementary)
  * **Muntinlupa - Alabang (Filinvest City):** `alabang@theabbasorchard.edu.ph` | *(0917) 855 2668* (IC, Casa, Elementary)
  * **Mandaluyong - Greenhills:** `greenhills@theabbasorchard.edu.ph` | *(0917) 856 2668* (IC, Casa, Elementary)
  * **Antipolo City - Taktak Road:** `antipolo@theabbasorchard.edu.ph` | *(0917) 857 2668* (IC, Casa, Elementary)
  * **Quezon City - Calle Industria (Bridgetowne):** `calleindustria@theabbasorchard.edu.ph` | *(0917) 858 2668* (IC, Casa, Elementary)
  * **Canlubang - Carmelray Laguna:** `carmelray@theabbasorchard.edu.ph` | *(0917) 859 2668* (Casa, Elementary)
* **Central Admissions & Accounting Desk:**
  * `admission_application@theabbasorchard.edu.ph`
  * CC: Roxane / Accounting Desk for fee schedules

---

## 🛠️ Key Bugfixes & UI Layout Engineering Notes
1. **Pinned & Sticky Chat Input Bar**:
   - Resolved issue where selecting or copying questions from the Question Bank modal pushed the chat box off-screen.
   - Applied `flex: 1 1 0%` and `min-height: 0` to `.sim-chat-body` to constrain vertical expansion.
   - Pinned `.sim-input-box` and `.quick-chips-bar` with `flex-shrink: 0; position: sticky; bottom: 0; z-index: 10;`.
2. **Rigid Viewport Height Constraint**:
   - Locked `body` as a `height: 100vh; overflow: hidden;` flex container with flexible viewport children.
   - Added responsive constraints for screen widths `<= 1024px` to automatically scroll the simulator into view.
3. **Smooth Auto-Scroll & Input Focus**:
   - Configured `testCustomQuestion()` and `appendMessage()` with `requestAnimationFrame` to ensure message scroll stays anchored to the bottom.
4. **Modal DOM Hierarchy Cleaned**:
   - Fixed unclosed overlay `div` in HTML modals to ensure clean DOM hierarchy and prevent backdrop focus traps.

---

## ✅ Current Status & Action Items
- [x] **Client Meeting Approval:** Sir Angelo approved testing the interactive prototype and AI digital employee workflow.
- [x] **Dual-Channel Prototype Live:** Full Website Widget & Facebook Page simulator online.
- [x] **Live Real AI Model Activation:** Google Gemini 2.0 Flash connected on Vercel serverless backend.
- [x] **GitHub & Vercel Auto-Deployment:** CI/CD pipeline active via GitHub repo `jasonvelasquez1410/abbas-orchard-ai`.
- [x] **Stakeholder Test Bank Added:** Predefined questions for Executive Board, CADO, and Campus Admins.
- [x] **Chat Box Pinned & Layout Fixed:** Chat input remains pinned and visible after choosing questions from the modal.
- [ ] **Facebook Page Access Token:** Obtain Facebook Page Admin access on `abbasorchardschool` to paste `META_PAGE_ACCESS_TOKEN` on Vercel.
- [ ] **Website Embed Script Activation:** Insert `<script src="https://abbas-orchard-ai.vercel.app/abbas-widget-embed.js"></script>` on `theabbasorchard.edu.ph`.
