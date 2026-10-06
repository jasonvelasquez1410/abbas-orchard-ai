const axios = require('axios');

const ABBAS_SYSTEM_PROMPT = `
You are the official 24/7 AI Admissions Digital Employee for "The Abba's Orchard School", the premier and first Association Montessori Internationale (AMI) school network in the Philippines.

Key Organizational Context:
- Founded by Dr. Maria Angelica "Teacher Ann" Paez-Barrameda and Mr. Christopher "Mr. Chris" Barrameda.
- 15+ Campuses nationwide across Luzon, Visayas, and Mindanao.
- Curriculum: Authentic AMI Montessori across Infant Community (14 mos - 3 yrs), Casa (3 - 6 yrs), Elementary (6 - 12 yrs), and Erdkinder Adolescent Farm Boarding (12 - 18 yrs / Junior & Senior High).
- Bukidnon La Granja Estates (Baungon, Bukidnon): Premier farm boarding campus combining Montessori land-based micro-economy, agriculture, animal stewardship, and academic rigor.

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

Language & Tone Guidelines:
- Polyglot: Seamlessly converse in English, Bisaya / Cebuano, and Tagalog depending on what the user speaks. If they speak Bisaya (e.g. "pila tuition", "tagpila", "unsaon"), reply warmly in natural Bisaya.
- Warm, articulate, Montessori-educated, reassuring, and helpful.
- Tuition Inquiries: Explain that flexible payment terms (Annual, Semi-Annual, Quarterly) are offered. Reassure the parent that their request has been routed to the campus coordinator and Roxane's accounting desk, and invite them to share their child's current age.
- Encourage campus tour / prepared environment observation walkthroughs (weekday mornings).

Lead Auto-Dispatch Tag Instruction:
If the inquiry is specific to a campus, asks for tuition, or provides parent/child details, append an invisible structured tag at the VERY END of your response in this exact JSON format:
<!-- DISPATCH: {"campus": "Campus Name", "to": "campus_email@theabbasorchard.edu.ph", "subject": "Subject Summary", "parentName": "Name if provided or Prospective Parent", "parentContact": "Contact if provided or Captured via AI Session", "details": "Brief 1-2 sentence lead summary"} -->
`;

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, history = [], campus = null } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const provider = process.env.AI_PROVIDER || 'gemini';
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const model = process.env.AI_MODEL || (provider === 'gemini' ? 'gemini-2.0-flash' : 'gpt-4o-mini');

    let rawResponse = "";

    if (provider === 'gemini' && geminiKey) {
      const contents = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      const candidateModels = [model, 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-exp'];
      let geminiSuccess = false;

      for (const m of candidateModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${geminiKey}`;
          const apiRes = await axios.post(url, {
            system_instruction: { parts: [{ text: ABBAS_SYSTEM_PROMPT }] },
            contents: contents,
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 800
            }
          }, { timeout: 10000 });

          const text = apiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            rawResponse = text;
            geminiSuccess = true;
            break;
          }
        } catch (callErr) {
          console.warn(`Gemini model ${m} call failed:`, callErr.response?.data?.error?.message || callErr.message);
        }
      }

      if (!geminiSuccess) {
        rawResponse = generateFallbackMontessoriResponse(message, history, campus);
      }

    } else if (provider === 'openai' && openaiKey) {
      try {
        const messages = [
          { role: 'system', content: ABBAS_SYSTEM_PROMPT },
          ...history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          { role: 'user', content: message }
        ];

        const apiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
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
        rawResponse = apiRes.data?.choices?.[0]?.message?.content || generateFallbackMontessoriResponse(message, history, campus);
      } catch (openAiErr) {
        console.warn("OpenAI call failed, using built-in engine:", openAiErr.message);
        rawResponse = generateFallbackMontessoriResponse(message, history, campus);
      }

    } else {
      rawResponse = generateFallbackMontessoriResponse(message, history, campus);
    }

    let cleanText = rawResponse || "Welcome to The Abba's Orchard School. How may we assist your family today?";
    let dispatchData = null;
    const dispatchMatch = typeof cleanText === 'string' ? cleanText.match(/<!--\s*DISPATCH:\s*(\{.*?\})\s*-->/s) : null;

    if (dispatchMatch) {
      cleanText = cleanText.replace(dispatchMatch[0], '').trim();
      try {
        dispatchData = JSON.parse(dispatchMatch[1]);
      } catch (e) {}
    }

    return res.status(200).json({
      reply: cleanText,
      dispatch: dispatchData
    });

  } catch (err) {
    console.error('Vercel API Chat Error recovery:', err.message);
    const fallbackText = generateFallbackMontessoriResponse(req.body?.message || '', req.body?.history || [], req.body?.campus || null);
    return res.status(200).json({
      reply: fallbackText,
      dispatch: null
    });
  }
};

/**
 * Context-Aware Multi-Turn Conversational Engine with Language Mirroring
 */
function generateFallbackMontessoriResponse(message, history = [], campusName = null) {
  const currentText = (message || '').trim();
  const lower = currentText.toLowerCase();

  // Combine full conversation context to understand previous questions
  const historyText = history.map(h => (h.content || '')).join(' ').toLowerCase();
  const fullContext = (historyText + ' ' + lower).trim();

  // Language Detection (Bisaya, Tagalog, English)
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
  const isIloilo = lower.includes('iloilo') || lower.includes('sta. barbara') || lower.includes('barbara');
  const isBgc = lower.includes('bgc') || lower.includes('mckinley') || lower.includes('taguig');
  const isBayani = lower.includes('bayani');
  const isAlabang = lower.includes('alabang') || lower.includes('filinvest') || lower.includes('muntinlupa');
  const isGreenhills = lower.includes('greenhills') || lower.includes('mandaluyong');
  const isAntipolo = lower.includes('antipolo') || lower.includes('taktak');
  const isQc = lower.includes('quezon city') || lower.includes('bridgetowne') || lower.includes('calle industria') || lower.includes(' qc');
  const isLaguna = lower.includes('canlubang') || lower.includes('carmelray') || lower.includes('laguna');

  // Level & Age Inquiries
  const isCasa = lower.includes('casa') || lower.includes('kinder') || lower.includes('preschool') || lower.includes('pre-school') || lower.includes('3 year') || lower.includes('4 year') || lower.includes('5 year') || lower.includes('6 year') || lower.includes('3 yo') || lower.includes('4yo');
  const isToddler = lower.includes('infant') || lower.includes('toddler') || lower.includes('14 month') || lower.includes('1 year') || lower.includes('2 year') || lower.includes('2yo');
  const isElem = lower.includes('elementary') || lower.includes('grade 1') || lower.includes('grade 2') || lower.includes('grade 3') || lower.includes('grade 4') || lower.includes('grade 5') || lower.includes('grade 6') || lower.includes('7 year') || lower.includes('8 year') || lower.includes('9 year') || lower.includes('10 year');
  const isAdolescent = lower.includes('high school') || lower.includes('junior high') || lower.includes('senior high') || lower.includes('adolescent') || lower.includes('boarding') || lower.includes('dorm');

  // Tuition & Fees
  const isTuition = lower.includes('tuition') || lower.includes('fee') || lower.includes('pila') || lower.includes('tagpila') || lower.includes('magkano') || lower.includes('cost') || lower.includes('payment') || lower.includes('installment') || lower.includes('price');

  // Tour & Observation
  const isTour = lower.includes('tour') || lower.includes('visit') || lower.includes('observation') || lower.includes('walkthrough') || lower.includes('schedule') || lower.includes('appointment') || lower.includes('tan-aw');

  // Greetings & Thanks
  const isGreeting = (lower === 'hi' || lower === 'hello' || lower === 'good morning' || lower === 'good afternoon' || lower === 'kamusta' || lower === 'maayong buntag' || lower === 'maayong hapon');
  const isThanks = (lower.includes('salamat') || lower.includes('thank you') || lower.includes('thanks'));

  // 1. GREETINGS
  if (isGreeting) {
    if (isBisaya) {
      return `Maayong adlaw! Malipayon kami nga mo-abi-abi kaninyo sa **The Abba's Orchard School**. 🌱 Unsay akong matabang mahitungod sa atong mga programa o campuses (Luzon, Visayas, ug Mindanao)?`;
    }
    if (isTagalog) {
      return `Magandang araw po! Malugod po kayong tinatanggap sa **The Abba's Orchard School**. 🌱 Paano po namin kayo matutulungan tungkol sa aming mga programa at campus?`;
    }
    return `Hello and warm greetings! Welcome to **The Abba's Orchard School**. 🌿 How may I assist you today with our AMI Montessori programs, campus locations, or admissions process?`;
  }

  // 2. THANKS
  if (isThanks) {
    if (isBisaya) {
      return `Way sapayan! Nalipay kaayo mi nga nakatabang ninyo. Kung naa pa moy dugang mga pangutana bahin sa admissions o tour, ayaw pagduhaduha sa pag-chat diri. Daghang salamat! 🌱`;
    }
    if (isTagalog) {
      return `Walang anuman po! Ikinagagalak po naming makatulong sa inyong pamilya. Kung may iba pa po kayong katanungan tungkol sa admissions o tour, mag-message lamang po kayo rito. Salamat po! 🌱`;
    }
    return `You are very welcome! We are always delighted to assist your family on your Montessori journey. Feel free to message anytime if you have further questions or wish to book a campus walkthrough. Have a wonderful day! 🌿`;
  }

  // 3. DAVAO CAMPUS SPECIFIC (Handles direct "davao" replies)
  if (isDavao) {
    if (isBisaya) {
      return `Nalipay mi sa inyong interes sa atong **Davao City Campuses**! 🌱

Sa Davao, naa tay duha ka prepared environments para sa inyong anak:
1. **Obrero Campus:** Infant Community (14 mos–3 yrs), Casa (3–6 yrs), ug Lower & Upper Elementary (6–12 yrs).
2. **Mandug Campus:** Elementary ug Erdkinder Adolescent farm programs.

📍 *Address:* Loyola St., Bo. Obrero / Mandug, Davao City  
📞 *Direct Line:* (0917) 707 2669  
📧 *Campus Coordinator:* **davao@theabbasorchard.edu.ph**

Pila man ang edad sa inyong anak karon, o gusto ba mo mag-schedule og observation tour sa Davao campus?
<!-- DISPATCH: {"campus": "Davao City - Obrero & Mandug", "to": "davao@theabbasorchard.edu.ph", "subject": "Davao Campus Admissions & Observation Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent inquired regarding Davao City (Obrero / Mandug) campuses."} -->`;
    }
    
    if (isTagalog) {
      return `Ikinagagalak po namin ang inyong interes sa aming **Davao City Campuses**! 🌱

Sa Davao, nag-aalok kami ng:
1. **Obrero Campus:** Infant Community (14 mos–3 yrs), Casa (3–6 yrs), at Elementary (6–12 yrs).
2. **Mandug Campus:** Elementary at Erdkinder Adolescent environments.

📍 *Address:* Loyola St., Bo. Obrero / Mandug, Davao City  
📞 *Direct Line:* (0917) 707 2669  
📧 *Campus Coordinator:* **davao@theabbasorchard.edu.ph**

Ilang taon na po ang inyong anak, o nais niyo po bang magpa-schedule ng classroom observation walkthrough sa Davao?
<!-- DISPATCH: {"campus": "Davao City - Obrero & Mandug", "to": "davao@theabbasorchard.edu.ph", "subject": "Davao Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Inquiry on Davao City Obrero and Mandug campuses."} -->`;
    }

    return `We are delighted by your interest in our **Davao City Campuses**! 🌱

In Davao City, we operate two authentic Montessori prepared environments:
1. **Obrero Campus:** Infant Community (14 mos – 3 yrs), Casa dei Bambini (3 – 6 yrs), and Lower & Upper Elementary (6 – 12 yrs).
2. **Mandug Campus:** Elementary and Erdkinder Adolescent environments.

📍 *Address:* Loyola St., Bo. Obrero / Mandug, Davao City  
📞 *Direct Line:* (0917) 707 2669  
📧 *Campus Coordinator:* **davao@theabbasorchard.edu.ph**

How old is your child, or would you like me to connect you with our Davao admissions coordinator to book a morning observation walkthrough?
<!-- DISPATCH: {"campus": "Davao City - Obrero & Mandug", "to": "davao@theabbasorchard.edu.ph", "subject": "Davao Campus Admissions & Program Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent inquired regarding Davao City (Obrero / Mandug) campuses."} -->`;
  }

  // 4. CDO ALWANA CAMPUS
  if (isCdo) {
    if (isBisaya) {
      return `Maayong adlaw! Ang atong **Cagayan de Oro — Alwana Campus** nagtanyag sa mosunod nga mga programa: 🌱
• **Infant Community:** 14 months – 3 years old
• **Casa dei Bambini:** 3 – 6 years old (Pre-School & Kindergarten)
• **Elementary:** 6 – 12 years old (Lower & Upper Elementary)

📍 *Address:* Alwana Business Park, Cugman, Cagayan de Oro City  
📞 *Direct Line:* (0917) 707 2668  
📧 *Email:* **alwana@theabbasorchard.edu.ph**

Gusto ba ninyo madawat ang complete fee schedule o mag-book og morning walkthrough sa Alwana?
<!-- DISPATCH: {"campus": "Cagayan de Oro - Alwana", "to": "alwana@theabbasorchard.edu.ph", "subject": "CDO Alwana Admissions Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Inquiry on CDO Alwana campus programs and admissions."} -->`;
    }
    return `Our **Cagayan de Oro — Alwana Campus** offers authentic AMI Montessori environments:
• **Infant Community:** 14 mos – 3 yrs
• **Casa dei Bambini:** 3 – 6 yrs (Pre-School & Kindergarten)
• **Elementary:** 6 – 12 yrs

📍 *Address:* Alwana Business Park, Cugman, Cagayan de Oro City  
📞 *Direct Line:* (0917) 707 2668  
📧 *Coordinator:* alwana@theabbasorchard.edu.ph

Would you like the application packet or to book a morning observation walkthrough in Alwana?
<!-- DISPATCH: {"campus": "Cagayan de Oro - Alwana", "to": "alwana@theabbasorchard.edu.ph", "subject": "CDO Alwana Admissions Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Inquiry on CDO Alwana campus."} -->`;
  }

  // 5. BUKIDNON LA GRANJA / ERDKINDER FARM
  if (isBukidnon) {
    return `🌾 **The Abba's Orchard Bukidnon — La Granja Estates:**
La Granja is our flagship **Erdkinder Farm Boarding Campus** in Baungon, Bukidnon. Combining Dr. Maria Montessori's adolescent pedagogy with academic rigor, organic agriculture, animal stewardship, and community living.

**Programs Offered:**
• Infant Community (14 mos – 3 yrs)
• Casa (3 – 6 yrs)
• Elementary (6 – 12 yrs)
• Erdkinder Adolescent Boarding (12 – 18 yrs / Junior & Senior High)

📍 *Address:* La Granja Estates, Pualas, Baungon, Bukidnon  
📞 *Direct Line:* (0917) 508 2668  
📧 *Coordinator:* **lagranja@theabbasorchard.edu.ph**

Would you like to schedule a weekend farm tour or receive the adolescent boarding admissions checklist?
<!-- DISPATCH: {"campus": "Bukidnon - La Granja Estates", "to": "lagranja@theabbasorchard.edu.ph", "subject": "Bukidnon La Granja Farm Boarding Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Inquiry on Bukidnon La Granja Erdkinder farm and dormitory boarding."} -->`;
  }

  // 6. CEBU CAMPUSES
  if (isCebu) {
    return `🌴 **The Abba's Orchard — Cebu Campuses (Magsaysay & Tandang Sora):**
Our Cebu flagship campus provides authentic AMI Montessori environments:
• Infant Community (14 mos – 3 yrs)
• Casa dei Bambini (3 – 6 yrs)
• Elementary (6 – 12 yrs)

📍 *Address:* Magsaysay St. / Tandang Sora, Cebu City  
📞 *Direct Line:* (0917) 321 2668  
📧 *Campus Coordinator:* **cebu@theabbasorchard.edu.ph**

Would you like to schedule a morning Montessori observation walkthrough at our Cebu campus?
<!-- DISPATCH: {"campus": "Cebu City - Magsaysay & Tandang Sora", "to": "cebu@theabbasorchard.edu.ph", "subject": "Cebu Campus Admissions & Tour Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Inquiry on Cebu Magsaysay & Tandang Sora campuses."} -->`;
  }

  // 7. BGC MCKINLEY HILL / LUZON
  if (isBgc || isBayani || isAlabang || isGreenhills || isAntipolo || isQc || isLaguna) {
    let target = {
      name: isBgc ? 'Taguig - BGC McKinley Hill' : isAlabang ? 'Muntinlupa - Alabang' : isGreenhills ? 'Mandaluyong - Greenhills' : isAntipolo ? 'Antipolo City' : isQc ? 'Quezon City - Bridgetowne' : 'Canlubang - Laguna',
      email: isBgc ? 'mckinleyhill@theabbasorchard.edu.ph' : isAlabang ? 'alabang@theabbasorchard.edu.ph' : isGreenhills ? 'greenhills@theabbasorchard.edu.ph' : isAntipolo ? 'antipolo@theabbasorchard.edu.ph' : isQc ? 'calleindustria@theabbasorchard.edu.ph' : 'carmelray@theabbasorchard.edu.ph',
      phone: isBgc ? '(0917) 854 2668' : isAlabang ? '(0917) 855 2668' : '(0917) 856 2668'
    };
    return `🏙️ **The Abba's Orchard — ${target.name} Campus:**
We welcome families to our authentic AMI Montessori prepared environments in Metro Manila & Luzon:
• Infant Community (14 mos – 3 yrs)
• Casa dei Bambini (3 – 6 yrs / Pre-School & Kindergarten)
• Lower & Upper Elementary (6 – 12 yrs)

📞 *Direct Line:* ${target.phone}  
📧 *Campus Coordinator:* **${target.email}**

We conduct 1-on-1 parent orientation walkthroughs on weekday mornings. Would you like me to book your observation slot?
<!-- DISPATCH: {"campus": "${target.name}", "to": "${target.email}", "subject": "Luzon Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Inquiry on ${target.name} programs and admissions."} -->`;
  }

  // 8. TUITION & PAYMENT INQUIRIES
  if (isTuition) {
    if (isBisaya) {
      return `Maayong adlaw! Mahitungod sa **Tuition & Payment Terms** sa The Abba's Orchard: 🌱

Ang among admissions office nag-offer ug flexible payment terms:
• **Annual (Full Payment)**
• **Semi-Annual (2 Installments)**
• **Quarterly (4 Installments)**

Gipasa na nako ang inyong inquiry ngadto sa campus admissions coordinator ug sa accounting desk ni Ms. Roxane (**accounting@theabbasorchard.edu.ph**) para mahatagan mo sa official fee breakdown.

Pila ang edad sa inyong anak ug asa nga campus ang inyong target para ma-send namo ang saktong schedule?
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Schedule Request (Bisaya)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent requested tuition payment schedule and fee breakdown."} -->`;
    }

    if (isTagalog) {
      return `Magandang araw po! Tungkol po sa **Tuition at Payment Options** sa The Abba's Orchard: 🌱

Nag-aalok po ang aming admissions office ng flexible payment schedules:
• **Annual (Isahang Bayad)**
• **Semi-Annual (2 Hulog)**
• **Quarterly (4 na Hulog)**

Na-forward na po ang inyong inquiry sa campus coordinator at sa accounting desk ni Ms. Roxane (**accounting@theabbasorchard.edu.ph**) para maipadala ang opisyal na breakdown.

Ilang taon na po ang inyong anak at aling campus po ang inyong target?
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Fee Schedule Request", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent inquired regarding tuition payment plans."} -->`;
    }

    return `Regarding tuition and fees at **The Abba's Orchard School**, we offer flexible payment plans:
• **Annual Plan (Full Payment)**
• **Semi-Annual Plan (2 Installments)**
• **Quarterly Plan (4 Installments)**

I have forwarded your inquiry directly to our campus coordinator and Ms. Roxane at our central accounting desk (**accounting@theabbasorchard.edu.ph**).

Could you please share your child's age and target campus so we can provide the exact schedule of fees?
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Breakdown Request", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent requested tuition fee breakdown and payment schedules."} -->`;
  }

  // 9. CASA / SPECIFIC LEVEL INQUIRIES
  if (isCasa) {
    return `🌱 **Casa dei Bambini (3 – 6 Years Old / Pre-School & Kindergarten):**
In our AMI Casa prepared environments, children engage with self-correcting Montessori materials across:
• **Practical Life:** Coordination, focus, and independence
• **Sensorial:** Refining the 5 senses and mathematical foundations
• **Language:** Phonemic awareness, sandpaper letters, reading, and self-expression
• **Mathematics:** Concrete decimal system, bead chains, and operations
• **Cultural Studies:** Geography, biology, music, and art

**Admissions Steps for Casa:**
1. Submit accomplished Application Form & Birth Certificate
2. Developmental Parent Questionnaire
3. 1-on-1 Child Readiness & Observation Session

Which campus would you like to apply to?
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "Casa dei Bambini (3-6yo) Admissions Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent inquired on Casa (3-6yo) program and assessment steps."} -->`;
  }

  // 10. ELEMENTARY INQUIRIES
  if (isElem) {
    return `📚 **Montessori Elementary Program (6 – 12 Years Old):**
Our Lower and Upper Elementary environments are rooted in Maria Montessori's **Cosmic Education**, nurturing the child's expanding reasoning mind, imagination, and moral development.

Students undertake collaborative research projects, advanced geometry and algebra, science experiments, history of civilizations, and community responsibility.

Which campus are you looking to enroll your elementary student in?
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "Elementary Program Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent inquired about Elementary (6-12y) Montessori curriculum."} -->`;
  }

  // 11. GENERAL PROGRAM / GRADE INQUIRY
  if (lower.includes('grade') || lower.includes('level') || lower.includes('offer') || lower.includes('program')) {
    return `At **The Abba's Orchard School**, we follow authentic Association Montessori Internationale (AMI) pedagogical planes of development from infancy through adolescence:

1. **Infant Community (14 months – 3 years):** Fosters functional independence, language acquisition, and coordinated movement in a nurturing toddler environment.
2. **Casa dei Bambini (3 – 6 years / Pre-School & Kindergarten):** Hands-on learning across Practical Life, Sensorial, Language, Mathematics, and Cultural subjects.
3. **Elementary (6 – 12 years / Lower & Upper Elementary):** Cosmic Education fostering collaborative research, moral development, critical thinking, and broad intellectual curiosity.
4. **Erdkinder Adolescent Program (12 – 18 years / Junior & Senior High):** Offered at our Bukidnon La Granja farm campus with boarding, combining academic rigor with real-world land stewardship and student-run micro-economies.

Which grade level or campus are you inquiring about for your child?
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "Admissions Query - Grade Levels & Programs", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquired about offered grade levels and AMI Montessori programs."} -->`;
  }

  // 12. TOUR / VISIT
  if (isTour) {
    return `🌿 **Booking a Montessori Campus Observation Walkthrough:**
At The Abba's Orchard, observing an active Montessori prepared environment during weekday morning work cycles is the best way to experience True Montessori® in action.

I have logged your request for our admissions coordinator. Please share your **target campus**, preferred **weekday morning**, and **contact number** to confirm your walkthrough.
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "Campus Observation Walkthrough Booking", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent requested a campus observation walkthrough."} -->`;
  }

  // 13. FALLBACK CONVERSATIONAL RESPONSE (Always responsive & context-aware)
  if (isBisaya) {
    return `Daghang salamat sa inyong mensahe! Mahitungod sa inyong inquiry: *" ${currentText} "* — andam mi motabang ninyo sa admissions, tuition details, o observation tour sa atong mga campuses (sama sa Davao, CDO Alwana, Bukidnon La Granja, Cebu, ug Manila).

Unsa nga specific nga detalye o campus ang inyong gustong masayran?
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "General Inquiry (Bisaya)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent asked: ${currentText}"} -->`;
  }

  if (isTagalog) {
    return `Maraming salamat po sa inyong mensahe! Tungkol po sa inyong inquiry: *" ${currentText} "* — narito po kami upang tumulong sa inyo sa admissions, breakdown ng tuition, o pag-book ng campus tour sa alinman sa aming 15+ campuses nationwide.

May partikular po ba kayong campus o edad ng bata na nais malaman?
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "General Inquiry (Tagalog)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent asked: ${currentText}"} -->`;
  }

  return `Thank you for your message! Regarding your inquiry: *" ${currentText} "* — we are happy to assist you with admissions requirements, tuition schedules, or scheduling a morning observation walkthrough across any of our 15+ campuses in Luzon, Visayas, and Mindanao.

Which campus or child age group would you like to explore?
<!-- DISPATCH: {"campus": "${campusName || 'Central Admissions'}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "General Admissions Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent asked: ${currentText}"} -->`;
}
