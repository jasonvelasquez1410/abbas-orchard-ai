const axios = require('axios');

// Official Multi-Campus Directory & System Prompt
const ABBAS_SYSTEM_PROMPT = `
You are the official 24/7 AI Admissions Digital Employee and Montessori Guide for "The Abba's Orchard School", the premier and first Association Montessori Internationale (AMI) school network in the Philippines.

Heritage & Key Context:
- Founded by Dr. Maria Angelica "Teacher Ann" Paez-Barrameda and Mr. Christopher "Mr. Chris" Barrameda.
- Over 15 campuses nationwide across Luzon, Visayas, and Mindanao.
- Curriculum: Authentic AMI Montessori across 4 Planes of Development:
  1. Infant Community (14 months – 3 years): Functional independence, coordinated movement, language.
  2. Casa dei Bambini (3 – 6 years / Pre-School & Kindergarten): Practical Life, Sensorial, Language, Math, Cultural subjects.
  3. Elementary (6 – 12 years / Lower & Upper Elementary): Cosmic Education, collaborative research, moral reasoning.
  4. Erdkinder Adolescent Farm Boarding (12 – 18 years / Junior & Senior High): Located at Bukidnon La Granja Estates — land-based micro-economy, organic farming, animal stewardship, and academic rigor.

Official Campus Directory & Direct Routing:
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
Central Admissions: admission_application@theabbasorchard.edu.ph | Accounting Desk: Ms. Roxane (accounting@theabbasorchard.edu.ph)

Conversational Admissions Guidelines (Consultative Dialogue):
1. Conversational Rhythm & Pacing:
   - Keep answers warm, human, concise (2-3 short paragraphs max), and mobile/Messenger friendly.
   - Avoid dumping giant walls of text or encyclopedic campus lists unless explicitly requested.
   - Always end each response with exactly ONE friendly, targeted follow-up question to keep the conversation flowing smoothly.
2. Empathy & Genuine Care:
   - Parents are making profound choices for their children. Sound like a knowledgeable, caring Montessori guide who genuinely wants to support their child's unique development.
3. Natural Polyglot Matching:
   - English: Articulate, welcoming, inspiring, and clear.
   - Bisaya / Cebuano: Warm, natural, and respectful (e.g., "Maayong adlaw! Nalipay mi sa inyong interes...", "Pila na ang edad sa inyong anak karon?", "Naa tay prepared environment sa...").
   - Tagalog / Taglish: Courteous, respectful (po/opo), approachable, and reassuring.
4. Progressive Profiling & Soft Lead Capture:
   - Step 1: Discover child's current age/interests -> map to the correct Montessori environment.
   - Step 2: Determine their preferred campus location.
   - Step 3: Recommend a weekday morning observation walkthrough (or weekend farm visit for La Granja).
   - Step 4: Reassure about flexible payment schedules (Annual, Semi-Annual, Quarterly) and connect them with Ms. Roxane and the campus coordinator.
5. Lead Auto-Dispatch Tag Instruction:
   - If the inquiry is specific to a campus, asks for tuition, or provides parent/child details, append an invisible structured tag at the VERY END of your response in this exact JSON format:
   <!-- DISPATCH: {"campus": "Campus Name", "to": "campus_email@theabbasorchard.edu.ph", "subject": "Subject Summary", "parentName": "Name if provided or Prospective Parent", "parentContact": "Contact if provided or Captured via AI Session", "details": "Brief 1-2 sentence lead summary"} -->
`;

