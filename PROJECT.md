# The Abba's Orchard School — 24/7 AI Admissions Digital Employee & Prototype Project

**Last Updated:** October 28, 2026  
**Project Owner / Principal Developer:** Jason Velasquez (SETHCON)  
**Client / Stakeholders:** Sir Angelo, Jem, Sir Ram, Mr. Xavier, Dr. Maria Angelica Paez-Barrameda ("Teacher Ann"), Joseph Christopher N. Barrameda ("Mr. Chris")  
**Target Organization:** The Abba's Orchard School (15+ Campuses nationwide — Luzon, Visayas, Mindanao)  
**Official School Website:** [https://www.theabbasorchard.edu.ph/](https://www.theabbasorchard.edu.ph/)  
**Live Production App:** [https://abbas-orchard-ai.vercel.app](https://abbas-orchard-ai.vercel.app)  
**GitHub Repository:** [https://github.com/jasonvelasquez1410/abbas-orchard-ai](https://github.com/jasonvelasquez1410/abbas-orchard-ai)  

---

## 📌 1. Project Overview & Scope
Activation of an intelligent, multi-campus, polyglot (Bisaya / Tagalog / English) **24/7 AI Admissions Digital Employee & Montessori Guide** embedded into:
1. **Official Website Chat Widget:** Embedded into `theabbasorchard.edu.ph` (Laravel/Inertia stack) via drop-in widget `abbas-widget-embed.js`.
2. **Facebook Messenger Integration:** Official Meta Graph API integration with The Abba's Orchard Facebook page (`facebook.com/abbasorchardschool/`).
3. **Multi-Campus Knowledge System:** 15+ branches across Luzon, Visayas, and Mindanao (Alwana CDO, Bukidnon La Granja, Davao Obrero/Mandug, Cebu Magsaysay/Tandang Sora, Taguig BGC McKinley & Bayani Rd, Greenhills, Alabang, Antipolo, QC Bridgetowne, Canlubang Laguna, Iloilo).
4. **Official SY 2026–2027 Tuition Engine:** Exact fee calculation for all 12 campuses based on `SY26-27 Tuition Fees Summary_Annual.xlsx` with Annual, Semi-Annual, Quarterly, Monthly terms, Down Payment, Memory Book inclusions, and Sibling discounts.
5. **True Montessori® & AMI Pedagogical Persona:** Trained in authentic Association Montessori Internationale (AMI) philosophy across Infant Community (14m–3y), Casa dei Bambini (3–6y), Elementary (6–12y), and Erdkinder adolescent farm boarding (12–18y).
6. **Multi-Turn Conversational Context:** Context-aware memory resolving short follow-up prompts (*"how?"*, *"paano?"*, *"unsaon?"*, *"yes"*, *"where?"*, *"when?"*) without resetting.
7. **Staff Escalation Workflow:** Automated structured lead auto-dispatching (`<!-- DISPATCH: {...} -->`) with routing to campus coordinators, central admissions, and Ms. Roxane's accounting desk (`accounting@theabbasorchard.edu.ph`).

---

## 💰 2. Agreed Commercial Terms & Pricing
* **One-Time Setup & Custom Training:** **₱28,000**
  * Multi-campus knowledge ingestion & configuration.
  * Custom styled website chat widget & standalone simulator.
  * Facebook Messenger Meta API integration & webhook configuration.
  * Multi-lingual prompt tuning (Bisaya, English, Tagalog).
  * Staff handoff and notification pipeline.
* **Monthly Maintenance & Retainer:** **₱2,500 / month**
  * Server hosting & 24/7 uptime monitoring.
  * AI token usage & Meta API quota coverage.
  * Continuous knowledge updates (school calendar, events, fee announcements).
  * Monthly conversation audit & developer support.

---

## 🚀 3. Live Cloud Architecture & Deployment Stack

### A. Production Hosting & Repository
* **Platform:** Vercel Serverless
* **URL:** `https://abbas-orchard-ai.vercel.app`
* **Git Remote:** `origin/main` (`https://github.com/jasonvelasquez1410/abbas-orchard-ai.git`)
* **Latest Commits:**
  * `ad8040e` — `feat(nlp): implement multi-turn conversational context resolver for follow-up questions`
  * `73b2f6c` — `feat(ui): prioritize tuition and top admissions inquiry chips in chat widget`
  * `f0865c6` — `feat(tuition): integrate official SY 2026-2027 fee schedule and exact calculation engine`

### B. Core Code Modules
* `api/_tuition_data.js`: Official SY 2026–2027 tuition database covering all 12 campuses/tables, rate matching, installment plans, and response generator.
* `api/chat.js`: Real-time streaming & JSON admissions AI endpoint powered by Google Gemini 2.0 Flash / OpenAI with multi-turn context resolver, language mirroring, and automated lead capture.
* `api/webhook.js`: Production Meta Graph API (v20.0) webhook endpoint supporting `messages` and `messaging_postbacks`.
* `api/_dispatcher.js`: Production multi-channel lead notification dispatcher supporting Google Sheets/Zapier webhooks and Resend transactional email.
* `ai-agent.js`: Core Node.js conversational AI module synchronized for local testing.
* `index.html` & `Abbas_Orchard_AI_Prototype.html`: Production dual-channel prototype (Website view + Facebook Messenger mockup) with full self-contained offline tuition dataset and table rendering.
* `vercel.json`: Edge routing configuration, CORS headers, and API rewrites.

### C. Environment Variables on Vercel
* `GEMINI_API_KEY`: Google AI Studio production API key for Gemini 2.0 Flash.
* `AI_PROVIDER`: `gemini` (or `openai`)
* `AI_MODEL`: `gemini-2.0-flash`
* `META_VERIFY_TOKEN`: Verification token matching Meta Developer App webhook settings (`abbas_orchard_meta_verify_token_2026`).
* `META_PAGE_ACCESS_TOKEN`: Page access token for Facebook message dispatching.
* `LEAD_WEBHOOK_URL`: (Optional) Webhook URL (Google Sheets AppScript, Zapier, Make) for instant lead capture.
* `RESEND_API_KEY`: (Optional) Resend API key for automated HTML admissions email alerts.
* `NOTIFICATION_EMAIL_TO`: Central admissions inbox for email lead delivery (`admission_application@theabbasorchard.edu.ph`).

---

## 📊 4. Official SY 2026–2027 Tuition Fee System

Extracted directly from `SY26-27 Tuition Fees Summary_Annual.xlsx` provided by Sir Angelo:

### Campuses & Rate Tables (12 Total):
1. **LGE / ALW:** Cagayan de Oro (Alwana) & Bukidnon (La Granja)
2. **DVO:** Davao City (Obrero & Mandug)
3. **CBU:** Cebu City (Magsaysay & Tandang Sora)
4. **BQC:** Quezon City (Bridgetowne / Calle Industria)
5. **MCK / BYN:** Taguig City (BGC McKinley Hill & Bayani Road)
6. **ALB:** Muntinlupa (Alabang Filinvest City)
7. **ANT:** Antipolo City (Taktak Road)
8. **STR:** Canlubang Laguna (Carmelray Industrial Park 1)
9. **GRH:** Mandaluyong (Greenhills)
10. **MLV:** Malaybalay
11. **SRG:** Surigao
12. **ILO:** Iloilo (Sta. Barbara Heights) — **Features 20% Pioneer Discount**

### Payment Structure & Business Rules:
* **Slot Reservation (15% Down Payment):** Due between **24 March and 13 April** to lock slot.
* **Annual Plan:** Remaining 85% balance due on or before **07 August 2026** (Zero carrying fee).
* **Semi-Annual Plan (2 Installments):** 8% carrying fee on balance; due **07 August** and **07 December**.
* **Quarterly Plan (4 Installments):** 10% carrying fee on balance; due **07 August**, **07 October**, **07 December**, and **07 March**.
* **Monthly Plan (10 Installments):** 12% carrying fee on balance; monthly on the 7th starting August 2026.
* **Commemorative Memory Book:** Included in Whole Year Fee for Casa 3, Grade 6, and Grade 12 (₱3,184.45).
* **Farm Consumables & Lab Fees:** Included for Bukidnon Erdkinder (Levels 3 & 4).
* **Sibling Discount:** ~5% reduction across all whole-year fees and installment modes for 2+ enrolled children.

---

## 🎯 5. The 10 High-Frequency Social Media Inquiries Trained

| # | Inquiry | AI Pedagogical & Operational Response | Trilingual Support |
|---|---|---|---|
| 1 | **Where are you located?** | Complete 15+ branch nationwide directory categorized by Luzon, Visayas, Mindanao with direct hotlines and emails. | English, Tagalog, Bisaya |
| 2 | **Tell me about your program** | 4 continuous AMI developmental planes: Infant Community (14m-3y), Casa (3-6y), Elementary (6-12y), Erdkinder (12-18y). | English, Tagalog, Bisaya |
| 3 | **List of requirements** | 5-item checklist: PSA Birth Cert, 2x2 photos (4 pcs), Form 137/138 (SF9/SF10 for transferees), application form, readiness observation. | English, Tagalog, Bisaya |
| 4 | **Campus tour** | Montessori Observation Walkthrough during active morning work cycle (8:30 AM – 11:00 AM) + directress consult. | English, Tagalog, Bisaya |
| 5 | **Special needs / Neurodiversity** | Self-paced multi-sensory AMI environment + 1-on-1 readiness observation. | English, Tagalog, Bisaya |
| 6 | **Services / Specialization** | Authentic AMI international accreditation, uninterrupted 3-hour work cycles, concrete math bead apparatus, Cosmic Education. | English, Tagalog, Bisaya |
| 7 | **Can we attend a trial class?** | Explains why traditional drop-ins disrupt focus; introduces the **2-Step Discovery Experience** (Parent Walkthrough + Child Readiness Session). | English, Tagalog, Bisaya |
| 8 | **Earliest we could enroll** | Rolling admissions year-round for Toddler & Casa; SY 2026–2027 priority reservation + mid-year transferee evaluation. | English, Tagalog, Bisaya |
| 9 | **How to enroll / Admission process** | 4-step consultative roadmap: Walkthrough → Child Consultation → Document Submission → Slot Reservation. | English, Tagalog, Bisaya |
| 10 | **Tuition fee rates** | Exact SY 2026–2027 fee schedule per campus with down payment, balances, and installment plans. | English, Tagalog, Bisaya |

---

## 🧠 6. Multi-Turn Conversational Memory & Context Engine

### Problem Solved:
Previously, if the AI asked: *"Would you like to experience an observation walkthrough at our Cagayan de Oro — Alwana Campus?"* and a parent replied with *"how?"*, the AI treated it as a new generic query and reset to the 15-campus opening spiel.

### Current Implementation:
1. **Short Follow-Up Interrogatives (`isHowQuestion`):**
   - *"how?"*, *"paano?"*, *"unsaon?"*, *"how to book?"*, *"how does it work?"*
   - Checks `lastModelLower`: If previous response offered a walkthrough, answers with step-by-step walkthrough booking instructions with the specific campus coordinator's hotline and email.
   - If previous response discussed tuition, explains payment methods (Bank transfer, PDC, cash) and accounting desk contact.
2. **Affirmations (`isAffirmative`):**
   - *"yes"*, *"sure"*, *"sige"*, *"ok"*, *"yes please"*, *"oo"*, *"opo"*, *"gusto ko"*
   - Smoothly confirms the offered action and asks for contact details and preferred weekday morning.
3. **Temporal & Spatial Follow-ups:**
   - *"when?"* / *"what time?"* / *"kailan?"* → Returns 8:30 AM – 11:00 AM weekday morning observation schedule.
   - *"where?"* / *"saan?"* / *"asa?"* / *"address?"* → Returns exact physical campus address and landmarks.
4. **Context-Retaining Fallback (Zero Reset Policy):**
   - If an ongoing conversation contains an active campus (e.g., Alwana, Davao, Cebu), even unrecognized words (e.g. *"hmmm"*, *"okay"*) will NOT reset to the greeting. The AI retains the active campus and offers 4 clear next actions (Walkthrough, Tuition, Requirements, or Coordinator Call).

---

## 🗺️ 7. Official Campus Directory & Lead Routing Map

| Campus Location | Level / Programs | Email Routing | Direct Line |
|---|---|---|---|
| **Bukidnon — La Granja Estates** | IC, Casa, Elementary, Erdkinder Farm Boarding | `lagranja@theabbasorchard.edu.ph` | (0917) 508 2668 |
| **Cagayan de Oro — Alwana** | Infant Community, Casa, Elementary | `alwana@theabbasorchard.edu.ph` | (0917) 707 2668 |
| **Davao City — Obrero & Mandug** | IC, Casa, Elementary, Erdkinder | `davao@theabbasorchard.edu.ph` | (0917) 707 2669 |
| **Cebu City — Magsaysay & Tandang Sora** | Infant Community, Casa, Elementary | `cebu@theabbasorchard.edu.ph` | (0917) 321 2668 |
| **Iloilo — Sta. Barbara Heights** | Casa dei Bambini, Elementary | `iloilo@theabbasorchard.edu.ph` | (0917) 322 2668 |
| **Taguig — BGC McKinley Hill** | Infant Community, Casa, Elementary | `mckinleyhill@theabbasorchard.edu.ph` | (0917) 854 2668 |
| **Taguig — Bayani Road (AFPOVAI)** | Casa dei Bambini, Elementary | `bayani@theabbasorchard.edu.ph` | (0917) 854 2669 |
| **Muntinlupa — Alabang (Filinvest City)** | Infant Community, Casa, Elementary | `alabang@theabbasorchard.edu.ph` | (0917) 855 2668 |
| **Mandaluyong — Greenhills / Wack-Wack** | Infant Community, Casa, Elementary | `greenhills@theabbasorchard.edu.ph` | (0917) 856 2668 |
| **Antipolo City — Taktak Road** | Infant Community, Casa, Elementary | `antipolo@theabbasorchard.edu.ph` | (0917) 857 2668 |
| **Quezon City — Calle Industria (Bridgetowne)** | Infant Community, Casa, Elementary | `calleindustria@theabbasorchard.edu.ph` | (0917) 858 2668 |
| **Canlubang — Carmelray Laguna** | Casa dei Bambini, Elementary | `carmelray@theabbasorchard.edu.ph` | (0917) 859 2668 |
| **Central Admissions & Accounting Desk** | Central Desk & Fee Schedules (Ms. Roxane) | `admission_application@theabbasorchard.edu.ph` / `accounting@theabbasorchard.edu.ph` | (0917) 508 2668 |

---

## 🎨 8. UI & Ergonomics Polish (Chat Widget)
1. **Prioritized Action Chips:**
   - Placed high-converting inquiries right in front:
     1. `💰 Tuition & Rates (SY 26-27)` (Styled with an eye-catching gold badge)
     2. `📅 Book Walkthrough Tour`
     3. `📝 How to Enroll`
     4. `📋 List of Requirements`
     5. `⏰ Earliest to Enroll`
     6. `📍 Campus Locations`
2. **Laptop & Tablet Viewport Ergonomics:**
   - Updated `.floating-chat-window`'s `max-height: calc(100vh - 90px)` with clean headroom to avoid clipping the top navigation bar.
3. **Responsive Markdown Table Parser:**
   - Upgraded `formatChatMessage` in `index.html` to render dark-mode responsive HTML `<table>` elements for full campus tuition schedules.

---

## 📂 9. Workspace File Manifest

* [`index.html`](./index.html) — Production live dual-channel sandbox (Website View & Facebook Messenger View).
* [`Abbas_Orchard_AI_Prototype.html`](./Abbas_Orchard_AI_Prototype.html) — Twin prototype file for standalone distribution.
* [`SY26-27 Tuition Fees Summary_Annual.xlsx`](./SY26-27%20Tuition%20Fees%20Summary_Annual.xlsx) — Official Excel tuition source file from Sir Angelo.
* [`api/_tuition_data.js`](./api/_tuition_data.js) — Parsed 12-campus official fee schedule and computation helper.
* [`api/chat.js`](./api/chat.js) — Vercel Serverless API handler for `/api/chat` with multi-turn memory.
* [`api/webhook.js`](./api/webhook.js) — Vercel Serverless Meta Graph Webhook for Facebook Messenger events.
* [`ai-agent.js`](./ai-agent.js) — Core Node.js conversational AI module with Gemini/OpenAI integration and local testing.
* [`api/_dispatcher.js`](./api/_dispatcher.js) — Real-time webhook & transactional email lead notification dispatcher.
* [`abbas-widget-embed.js`](./abbas-widget-embed.js) — Single-script drop-in widget for embedding onto `theabbasorchard.edu.ph`.
* [`IT_INTEGRATION_GUIDE.md`](./IT_INTEGRATION_GUIDE.md) & [`IT_Integration_Guide.html`](./IT_Integration_Guide.html) — Technical webmaster deployment guides.
* [`package.json`](./package.json) & [`vercel.json`](./vercel.json) — Dependencies and edge deployment configuration.

---

## 📬 10. Communication Log & Current Collaboration Status
* **October 7, 2026:** Initial delivery email with live prototype sent to Sir Angelo, Seth, Kristine, and Ms. Roxane.
* **October 22, 2026:** Follow-up email and Viber messages sent.
* **October 28, 2026:**
  * User accepted the **MS Teams group invite** with **Sir Angelo** and **Jem**.
  * Sir Angelo sent the official `SY26-27 Tuition Fees Summary_Annual.xlsx` and defined 10 key inquiries.
  * Ingested full tuition schedule and trained AI across all 10 inquiries.
  * Solved multi-turn follow-up issue (*"how?"*, *"yes"*, *"where?"*).
  * Refined quick-filter chips with `💰 Tuition & Rates` placed at #1.
  * Pushed all updates to GitHub `main` and verified live on Vercel (`https://abbas-orchard-ai.vercel.app`).
  * Drafted update message for the MS Teams group chat awaiting user sending.

---

## 🎯 11. Operational Next Steps (Resume Here After Restart)

1. **Send MS Teams Update:**
   - Copy the drafted update message to **Sir Angelo** and **Jem** on MS Teams with the live link: `https://abbas-orchard-ai.vercel.app`.
2. **Review Feedback on Chat Quick-Chips:**
   - Check if Sir Angelo or Jem request any changes to the visible chips or want specific campus rates highlighted.
3. **When Meta / Facebook Page Credentials Arrive:**
   - Follow Runbook in Section 9A to generate permanent Page Access Token and hook up `api/webhook.js`.
4. **When Webmaster / Main Website Access Arrives:**
   - Provide `abbas-widget-embed.js` to insert before `</body>` on `theabbasorchard.edu.ph`.