async function generateAIResponse(userMessage, conversationHistory = [], preferredCampus = null) {
  const provider = process.env.AI_PROVIDER || 'gemini';
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const model = process.env.AI_MODEL || (provider === 'gemini' ? 'gemini-2.0-flash' : 'gpt-4o-mini');

  let rawResponse = "";

  if (provider === 'gemini' && geminiKey) {
    const contents = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: userMessage }] });

    const candidateModels = [model, 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-exp'];
    let geminiSuccess = false;

    for (const m of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${geminiKey}`;
        const res = await axios.post(url, {
          system_instruction: { parts: [{ text: ABBAS_SYSTEM_PROMPT }] },
          contents: contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 800
          }
        }, { timeout: 10000 });

        const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          rawResponse = text;
          geminiSuccess = true;
          break;
        }
      } catch (err) {
        console.warn(`Gemini model ${m} call failed:`, err.message);
      }
    }

    if (!geminiSuccess) {
      rawResponse = generateFallbackResponse(userMessage, conversationHistory, preferredCampus);
    }

  } else if (provider === 'openai' && openaiKey) {
    try {
      const messages = [
        { role: 'system', content: ABBAS_SYSTEM_PROMPT },
        ...(Array.isArray(conversationHistory) ? conversationHistory : []).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: model,
        messages: messages,
        temperature: 0.4
      }, {
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      rawResponse = res.data?.choices?.[0]?.message?.content || generateFallbackResponse(userMessage, conversationHistory, preferredCampus);
    } catch (e) {
      console.warn("OpenAI call failed, using fallback:", e.message);
      rawResponse = generateFallbackResponse(userMessage, conversationHistory, preferredCampus);
    }

  } else {
    rawResponse = generateFallbackResponse(userMessage, conversationHistory, preferredCampus);
  }

  // Parse structured dispatch tag if present
  let cleanText = rawResponse || "Welcome to The Abba's Orchard School. How may we assist your family today?";
  let dispatchData = null;
  const dispatchMatch = typeof cleanText === 'string' ? cleanText.match(/<!--\s*DISPATCH:\s*(\{.*?\})\s*-->/s) : null;

  if (dispatchMatch) {
    cleanText = cleanText.replace(dispatchMatch[0], '').trim();
    try {
      dispatchData = JSON.parse(dispatchMatch[1]);
    } catch (e) {
      console.warn("Could not parse dispatch JSON:", e.message);
    }
  }

  return {
    reply: cleanText,
    dispatch: dispatchData
  };
}

function generateFallbackResponse(userMessage, conversationHistory = [], preferredCampus = null) {
  const currentText = (userMessage || '').trim();
  const lower = currentText.toLowerCase();

  const historyArray = Array.isArray(conversationHistory) ? conversationHistory : [];
  const historyText = historyArray.map(h => (h && h.content ? h.content : '')).join(' ').toLowerCase();

  // Language Detection
  const isBisaya = lower.includes('pila') || lower.includes('tagpila') || lower.includes('unsa') || 
                   lower.includes('unsaon') || lower.includes('karon') || lower.includes('naa') || 
                   lower.includes('taga') || lower.includes('daghan') || lower.includes('salamat kaayo') || 
                   lower.includes('maayong') || lower.includes('buntag') || lower.includes('hapon') || 
                   lower.includes('gabii') || lower.includes('asa') || lower.includes('kanus-a') ||
                   historyText.includes('tagpila') || historyText.includes('maayong');

  const isTagalog = lower.includes('magkano') || lower.includes('paano') || lower.includes('saan') || 
                    lower.includes('kailan') || lower.includes('meron') || lower.includes(' po') || 
                    lower.includes('opo') || lower.includes('salamat po') || lower.includes('puwede') || 
                    lower.includes('pede') || lower.includes('kumusta') || lower.includes('ano po');

  // Specific Campus Mentions
  const isDavao = lower.includes('davao') || lower.includes('obrero') || lower.includes('mandug');
  const isBukidnon = lower.includes('bukidnon') || lower.includes('granja') || lower.includes('erdkinder') || lower.includes('farm') || lower.includes('baungon');
  const isCdo = lower.includes('alwana') || lower.includes('cdo') || lower.includes('cagayan');
  const isCebu = lower.includes('cebu') || lower.includes('magsaysay') || lower.includes('tandang sora');
  const isBgc = lower.includes('bgc') || lower.includes('mckinley') || lower.includes('taguig');
  const isAlabang = lower.includes('alabang') || lower.includes('filinvest');
  const isGreenhills = lower.includes('greenhills') || lower.includes('mandaluyong');

  // Level & Age Inquiries
  const isCasa = lower.includes('casa') || lower.includes('kinder') || lower.includes('preschool') || lower.includes('pre-school') || lower.includes('3 year') || lower.includes('4 year') || lower.includes('5 year') || lower.includes('6 year');
  const isToddler = lower.includes('infant') || lower.includes('toddler') || lower.includes('14 month') || lower.includes('1 year') || lower.includes('2 year');
  const isElem = lower.includes('elementary') || lower.includes('grade 1') || lower.includes('grade 2') || lower.includes('grade 3') || lower.includes('grade 4') || lower.includes('grade 5') || lower.includes('grade 6');
  const isTuition = lower.includes('tuition') || lower.includes('fee') || lower.includes('pila') || lower.includes('tagpila') || lower.includes('magkano') || lower.includes('cost') || lower.includes('payment');
  const isTour = lower.includes('tour') || lower.includes('visit') || lower.includes('observation') || lower.includes('walkthrough');

  if (isDavao) {
    if (isBisaya) {
      return `Nalipay mi sa inyong interes sa atong **Davao City Campuses**! 🌱\n\nSa Davao, naa tay duha ka prepared environments para sa inyong anak:\n1. **Obrero Campus:** Infant Community (14 mos–3 yrs), Casa (3–6 yrs), ug Lower & Upper Elementary (6–12 yrs).\n2. **Mandug Campus:** Elementary ug Erdkinder Adolescent farm programs.\n\n📍 *Address:* Loyola St., Bo. Obrero / Mandug, Davao City\n📞 *Direct Line:* (0917) 707 2669\n📧 *Campus Coordinator:* **davao@theabbasorchard.edu.ph**\n\nPila man ang edad sa inyong anak karon, o gusto ba mo mag-schedule og observation tour sa Davao campus?\n<!-- DISPATCH: {"campus": "Davao City - Obrero & Mandug", "to": "davao@theabbasorchard.edu.ph", "subject": "Davao Campus Admissions Inquiry (Bisaya)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Davao campuses."} -->`;
    }
    if (isTagalog) {
      return `Ikinagagalak po namin ang inyong interes sa aming **Davao City Campuses**! 🌱\n\nSa Davao, nag-aalok kami ng:\n1. **Obrero Campus:** Infant Community (14 mos–3 yrs), Casa (3–6 yrs), at Elementary (6–12 yrs).\n2. **Mandug Campus:** Elementary at Erdkinder Adolescent environments.\n\n📍 *Address:* Loyola St., Bo. Obrero / Mandug, Davao City\n📞 *Direct Line:* (0917) 707 2669\n📧 *Campus Coordinator:* **davao@theabbasorchard.edu.ph**\n\nIlang taon na po ang inyong anak, o nais niyo po bang magpa-schedule ng classroom observation walkthrough sa Davao?\n<!-- DISPATCH: {"campus": "Davao City - Obrero & Mandug", "to": "davao@theabbasorchard.edu.ph", "subject": "Davao Campus Inquiry (Tagalog)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Davao City campuses."} -->`;
    }
    return `We are delighted by your interest in our **Davao City Campuses**! 🌱\n\nIn Davao City, we operate two authentic Montessori prepared environments:\n1. **Obrero Campus:** Infant Community (14 mos – 3 yrs), Casa dei Bambini (3 – 6 yrs), and Lower & Upper Elementary (6 – 12 yrs).\n2. **Mandug Campus:** Elementary and Erdkinder Adolescent environments.\n\n📍 *Address:* Loyola St., Bo. Obrero / Mandug, Davao City\n📞 *Direct Line:* (0917) 707 2669\n📧 *Campus Coordinator:* **davao@theabbasorchard.edu.ph**\n\nHow old is your child, or would you like me to connect you with our Davao admissions coordinator to book a morning observation walkthrough?\n<!-- DISPATCH: {"campus": "Davao City - Obrero & Mandug", "to": "davao@theabbasorchard.edu.ph", "subject": "Davao Campus Admissions Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Davao City campuses."} -->`;
  }

  if (isCdo) {
    if (isBisaya) {
      return `Maayong adlaw! Ang atong **Cagayan de Oro — Alwana Campus** nagtanyag sa: 🌱\n• **Infant Community:** 14 mos – 3 yrs\n• **Casa dei Bambini:** 3 – 6 yrs\n• **Elementary:** 6 – 12 yrs\n\n📍 *Address:* Alwana Business Park, Cugman, CDO\n📞 *Direct Line:* (0917) 707 2668\n📧 *Email:* alwana@theabbasorchard.edu.ph\n\nGusto ba ninyo madawat ang complete fee schedule o mag-book og morning walkthrough sa Alwana?\n<!-- DISPATCH: {"campus": "Cagayan de Oro - Alwana", "to": "alwana@theabbasorchard.edu.ph", "subject": "CDO Alwana Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on CDO Alwana campus."} -->`;
    }
    return `Our **Cagayan de Oro — Alwana Campus** offers authentic AMI Montessori environments:\n• **Infant Community:** 14 mos – 3 yrs\n• **Casa dei Bambini:** 3 – 6 yrs\n• **Elementary:** 6 – 12 yrs\n\n📍 *Address:* Alwana Business Park, Cugman, CDO\n📞 *Direct Line:* (0917) 707 2668\n📧 *Coordinator:* alwana@theabbasorchard.edu.ph\n\nWould you like the application packet or to book a morning observation walkthrough in Alwana?\n<!-- DISPATCH: {"campus": "Cagayan de Oro - Alwana", "to": "alwana@theabbasorchard.edu.ph", "subject": "CDO Alwana Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on CDO Alwana campus."} -->`;
  }

  if (isBukidnon) {
    return `🌾 **The Abba's Orchard Bukidnon — La Granja Estates:**\nLa Granja is our flagship **Erdkinder Farm Boarding Campus** in Baungon, Bukidnon. Combining Dr. Maria Montessori's adolescent pedagogy with academic rigor, organic agriculture, animal stewardship, and community living.\n\n**Programs Offered:**\n• Infant Community (14 mos – 3 yrs)\n• Casa (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n• Erdkinder Adolescent Boarding (12 – 18 yrs / Junior & Senior High)\n\n📍 *Address:* La Granja Estates, Pualas, Baungon, Bukidnon\n📞 *Direct Line:* (0917) 508 2668\n📧 *Coordinator:* **lagranja@theabbasorchard.edu.ph**\n\nWould you like to schedule a weekend farm tour or receive the adolescent boarding admissions checklist?\n<!-- DISPATCH: {"campus": "Bukidnon - La Granja Estates", "to": "lagranja@theabbasorchard.edu.ph", "subject": "Bukidnon Farm Boarding Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Bukidnon La Granja farm boarding."} -->`;
  }

  if (isCebu) {
    return `🌴 **The Abba's Orchard — Cebu Campuses (Magsaysay & Tandang Sora):**\nOur Cebu flagship campus provides authentic AMI Montessori environments:\n• Infant Community (14 mos – 3 yrs)\n• Casa dei Bambini (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n\n📍 *Address:* Magsaysay St. / Tandang Sora, Cebu City\n📞 *Direct Line:* (0917) 321 2668\n📧 *Campus Coordinator:* **cebu@theabbasorchard.edu.ph**\n\nWould you like to schedule a morning Montessori observation walkthrough at our Cebu campus?\n<!-- DISPATCH: {"campus": "Cebu City - Magsaysay & Tandang Sora", "to": "cebu@theabbasorchard.edu.ph", "subject": "Cebu Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Cebu campuses."} -->`;
  }

  if (isTuition) {
    if (isBisaya) {
      return `Maayong adlaw! Mahitungod sa **Tuition & Payment Terms** sa The Abba's Orchard: 🌱\n\nAng among admissions office nag-offer ug flexible payment terms:\n• **Annual (Full Payment)**\n• **Semi-Annual (2 Installments)**\n• **Quarterly (4 Installments)**\n\nGipasa na nako ang inyong inquiry ngadto sa campus admissions coordinator ug sa accounting desk ni Ms. Roxane (**accounting@theabbasorchard.edu.ph**).\n\nPila ang edad sa inyong anak ug asa nga campus ang inyong target para ma-send namo ang saktong schedule?\n<!-- DISPATCH: {"campus": "Central Admissions", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Request (Bisaya)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Parent requested tuition fee schedule."} -->`;
    }
    if (isTagalog) {
      return `Magandang araw po! Tungkol po sa **Tuition at Payment Options** sa The Abba's Orchard: 🌱\n\nNag-aalok po ang aming admissions office ng flexible payment schedules:\n• **Annual (Isahang Bayad)**\n• **Semi-Annual (2 Hulog)**\n• **Quarterly (4 na Hulog)**\n\nNa-forward na po ang inyong inquiry sa campus coordinator at sa accounting desk ni Ms. Roxane (**accounting@theabbasorchard.edu.ph**).\n\nIlang taon na po ang inyong anak at aling campus po ang inyong target para ma-send po namin ang tamang breakdown?\n<!-- DISPATCH: {"campus": "Central Admissions", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Request (Tagalog)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Parent requested tuition fee schedule in Tagalog."} -->`;
    }
    return `Regarding tuition and fees at **The Abba's Orchard School**, we offer flexible payment plans:\n• **Annual Plan (Full Payment)**\n• **Semi-Annual Plan (2 Installments)**\n• **Quarterly Plan (4 Installments)**\n\nI have forwarded your inquiry directly to our campus coordinator and Ms. Roxane at our central accounting desk (**accounting@theabbasorchard.edu.ph**).\n\nCould you please share your child's age and target campus so we can provide the exact schedule of fees?\n<!-- DISPATCH: {"campus": "Central Admissions", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Breakdown Request", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Parent requested tuition fee breakdown."} -->`;
  }

  if (lower.includes('grade') || lower.includes('level') || lower.includes('offer') || lower.includes('program') || lower.includes('curriculum')) {
    return `At **The Abba's Orchard School**, we follow authentic Association Montessori Internationale (AMI) pedagogical planes of development from infancy through adolescence:\n\n1. **Infant Community (14 months – 3 years):** Toddler environment fostering functional independence, language acquisition, and coordinated movement.\n2. **Casa dei Bambini (3 – 6 years / Pre-School & Kindergarten):** Practical Life, Sensorial, Language, Mathematics, and Cultural subjects.\n3. **Elementary (6 – 12 years / Lower & Upper Elementary):** Cosmic Education fostering collaborative research, moral development, critical thinking, and broad intellectual curiosity.\n4. **Erdkinder Adolescent Program (12 – 18 years / Junior & Senior High):** Offered at our Bukidnon La Granja farm campus with boarding, combining academic rigor with real-world land stewardship and student-run micro-economies.\n\nWhich grade level or campus are you inquiring about for your child?\n<!-- DISPATCH: {"campus": "Central Admissions", "to": "admission_application@theabbasorchard.edu.ph", "subject": "Grade Levels & Programs Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on offered grade levels."} -->`;
  }

  if (isBisaya) {
    return `Daghang salamat sa inyong mensahe! Mahitungod sa inyong inquiry: *" ${currentText} "* — andam mi motabang ninyo sa admissions, tuition details, o observation tour sa atong mga campuses (sama sa Davao, CDO Alwana, Bukidnon La Granja, Cebu, ug Manila).\n\nUnsa nga specific nga detalye o campus ang inyong gustong masayran?\n<!-- DISPATCH: {"campus": "Central Admissions", "to": "admission_application@theabbasorchard.edu.ph", "subject": "General Inquiry (Bisaya)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Parent asked: ${currentText}"} -->`;
  }

  if (isTagalog) {
    return `Maraming salamat po sa inyong mensahe! Tungkol po sa inyong inquiry: *" ${currentText} "* — narito po kami upang tumulong sa inyo sa admissions, breakdown ng tuition, o pag-book ng campus tour sa alinman sa aming 15+ campuses nationwide.\n\nMay partikular po ba kayong campus o edad ng bata na nais malaman?\n<!-- DISPATCH: {"campus": "Central Admissions", "to": "admission_application@theabbasorchard.edu.ph", "subject": "General Inquiry (Tagalog)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Parent asked: ${currentText}"} -->`;
  }

  return `Thank you for contacting **The Abba's Orchard School**, the premier Association Montessori Internationale (AMI) school network in the Philippines. 🌿\n\nWe operate 15+ campuses nationwide across Luzon, Visayas, and Mindanao. How may I assist your family today with admissions, campus tours, or program information?\n<!-- DISPATCH: {"campus": "Central Admissions", "to": "admission_application@theabbasorchard.edu.ph", "subject": "General Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Parent asked: ${currentText}"} -->`;
}

module.exports = {
  generateAIResponse,
  ABBAS_SYSTEM_PROMPT
};
