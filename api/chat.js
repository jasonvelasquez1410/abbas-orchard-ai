const axios = require('axios');

const ABBAS_SYSTEM_PROMPT = `
You are the official 24/7 AI Admissions Digital Employee and Montessori Guide for "The Abba's Orchard School", the premier and first Association Montessori Internationale (AMI) school network in the Philippines.

Heritage & Foundation:
- Founded by Dr. Maria Angelica "Teacher Ann" Paez-Barrameda and Mr. Christopher "Mr. Chris" Barrameda.
- Over 15 campuses nationwide across Luzon, Visayas, and Mindanao.
- Curriculum: Authentic AMI Montessori across 4 Planes of Development:
  1. Infant Community (14 months – 3 years): Functional independence, motor refinement, expressive language.
  2. Casa dei Bambini (3 – 6 years / Pre-School & Kindergarten): Practical Life, Sensorial, Concrete Math beads, Language/Phonics, Cultural subjects.
  3. Elementary (6 – 12 years / Lower & Upper Elementary): Cosmic Education, collaborative scientific research, interconnected humanities, moral consciousness.
  4. Erdkinder Adolescent Farm Boarding (12 – 18 years / Junior & Senior High): Located at Bukidnon La Granja Estates — land-based micro-economy, organic agriculture, animal stewardship, and academic rigor.

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

Deep Pedagogical & Institutional Knowledge:
- Assessment & Grading: No artificial letter/percentage grades or stressful test cramming. Directresses maintain scientific qualitative records of mastery via 3-period lessons. Parents receive comprehensive developmental narrative reports and portfolio evaluations (fully compliant and recognized by DepEd).
- Discipline & Tantrums ("Freedom within Limits"): No punitive shaming or timeouts. Directresses teach Grace & Courtesy, provide positive redirection to meaningful purposeful work, and utilize the Peace Table / Peace Flower for emotional regulation and conflict resolution.
- Transition to Traditional Schools & Universities: Graduates seamlessly transition to top Philippine universities (UP, Ateneo, DLSU, UST) and prestigious international colleges. Montessori fosters high executive functioning, self-advocacy, intrinsic motivation, and critical reading comprehension.
- Neurodiversity & Delays (ADHD, Speech Delay): The prepared environment is self-paced and multi-sensory. An initial developmental readiness observation is conducted to ensure our prepared environment effectively supports the child's needs.
- DepEd Accreditation & Vouchers: Fully recognized by DepEd and AMI. Participating high school campuses accept DepEd Senior High School (SHS) Vouchers and ESC subsidies.
- Calendar & Enrollment: Regular academic year is August to May/June. Rolling admissions and mid-year transfers are accepted subject to slot availability and readiness assessment.
- Sibling Discounts & Tuition: Sibling discounts are offered for 2nd and 3rd children. Flexible payment terms available: Annual (full), Semi-Annual (2 installments), and Quarterly (4 installments).
- Uniforms & Nutrition: Comfortable casual clothes supporting independence and movement; campus polo shirts for formal events. Wholesome nutrition policy (no junk food / sodas); snack time is a practical life table-setting and self-feeding lesson.

Conversational Admissions Guidelines (Consultative Dialogue):
1. Parent Name & Child Profiling:
   - If the parent shares their name (e.g. "I'm Mommy Grace"), address them respectfully and warmly by name throughout the chat.
   - Retain context on previously mentioned campuses and children's ages across turns.
2. Conversational Rhythm & Pacing:
   - Keep answers warm, consultative, concise (2-3 short paragraphs max), and mobile-friendly.
   - Always end each response with exactly ONE friendly, targeted follow-up question.
3. Natural Polyglot Matching:
   - English: Articulate, welcoming, inspiring, and clear.
   - Bisaya / Cebuano: Warm, natural, and respectful (e.g., "Maayong adlaw!", "Pila na ang edad sa inyong anak karon?", "Naa tay prepared environment sa...").
   - Tagalog / Taglish: Courteous, respectful (po/opo), approachable, and reassuring.
4. Lead Auto-Dispatch Tag Instruction:
   - If the inquiry is specific to a campus, asks for tuition, or provides parent/child details, append an invisible structured tag at the VERY END of your response in this exact JSON format:
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

function analyzeAgesAndPlanes(text) {
  const lower = (text || '').toLowerCase();
  
  const wordMap = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14,
    'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18
  };

  const detectedAges = [];
  
  // Match numbers: 1 to 18 (guarding against phone numbers or timestamps)
  const regexNum = /\b([1-9]|1[0-8])\s*(?:yo|y\.o\.|years?\s*old|years?|yrs?|yr)?\b/gi;
  let match;
  while ((match = regexNum.exec(lower)) !== null) {
    const num = parseInt(match[1], 10);
    const idx = match.index;
    const prevChar = idx > 0 ? lower[idx - 1] : '';
    const nextChar = idx + match[0].length < lower.length ? lower[idx + match[0].length] : '';
    // Skip if inside time (8:30) or phone number (0917-xxx)
    if (prevChar === ':' || prevChar === '-' || prevChar === '/' || prevChar === '0' || nextChar === ':') {
      continue;
    }
    if (num >= 1 && num <= 18 && !detectedAges.includes(num)) {
      detectedAges.push(num);
    }
  }

  // Match word numbers: "five", "eleven", etc.
  for (const [word, num] of Object.entries(wordMap)) {
    const wordRegex = new RegExp(`\\b${word}\\b`, 'i');
    if (wordRegex.test(lower) && !detectedAges.includes(num)) {
      detectedAges.push(num);
    }
  }

  // Month patterns (e.g. 14 months, 18 mos)
  const monthMatch = lower.match(/\b(1[4-9]|[2-3]\d)\s*(?:months?|mos|mo)\b/);
  const isToddlerExplicit = Boolean(monthMatch) || lower.includes('toddler') || lower.includes('infant');

  const planes = [];
  
  if (isToddlerExplicit || detectedAges.some(a => a <= 2)) {
    const ageList = detectedAges.filter(a => a <= 2);
    const ageLabel = ageList.length > 0 ? `${ageList.join(' & ')} year old` : '14 mos – 3 yrs';
    planes.push({
      id: 'infant',
      name: 'Infant Community (Toddler Environment)',
      ageLabel: ageLabel,
      range: '14 Months – 3 Years',
      description: 'Nurtures functional independence, coordinated movement, fine motor refinement, and expressive language acquisition in a peaceful, prepared setting.'
    });
  }

  if (detectedAges.some(a => a >= 3 && a <= 6) || lower.includes('preschool') || lower.includes('kinder') || lower.includes('casa')) {
    const ageList = detectedAges.filter(a => a >= 3 && a <= 6);
    const ageLabel = ageList.length > 0 ? `${ageList.join(' & ')} year old` : '3 – 6 Years';
    planes.push({
      id: 'casa',
      name: 'Casa dei Bambini (Pre-School & Kindergarten)',
      ageLabel: ageLabel,
      range: '3 – 6 Years',
      description: 'Fosters self-directed discovery across Practical Life, Sensorial refinement, concrete hands-on Mathematics bead materials, and language/phonics reading fluency.'
    });
  }

  if (detectedAges.some(a => a >= 7 && a <= 12) || lower.includes('elementary') || lower.includes('grade 1') || lower.includes('grade 2') || lower.includes('grade 3') || lower.includes('grade 4') || lower.includes('grade 5') || lower.includes('grade 6')) {
    const ageList = detectedAges.filter(a => a >= 7 && a <= 12);
    const ageLabel = ageList.length > 0 ? `${ageList.join(' & ')} year old` : '6 – 12 Years';
    planes.push({
      id: 'elem',
      name: 'Elementary (Lower & Upper Elementary)',
      ageLabel: ageLabel,
      range: '6 – 12 Years',
      description: 'Provides Dr. Maria Montessori’s Cosmic Education — inspiring broad intellectual curiosity, collaborative scientific research, advanced mathematical reasoning, and moral consciousness.'
    });
  }

  if (detectedAges.some(a => a >= 13 && a <= 18) || lower.includes('high school') || lower.includes('adolescent') || lower.includes('erdkinder') || lower.includes('boarding')) {
    const ageList = detectedAges.filter(a => a >= 13 && a <= 18);
    const ageLabel = ageList.length > 0 ? `${ageList.join(' & ')} year old` : '12 – 18 Years';
    planes.push({
      id: 'erdkinder',
      name: 'Erdkinder Adolescent Farm Boarding',
      ageLabel: ageLabel,
      range: '12 – 18 Years / Junior & Senior High',
      description: 'Our flagship adolescent farm boarding community at Bukidnon La Granja combining academic rigor with land stewardship, animal husbandry, and a student-run micro-economy.'
    });
  }

  return { detectedAges, planes };
}

/**
 * Context-Aware Multi-Turn Conversational Engine with Language Mirroring & Lead Capture
 */
/**
 * Context-Aware Multi-Turn Conversational Engine with Deep Intent Analysis & Language Mirroring
 */
function generateFallbackMontessoriResponse(message, history = [], campusName = null) {
  const currentText = (message || '').trim();
  const lower = currentText.toLowerCase();

  const historyArray = Array.isArray(history) ? history : [];
  const historyText = historyArray.map(h => (h && h.content ? h.content : '')).join(' ').toLowerCase();
  const lastModelMsg = [...historyArray].reverse().find(h => h && h.role === 'model')?.content || '';
  const lastModelLower = lastModelMsg.toLowerCase();
  const fullContext = (historyText + ' ' + lower).trim();

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

  // Contact Number & Email Extraction
  const phoneMatch = currentText.match(/(\+?63\s?9\d{2}[\s-]?\d{3}[\s-]?\d{4}|09\d{2}[\s-]?\d{3}[\s-]?\d{4}|09\d{9}|\b\d{7,11}\b)/);
  const emailMatch = currentText.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  const capturedContact = phoneMatch ? phoneMatch[0] : (emailMatch ? emailMatch[0] : null);

  // Time / Schedule Preferences
  const hasTimePref = lower.includes('morning') || lower.includes('afternoon') || lower.includes('weekday') || 
                      lower.includes('monday') || lower.includes('tuesday') || lower.includes('wednesday') || 
                      lower.includes('thursday') || lower.includes('friday') || lower.includes('buntag') || 
                      lower.includes('hapon') || lower.includes('bukas') || lower.includes('tomorrow');

  // Active Campus Resolution
  let campusInfo = {
    name: "The Abba's Orchard Central Admissions",
    email: "admission_application@theabbasorchard.edu.ph",
    phone: "(0917) 508 2668"
  };

  if (fullContext.includes('alwana') || fullContext.includes('cdo') || fullContext.includes('cagayan')) {
    campusInfo = { name: "Cagayan de Oro — Alwana Campus", email: "alwana@theabbasorchard.edu.ph", phone: "(0917) 707 2668" };
  } else if (fullContext.includes('davao') || fullContext.includes('obrero') || fullContext.includes('mandug')) {
    campusInfo = { name: "Davao City Campuses (Obrero & Mandug)", email: "davao@theabbasorchard.edu.ph", phone: "(0917) 707 2669" };
  } else if (fullContext.includes('granja') || fullContext.includes('bukidnon') || fullContext.includes('baungon') || fullContext.includes('erdkinder')) {
    campusInfo = { name: "Bukidnon — La Granja Farm Boarding", email: "lagranja@theabbasorchard.edu.ph", phone: "(0917) 508 2668" };
  } else if (fullContext.includes('cebu') || fullContext.includes('magsaysay') || fullContext.includes('tandang sora')) {
    campusInfo = { name: "Cebu City Campuses (Magsaysay & Tandang Sora)", email: "cebu@theabbasorchard.edu.ph", phone: "(0917) 321 2668" };
  } else if (fullContext.includes('iloilo') || fullContext.includes('barbara')) {
    campusInfo = { name: "Iloilo Campus (Sta. Barbara Heights)", email: "iloilo@theabbasorchard.edu.ph", phone: "(0917) 322 2668" };
  } else if (fullContext.includes('mckinley') || (fullContext.includes('bgc') && !fullContext.includes('bayani'))) {
    campusInfo = { name: "Taguig — BGC McKinley Hill Campus", email: "mckinleyhill@theabbasorchard.edu.ph", phone: "(0917) 854 2668" };
  } else if (fullContext.includes('bayani')) {
    campusInfo = { name: "Taguig — Bayani Road Campus", email: "bayani@theabbasorchard.edu.ph", phone: "(0917) 854 2669" };
  } else if (fullContext.includes('alabang') || fullContext.includes('filinvest') || fullContext.includes('muntinlupa')) {
    campusInfo = { name: "Muntinlupa — Alabang Filinvest Campus", email: "alabang@theabbasorchard.edu.ph", phone: "(0917) 855 2668" };
  } else if (fullContext.includes('greenhills') || fullContext.includes('mandaluyong')) {
    campusInfo = { name: "Mandaluyong — Greenhills Campus", email: "greenhills@theabbasorchard.edu.ph", phone: "(0917) 856 2668" };
  } else if (fullContext.includes('antipolo') || fullContext.includes('taktak')) {
    campusInfo = { name: "Antipolo City — Taktak Road Campus", email: "antipolo@theabbasorchard.edu.ph", phone: "(0917) 857 2668" };
  } else if (fullContext.includes('calle industria') || fullContext.includes('bridgetowne') || fullContext.includes('quezon city')) {
    campusInfo = { name: "Quezon City — Bridgetowne / Calle Industria", email: "calleindustria@theabbasorchard.edu.ph", phone: "(0917) 858 2668" };
  } else if (fullContext.includes('carmelray') || fullContext.includes('canlubang') || fullContext.includes('laguna')) {
    campusInfo = { name: "Canlubang — Carmelray Laguna Campus", email: "carmelray@theabbasorchard.edu.ph", phone: "(0917) 859 2668" };
  }

  // Parent Name Extraction
  let parentName = "Prospective Parent";
  const nameMatch = currentText.match(/(?:i am|i'm|my name is|this is)\s+(?:mommy\s+|daddy\s+|mr\.\s+|ms\.\s+|mrs\.\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameMatch && nameMatch[1]) {
    parentName = nameMatch[1].trim();
  } else {
    // Check if name was mentioned earlier in history
    const histNameMatch = historyText.match(/(?:i am|i'm|my name is|this is)\s+(?:mommy\s+|daddy\s+|mr\.\s+|ms\.\s+|mrs\.\s+)?([A-Za-z]+)/i);
    if (histNameMatch && histNameMatch[1]) {
      parentName = histNameMatch[1].trim();
    }
  }

  // --------------------------------------------------------------------------
  // INTENT 1: Explanation / Inquiry: "What is that?" / "What is a walkthrough / tour / observation?"
  // --------------------------------------------------------------------------
  const isAskingWhatIsThat = lower === 'what is that' || lower === 'what is that?' || 
                             lower === 'what is that walkthrough' || lower === 'what is that walkthrough?' ||
                             lower.includes('what is a walkthrough') || lower.includes('what is the walkthrough') || 
                             lower.includes('what is an observation') || lower.includes('what is the observation') ||
                             lower.includes('what do you do in a walkthrough') || lower.includes('what happens during a walkthrough') ||
                             lower.includes('how does a walkthrough work') || lower.includes('explain walkthrough') ||
                             lower.includes('tell me about the walkthrough') || lower.includes('unsa na ang walkthrough') ||
                             lower.includes('ano yung walkthrough') || lower.includes('ano po ang observation') ||
                             ((lower.startsWith('what is') || lower.startsWith('ano') || lower.startsWith('unsa') || lower.includes('explain') || lower.includes('tell me more')) && (lastModelLower.includes('walkthrough') || lastModelLower.includes('observation')));

  if (isAskingWhatIsThat) {
    if (isBisaya) {
      return `🌿 **Unsa man ang usa ka Montessori Observation Walkthrough?**\n\nDili kini ordinaryo nga school tour kung asa igo lang mo tan-aw sa haw-ang nga mga kwarto. Sa The Abba's Orchard, ang Observation Walkthrough usa ka **30 hangtod 45 minutos nga live classroom observation** panahon sa tinuod nga **uninterrupted morning work cycle** (8:30 AM – 11:00 AM):\n\n• **Makita nimo ang True Montessori sa Lihok:** Molingkod kamo sulod sa prepared environment ug makita kung unsa ka-focus ug ka-independent ang mga bata samtang nagamit sa authentic Montessori materials (math beads, sensorial apparatus, practical life).\n• **Walay Rote Teaching:** Makita ninyo nga ang mga bata nagapili sa ilang buluhaton nga may disiplina ug kalinaw.\n• **One-on-One Consultation:** Human sa classroom observation, makigtagbo kamo sa atong Montessori Directress o Campus Coordinator (CADO) aron hisgutan ang developmental readiness sa inyong anak ug tubagon ang tanan ninyong pangutana.\n\nGusto ba ninyo sulayan kini nga observation walkthrough sa **${campusInfo.name}**?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Walkthrough Explanation Provided (Bisaya)", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent asked what a walkthrough is."} -->`;
    }

    if (isTagalog) {
      return `🌿 **Ano po ang isang Montessori Observation Walkthrough?**\n\nHindi po ito pangkaraniwang school tour na titingin lang sa mga bakanteng silid-aralan. Sa The Abba's Orchard, ang Walkthrough ay isang **30 hanggang 45 minutong live classroom observation** habang aktibong nagtatrabaho ang mga bata sa kanilang **uninterrupted morning work cycle** (8:30 AM – 11:00 AM):\n\n• **Aktwal na True Montessori in Action:** Tahimik po kayong uupo sa prepared environment upang saksihan ang lalim ng focus, self-discipline, at saya ng mga bata habang ginagamit ang mga hands-on materials (Math bead chains, Sensorial apparatus, Practical Life).\n• **Walang Sapilitang Rote Lectures:** Makikita ninyo kung paano kusang nag-aaral at nagtutulungan ang mga mag-aaral.\n• **Personal Consult with Directress:** Pagkatapos ng observation, magkakaroon po kayo ng private Q&A kasama ang aming Montessori Directress o Campus Coordinator (CADO) upang pag-usapan ang learning readiness ng inyong anak.\n\nNais po ba ninyong mag-book ng observation walkthrough para sa inyong mga anak sa **${campusInfo.name}**?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Walkthrough Explanation Provided (Tagalog)", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent asked what a walkthrough is."} -->`;
    }

    return `🌿 **What is a Montessori Observation Walkthrough?**\n\nUnlike traditional school tours where parents merely glance at empty classrooms or listen to sales brochures, a **Montessori Observation Walkthrough** at The Abba's Orchard is an immersive **30 to 45-minute live classroom observation** during our active **uninterrupted morning work cycle** (8:30 AM – 11:00 AM):\n\n• **Experience True Montessori in Action:** You sit peacefully inside the prepared environment and observe children deeply engaged in spontaneous, self-directed exploration with authentic AMI Montessori materials (such as concrete Math bead apparatus, Sensorial cylinders, and Practical Life exercises).\n• **Witness Natural Focus & Self-Regulation:** You will see children as young as 3 to 12 years old exercising calm concentration, independence, peer respect, and genuine love for learning without teacher lectures or rigid bells.\n• **Post-Observation Directress Consultation:** Right after your observation, our Campus Directress and Admissions Officer (CADO) will sit with you 1-on-1 to discuss what you observed, assess your children's developmental planes, and answer any curriculum or tuition questions.\n\nWould you like to experience an observation walkthrough at our **${campusInfo.name}**, or do you have more questions about how our classrooms work?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Walkthrough Explanation Provided", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent asked for explanation of walkthrough."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 2: Assessment, Grading, Tests & Homework
  // --------------------------------------------------------------------------
  const isGradingExam = lower.includes('grade') && (lower.includes('exam') || lower.includes('test') || lower.includes('homework') || lower.includes('report card') || lower.includes('assess') || lower.includes('score')) ||
                        lower.includes('grading system') || lower.includes('how do you grade') || lower.includes('may exam ba') || lower.includes('may homework ba') || lower.includes('walay exam') || lower.includes('walang grades');
  if (isGradingExam) {
    if (isBisaya) {
      return `🌿 **Giunsa Pag-assess ang mga Bata sa Authentic Montessori?**\n\nSa The Abba's Orchard, **wala kitay arbitraryong exams, numerical ranking, o makapaguol nga homework**:\n\n• **Continuous Qualitative Observation:** Ang atong AMI Directress naghupot ug detalyadong scientific record book sa matag bata kada adlaw, nagsubay sa ilang pag-master sa matag material pinaagi sa *Three-Period Lessons*.\n• **Self-Correction & Mastery:** Ang Montessori materials kay *self-correcting* — makita sa bata ang sayop ug matul-id kini sa iyang kaugalingon nga walay kahadlok nga mapahiya.\n• **Comprehensive Progress Reports:** Makadawat ang mga ginikanan ug detalyadong narrative developmental report cards ug portfolio presentations nga hingpit nga giila ug subay sa DepEd standards.\n\nGusto ba ninyo makita kung giunsa kini sa klasehanan pinaagi sa usa ka observation walkthrough sa **${campusInfo.name}**?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Grading & Assessment Inquiry (Bisaya)", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent asked about grading, exams, and homework."} -->`;
    }
    return `🌿 **How are Children Evaluated & Assessed in True Montessori?**\n\nAt The Abba's Orchard, we do not subject children to stressful competitive exams, percentage rankings, or burdensome homework drills:\n\n1. 📊 **Scientific Qualitative Record-Keeping:** Our AMI-trained Directresses maintain daily individualized mastery tracking logs observing each child's readiness and lesson progression via the scientific *Three-Period Lesson* method.\n2. 🧩 **Intrinsic Self-Correction:** Montessori materials are engineered with built-in "controls of error", empowering children to discover and correct errors independently without fear of shame or penalties.\n3. 📜 **Holistic Developmental Portfolios:** Parents receive comprehensive narrative evaluation portfolios detailing academic concepts mastered, social-emotional maturity, concentration span, and executive function — fully aligned with DepEd requirements.\n\nWould you like to schedule an observation walkthrough at **${campusInfo.name}** to see this peaceful learning in action?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Grading & Assessment Inquiry", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent asked about grading and assessment."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 3: Discipline, Tantrums, Behavior & Freedom Within Limits
  // --------------------------------------------------------------------------
  const isDiscipline = lower.includes('discipline') || lower.includes('tantrum') || lower.includes('misbehav') || 
                       lower.includes('makulit') || lower.includes('naughty') || lower.includes('punish') || 
                       lower.includes('freedom within limits') || lower.includes('peace table') || lower.includes('peace flower') ||
                       lower.includes('bad behavior') || lower.includes('rules');
  if (isDiscipline) {
    return `🌿 **Discipline & "Freedom Within Limits" in the Montessori Classroom:**\n\nDr. Maria Montessori discovered that misbehavior and tantrums usually arise when a child's developmental need for purposeful action is blocked. We do not use shaming, detention, or punitive timeouts:\n\n• 🕊️ **Grace and Courtesy:** Daily social lessons teach children how to express frustration respectfully, wait their turn, resolve disputes, and honor peers' personal space.\n• 🌸 **The Peace Table & Peace Flower:** When conflicts occur, children are guided to the Peace Table to converse calmly, hold the Peace Flower, and arrive at mutual reconciliation.\n• 🎯 **Positive Redirection:** If a child feels restless or unfocused, the Directress gently connects them to absorbing physical materials (e.g. heavy Practical Life washing, sensorial sorting) that restores internal equilibrium.\n\nWould you like to observe how calm and self-regulated our children are during a morning walkthrough at **${campusInfo.name}**?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Discipline & Classroom Culture Inquiry", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent inquired regarding discipline and behavior management."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 4: Transition to Traditional Schools & College Readiness
  // --------------------------------------------------------------------------
  const isTransitionCollege = lower.includes('transition') || lower.includes('traditional school') || 
                              lower.includes('college') || lower.includes('university') || lower.includes('ateneo') || 
                              lower.includes('dlsu') || lower.includes('upcat') || lower.includes('ust') || 
                              lower.includes('adjust to traditional') || lower.includes('big school');
  if (isTransitionCollege) {
    return `🎓 **Transitioning to Traditional High Schools, Top Universities & Life Beyond:**\n\nA frequent question parents ask is how well Montessori students adapt to traditional academic settings. Our graduates consistently excel in top universities (**UP Diliman, Ateneo de Manila, De La Salle University, UST**, as well as international institutions) because Montessori instills:\n\n1. 🧠 **Deep Executive Functioning:** Students know how to manage their time, set self-directed study schedules, and conduct deep research without constant adult supervision.\n2. 📖 **Exceptional Reading & Conceptual Grasp:** Because they mastered math and sciences with concrete physical apparatus first, abstract high-school calculus, physics, and essays feel intuitive.\n3. 💡 **Self-Advocacy & Adaptability:** Orchard alumni are confident communicators, active leaders in student government, and resilient problem-solvers.\n\nWould you like to connect with our admissions desk to learn more about our Elementary or Erdkinder High School curriculum?`;
  }

  // --------------------------------------------------------------------------
  // INTENT 5: Special Needs, ADHD, Speech Delay & Learning Accommodations
  // --------------------------------------------------------------------------
  const isSpecialNeeds = lower.includes('adhd') || lower.includes('autism') || lower.includes('special needs') || 
                         lower.includes('speech delay') || lower.includes('neurodiverse') || lower.includes('sped') || 
                         lower.includes('shadow teacher') || lower.includes('hyperactive') || lower.includes('developmental delay');
  if (isSpecialNeeds) {
    return `🌱 **Individualized Growth & Developmental Support at The Abba's Orchard:**\n\nBecause authentic AMI Montessori classrooms are naturally self-paced, hands-on, and multi-sensory, many active or neurodiverse children flourish in our prepared environments:\n\n• **Individualized Pacing:** Children are never rushed through a uniform lesson or forced to sit still for hours of lectures.\n• **Observation Session:** For children with identified developmental or speech considerations, our initial step is a friendly **readiness observation session** with our Directress to evaluate whether our mainstream Montessori environment can meet your child's specific developmental goals.\n\nWould you like us to connect you directly with the Campus Directress at **${campusInfo.name}** to discuss your child's unique developmental background?`;
  }

  // --------------------------------------------------------------------------
  // INTENT 6: DepEd Accreditation & Senior High School (SHS) Vouchers / ESC
  // --------------------------------------------------------------------------
  const isDepedAccreditation = lower.includes('deped') || lower.includes('accredit') || lower.includes('recognized') || 
                               lower.includes('voucher') || lower.includes('esc') || lower.includes('shs voucher') || 
                               lower.includes('government recognition');
  if (isDepedAccreditation) {
    return `🏛️ **DepEd Recognition & AMI International Accreditation:**\n\n• **DepEd Recognition:** The Abba's Orchard School is fully recognized by the Philippine **Department of Education (DepEd)**, issuing official Form 137 / 138 report cards and SF9/SF10 documentation.\n• **AMI International Standard:** We are the first and largest school network in the Philippines recognized by the **Association Montessori Internationale (AMI)**, founded by Dr. Maria Montessori in Amsterdam.\n• **SHS Vouchers & ESC Subsidies:** Participating high school campus locations accept DepEd Senior High School (SHS) Voucher recipients and Educational Service Contracting (ESC) subsidies for qualified junior/senior high students.\n\nWhich specific grade level or campus would you like voucher details for?`;
  }

  // --------------------------------------------------------------------------
  // INTENT 7: School Calendar, Academic Year & Mid-Year Transfers
  // --------------------------------------------------------------------------
  const isCalendarTransfer = lower.includes('school year') || lower.includes('academic year') || lower.includes('calendar') || 
                             lower.includes('when do classes start') || lower.includes('start of classes') || lower.includes('mid-year') || 
                             lower.includes('midyear') || lower.includes('transferee') || lower.includes('open for enrollment');
  if (isCalendarTransfer) {
    return `📅 **Academic Calendar & Mid-Year Admissions at The Abba's Orchard:**\n\n• **Academic Year:** Our regular school year runs from **August through May/June**.\n• **Rolling Admissions for Toddler & Casa:** Because Montessori learning is individualized rather than lock-step group teaching, young children (Infant Community & Casa) may be enrolled throughout the year upon reaching developmental readiness.\n• **Mid-Year Transferees (Elementary & High School):** We accommodate transferees subject to slot availability in the prepared environment and submission of previous school records (Form 137).\n\nWhat grade level or child age are you looking to enroll for?`;
  }

  // --------------------------------------------------------------------------
  // INTENT 8: Uniforms & Dress Code
  // --------------------------------------------------------------------------
  const isUniform = lower.includes('uniform') || lower.includes('dress code') || lower.includes('what to wear') || lower.includes('clothes');
  if (isUniform) {
    return `👕 **Dress Code & Classroom Attire at The Abba's Orchard:**\n\n• **Daily Classroom Attire:** In our Infant Community, Casa, and Elementary environments, children wear comfortable, practical everyday clothes that encourage independence, movement, and self-toileting.\n• **Campus Polo Shirt:** Official Abba's Orchard polo shirts are worn during school gatherings, field trips, special community presentations, and formal academic functions.\n\nWould you like more information on classroom life or to book a morning walkthrough visit?`;
  }

  // --------------------------------------------------------------------------
  // INTENT 9: Food, Snacks & Nutrition Policy
  // --------------------------------------------------------------------------
  const isFoodNutrition = lower.includes('food') || lower.includes('lunch') || lower.includes('snack') || 
                          lower.includes('baon') || lower.includes('cafeteria') || lower.includes('canteen') || lower.includes('nutrition');
  if (isFoodNutrition) {
    return `🍎 **Wholesome Nutrition & Practical Life Dining Policy:**\n\n• **Healthy Food Policy:** We maintain a strict wholesome nutrition philosophy — ultra-processed junk food, candy, and sugary sodas are prohibited on campus.\n• **Practical Life Snack Preparation:** In Casa, snack time is an authentic learning exercise: children learn to wash hands, peel fruit, slice bananas with child-safe tools, set the table with real porcelain plates and glasses, and wash their own dishes after eating!\n\nWould you like to visit a classroom during morning work cycle to see this in practice at **${campusInfo.name}**?`;
  }

  // --------------------------------------------------------------------------
  // INTENT 10: Sibling Discounts & Multi-Child Terms
  // --------------------------------------------------------------------------
  const isSiblingFinancial = lower.includes('sibling') || lower.includes('discount for 2nd') || lower.includes('discount for second') || 
                             lower.includes('multiple children') || lower.includes('two kids') || lower.includes('family discount');
  if (isSiblingFinancial) {
    return `👨‍👩‍👧‍👦 **Sibling Discounts & Multi-Child Enrollment Privileges:**\n\nYes! The Abba's Orchard offers **sibling discount privileges** for families enrolling two or more children in our school system.\n\nOur Central Accounting desk under **Ms. Roxane** (**accounting@theabbasorchard.edu.ph**) will prepare a unified billing computation with flexible terms:\n• **Annual (Full Payment Discount)**\n• **Semi-Annual (2 Installments)**\n• **Quarterly (4 Installments)**\n\nCould you please share your **children's ages** so we can compute the customized family tuition schedule for your campus?`;
  }

  // --------------------------------------------------------------------------
  // INTENT 11: Montessori Philosophy & AMI Accreditation Differences
  // --------------------------------------------------------------------------
  const isAskingPhilosophy = lower.includes('what is montessori') || lower.includes('what is ami') || 
                             lower.includes('difference between') || lower.includes('different from traditional') || 
                             lower.includes('why montessori') || lower.includes('why abbas') || lower.includes('pedagogy');
  if (isAskingPhilosophy) {
    return `🌿 **The Authentic AMI Montessori Difference at The Abba's Orchard:**\n\nThe Abba's Orchard is the first and largest **Association Montessori Internationale (AMI)** school network in the Philippines, founded on Dr. Maria Montessori's authentic scientific pedagogy:\n\n1. **3-Hour Uninterrupted Work Cycles:** Rather than switching subjects every 45 minutes by bells, children have deep blocks of time to achieve profound concentration and mastery.\n2. **Multi-Age Classrooms (3-Year Planes):** Children learn in mixed-age communities (e.g. Casa 3–6, Elementary 6–12) where older children solidify knowledge by mentoring younger peers, and younger children are inspired by advanced work.\n3. **Scientifically Designed Hands-On Materials:** Abstract concepts in arithmetic, geometry, biology, and language are learned concretely through physical, self-correcting apparatus.\n4. **Cosmic Education & Moral Leadership:** Children understand how the universe, earth, and human societies interconnect, developing deep gratitude and environmental responsibility.\n\nWould you like to know more about a specific age level for your children, or schedule a campus observation visit?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Montessori Pedagogy Inquiry", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Inquiry on AMI Montessori philosophy and differences."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 12: Admissions Process & Requirements
  // --------------------------------------------------------------------------
  const isAskingAdmissionsProcess = lower.includes('how to enroll') || lower.includes('enrollment process') || 
                                   lower.includes('admission process') || lower.includes('requirements') || 
                                   lower.includes('how to apply') || lower.includes('step by step') || lower.includes('steps to apply');
  if (isAskingAdmissionsProcess) {
    return `🌿 **Step-by-Step Admissions Process at The Abba's Orchard:**\n\n1. 🔍 **Step 1: Morning Observation Walkthrough:**\n   Parents schedule a 30-45 minute morning observation to experience our authentic Montessori classroom work cycle in session.\n\n2. 📝 **Step 2: Directress Consultation & Child Readiness Observation:**\n   A relaxed developmental meeting between our Montessori Directress and your child to assess developmental placement.\n\n3. 📄 **Step 3: Document Submission:**\n   • PSA Birth Certificate copy\n   • Previous Report Cards / Form 137 (for transferees)\n   • 2x2 ID photos & completed Application Form\n\n4. 🎓 **Step 4: Reservation & Enrollment Confirmation:**\n   Settlement of reservation fee and selection of flexible payment schedule (Annual, Semi-Annual, or Quarterly) with our Central Accounting desk (**accounting@theabbasorchard.edu.ph**).\n\nWould you like to start with **Step 1** by reserving an observation walkthrough at **${campusInfo.name}**?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Admissions Steps Inquiry", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent asked for enrollment steps and requirements."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 13: School Hours, Schedule & Transportation
  // --------------------------------------------------------------------------
  const isAskingSchedule = lower.includes('school hours') || lower.includes('class hours') || 
                           lower.includes('what time') || lower.includes('bus') || lower.includes('transport') || lower.includes('shuttle');
  if (isAskingSchedule) {
    return `⏰ **Daily School Schedules & Transportation at The Abba's Orchard:**\n\n• 🍼 **Infant Community (14 mos – 3 yrs):** 8:00 AM – 11:00 AM (Morning Half-Day)\n• 🌸 **Casa dei Bambini (3 – 6 yrs):** 8:00 AM – 11:30 AM (Junior Casa) / 8:00 AM – 1:00 PM (Senior Casa/Kinder)\n• 🌍 **Elementary (6 – 12 yrs):** 8:00 AM – 2:30 PM (Monday to Friday)\n• 🌾 **Erdkinder Farm Boarding (12 – 18 yrs, Bukidnon):** Full-time adolescent boarding schedule integrating farm stewardship and academic micro-economy.\n\n*Transportation / Carpool:* Each campus coordinator can connect you with trusted parent carpools or accredited shuttle providers for your area.\n\nWhich campus location are you considering for your children?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "School Hours & Transport Inquiry", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent asked about class hours and transport."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 14: Coordinator / CADO Direct Connection Request
  // --------------------------------------------------------------------------
  const isCadoRequest = lower.includes('cado') || lower.includes('coordinator') || lower.includes('director') || 
                        lower.includes('contact person') || lower.includes('talk to') || lower.includes('speak with') || 
                        lower.includes('call me') || lower.includes('reach out');
  if (isCadoRequest && !capturedContact) {
    return `Certainly! Here is the direct contact information for the Campus Admissions & Development Officer (CADO) for **${campusInfo.name}**: 🌿\n\n• 📞 **Direct Line / Mobile:** **${campusInfo.phone}**\n• 📧 **Direct Coordinator Email:** **${campusInfo.email}**\n• ⏰ **Office Hours:** Monday to Friday, 8:00 AM – 4:00 PM\n\nIf you would like the coordinator to call or email you directly, please share your **name, phone number, and your children's ages**, and I will immediately dispatch a priority callback notification to the CADO desk!\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "CADO Coordinator Contact Request", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent requested CADO contact info."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 15: Walkthrough Booking & Contact Information Acknowledgment
  // --------------------------------------------------------------------------
  if (capturedContact || (hasTimePref && (historyText.includes('walkthrough') || historyText.includes('tour') || historyText.includes('contact') || historyText.includes('number')))) {
    const contactStr = capturedContact ? `**${capturedContact}**` : "your provided contact details";
    const timeStr = hasTimePref ? "weekday morning observation window (8:30 AM – 11:00 AM)" : "morning work cycle observation";

    if (isBisaya) {
      return `Daghang salamat! 🌿 Nalipay kaayo mi nga makadawat sa inyong detalye para sa observation walkthrough sa atong **${campusInfo.name}**.\n\nNalista na nako ang inyong appointment request:\n• 📍 **Campus:** ${campusInfo.name}\n• 📞 **Contact Number:** ${contactStr}\n• ⏰ **Preferred Schedule:** ${timeStr}\n• 📧 **Admissions Coordinator:** **${campusInfo.email}** | ${campusInfo.phone}\n\nTawagan o i-message kamo sa atong campus coordinator aron ma-confirm ang inyong visitor pass ug observation schedule.\n\nPila man ang **edad o ngalan sa inyong anak** aron maandam daan sa atong Montessori Guides ang classroom environment para sa inyong pagbisita?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Confirmed Walkthrough Booking Request (Bisaya)", "parentName": "${parentName}", "parentContact": "${capturedContact || 'Captured via Session'}", "details": "Parent requested walkthrough schedule: ${currentText}"} -->`;
    }

    if (isTagalog) {
      return `Maraming salamat po! 🌿 Ikinagagalak po naming matanggap ang inyong detalye para sa classroom observation walkthrough sa aming **${campusInfo.name}**.\n\nNaitala na po ang inyong appointment request:\n• 📍 **Campus:** ${campusInfo.name}\n• 📞 **Contact Number:** ${contactStr}\n• ⏰ **Preferred Schedule:** ${timeStr}\n• 📧 **Campus Coordinator:** **${campusInfo.email}** | ${campusInfo.phone}\n\nMakikipag-ugnayan po ang aming campus admissions coordinator sa inyo upang kumpirmahin ang inyong visitor pass at oras ng walkthrough.\n\nMay maitatanong po ba kami ukol sa **edad o pangalan ng inyong anak** para maihanda po ng aming Montessori directress ang classroom sa inyong pagdating?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Confirmed Walkthrough Booking Request (Tagalog)", "parentName": "${parentName}", "parentContact": "${capturedContact || 'Captured via Session'}", "details": "Parent requested walkthrough schedule: ${currentText}"} -->`;
    }

    return `Thank you so much! 🌿 We are delighted to receive your details for a classroom observation walkthrough at our **${campusInfo.name}**.\n\nI have registered your visit request with our admissions team:\n• 📍 **Target Campus:** ${campusInfo.name}\n• 📞 **Captured Contact Number:** ${contactStr}\n• ⏰ **Preferred Schedule:** ${timeStr}\n• 📧 **Designated Admissions Coordinator:** **${campusInfo.email}** | ${campusInfo.phone}\n\nOur campus coordinator has been notified and will reach out to you shortly to confirm your observation pass and provide walkthrough instructions.\n\nMay I also ask your **children's ages or names** so our Montessori Directress can prepare the appropriate prepared environments (Casa, Elementary, etc.) for your visit?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Confirmed Walkthrough Booking Request", "parentName": "${parentName}", "parentContact": "${capturedContact || 'Captured via Session'}", "details": "Parent booked walkthrough: ${currentText}"} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 7: Smart Child Age & Plane Analysis (Supports Multi-Child & Exact Ages)
  // --------------------------------------------------------------------------
  const ageAnalysis = analyzeAgesAndPlanes(currentText);

  // Scenario A: MULTIPLE CHILDREN / MULTIPLE PLANES (e.g. 5yo and 11yo)
  if (ageAnalysis.planes.length >= 2) {
    let multiResponse = `Wonderful! That is a fantastic combination of developmental planes for your family: 🌱\n\n`;
    ageAnalysis.planes.forEach((plane, idx) => {
      multiResponse += `${idx + 1}. 🌿 **For your ${plane.ageLabel} (${plane.name}):**\n${plane.description}\n\n`;
    });
    multiResponse += `Would you like to schedule a weekday morning observation walkthrough at **${campusInfo.name}** to observe both environments, or would you like to receive the admissions checklist and tuition schedule for these levels?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Multi-Child Admissions Consultation", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent inquired for children ages: ${ageAnalysis.detectedAges.join(', ')}"} -->`;
    return multiResponse;
  }

  // Scenario B: SINGLE CHILD PLANE
  if (ageAnalysis.planes.length === 1) {
    const p = ageAnalysis.planes[0];
    if (p.id === 'casa') {
      return `Wonderful! For your **${p.ageLabel}** child, our authentic **Casa dei Bambini (Pre-School & Kindergarten — Ages 3 to 6)** is a golden stage of self-directed growth:\n• **Practical Life:** Concentration, independence, coordination, and care of environment\n• **Sensorial:** Refining the senses as the foundation for mathematical and scientific exploration\n• **Mathematics:** Hands-on concrete bead materials leading effortlessly to arithmetic\n• **Language & Phonics:** Reading fluency, word exploration, and self-expression\n\nWould you like to schedule a morning observation walkthrough at **${campusInfo.name}** or request the Casa admissions schedule?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Casa dei Bambini Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Child age: Casa dei Bambini (${p.ageLabel})"} -->`;
    }
    if (p.id === 'elem') {
      return `Fantastic! For your **${p.ageLabel}** child, our **Elementary Program (Ages 6 to 12 / Lower & Upper Elementary)** provides Dr. Maria Montessori's **Cosmic Education**:\n• Collaborative scientific research, historical timelines, and critical thinking\n• Interconnected curriculum: Science, History, Geography, Advanced Mathematics, and Literature\n• Developing moral responsibility, empathy, peer collaboration, and moral leadership\n\nWould you like us to connect you with the Elementary Coordinator at **${campusInfo.name}** for a classroom observation walkthrough?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Elementary Program Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Child age: Elementary (${p.ageLabel})"} -->`;
    }
    if (p.id === 'infant') {
      return `Wonderful! For your **${p.ageLabel}** child, our **Infant Community (Toddler Environment — 14 mos to 3 yrs)** nurtures:\n• Functional independence and self-care routines\n• Coordinated movement and fine motor refinement\n• Expressive language acquisition in a peaceful, prepared setting\n\nWould you like to schedule a morning walkthrough at **${campusInfo.name}** or receive the Infant Community schedule?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Infant Community Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Child age: Toddler / Infant Community (${p.ageLabel})"} -->`;
    }
    if (p.id === 'erdkinder') {
      return `For your **${p.ageLabel}** adolescent student (ages 12 to 18 / Junior & Senior High), our flagship **Erdkinder Farm Boarding Campus** at **Bukidnon La Granja Estates** offers a transformative experience:\n• Organic agriculture, land stewardship, animal husbandry, and student-run micro-economy\n• High academic rigor integrated with real-world land management\n• Boarding community fostering deep maturity, self-reliance, and collaborative governance\n\nWould you like to receive the Adolescent Farm Boarding admissions packet or schedule a campus visit in Bukidnon?\n<!-- DISPATCH: {"campus": "Bukidnon - La Granja Estates", "to": "lagranja@theabbasorchard.edu.ph", "subject": "Erdkinder Farm Boarding Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Inquiry on adolescent farm boarding (${p.ageLabel})."} -->`;
    }
  }

  // --------------------------------------------------------------------------
  // INTENT 8: Explicit Booking Request (e.g. "I want to book", "Schedule my visit")
  // --------------------------------------------------------------------------
  const isBookingAction = (lower.includes('book') || lower.includes('schedule') || lower.includes('reserve') || 
                          lower.includes('gusto ko mag-visit') || lower.includes('mag-tour') || lower.includes('i want to visit') ||
                          lower.includes('sign me up') || lower.includes('set an appointment')) && 
                          !lower.includes('what is') && !lower.includes('ano') && !lower.includes('unsa');
  if (isBookingAction) {
    if (isBisaya) {
      return `🌿 **Pag-schedule og Observation Walkthrough sa The Abba's Orchard:**\nAng labing maayong paagi aron makita ang Authentic Montessori mao ang pag-obserba sa tinuod nga morning work cycle (kasagaran 8:30 AM hangtod 11:00 AM sa mga adlaw nga Lunes hangtod Biyernes).\n\nPalihug i-share kanamo ang inyong:\n1. 📍 **Target Campus** (sama sa CDO Alwana, Davao, Bukidnon, Cebu, Manila)\n2. ⏰ **Gusto nga weekday morning**\n3. 📞 **Contact Number**\n\narron ma-forward namo sa campus admissions coordinator para sa inyong observation pass!\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Walkthrough Schedule Inquiry (Bisaya)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent asked to book a tour."} -->`;
    }
    return `🌿 **Scheduling a Montessori Campus Observation Walkthrough:**\nObserving an authentic AMI Montessori environment during our morning work cycle (8:30 AM – 11:00 AM, Monday to Friday) is the best way to experience True Montessori® in action.\n\nPlease share your:\n1. 📍 **Preferred Campus** (e.g. ${campusInfo.name})\n2. ⏰ **Preferred Weekday Morning**\n3. 📞 **Contact Number**\n\nand our admissions coordinator will immediately prepare your visitor pass and welcome packet!\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "${campusInfo.email}", "subject": "Walkthrough Booking Request", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent asked to book walkthrough schedule."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 9: Tuition & Payment Inquiries
  // --------------------------------------------------------------------------
  const isTuition = lower.includes('tuition') || lower.includes('fee') || lower.includes('pila') || lower.includes('tagpila') || lower.includes('magkano') || lower.includes('cost') || lower.includes('payment') || lower.includes('installment');
  if (isTuition) {
    if (isBisaya) {
      return `Maayong adlaw! Mahitungod sa **Tuition & Flexible Payment Terms** sa The Abba's Orchard: 🌱\n\nAng admissions office nag-offer ug flexible payment terms:\n• **Annual (Full Payment)**\n• **Semi-Annual (2 Installments)**\n• **Quarterly (4 Installments)**\n\nGipasa na nako ang inyong inquiry ngadto sa admissions desk sa **${campusInfo.name}** ug sa accounting desk ni Ms. Roxane (**accounting@theabbasorchard.edu.ph**).\n\nPila ang **edad sa inyong anak** aron ma-send namo ang exact schedule of fees para sa inyong campus?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Request (Bisaya)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent requested tuition fee schedule."} -->`;
    }
    if (isTagalog) {
      return `Magandang araw po! Tungkol po sa **Tuition at Payment Options** sa The Abba's Orchard: 🌱\n\nNag-aalok po ang aming admissions office ng flexible payment schedules:\n• **Annual (Isahang Bayad)**\n• **Semi-Annual (2 Hulog)**\n• **Quarterly (4 na Hulog)**\n\nNa-forward na po ang inyong inquiry sa campus coordinator ng **${campusInfo.name}** at sa accounting desk ni Ms. Roxane (**accounting@theabbasorchard.edu.ph**).\n\nIlang taon na po ang inyong anak para ma-send po namin ang saktong breakdown ng fees?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Request (Tagalog)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent requested tuition fee breakdown."} -->`;
    }
    return `Regarding tuition and fees at **The Abba's Orchard School**, we offer flexible payment plans:\n• **Annual Plan (Full Payment)**\n• **Semi-Annual Plan (2 Installments)**\n• **Quarterly Plan (4 Installments)**\n\nI have forwarded your inquiry directly to our coordinator at **${campusInfo.name}** and Ms. Roxane at our central accounting desk (**accounting@theabbasorchard.edu.ph**).\n\nCould you please share your **children's ages** so we can provide the exact schedule of fees for their developmental levels?\n<!-- DISPATCH: {"campus": "${campusInfo.name}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Breakdown Request", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent requested tuition breakdown."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 10: Specific Campus Mentions & Quick-Select Clicks
  // --------------------------------------------------------------------------
  const isDavao = lower.includes('davao') || lower.includes('obrero') || lower.includes('mandug');
  const isBukidnon = lower.includes('bukidnon') || lower.includes('granja') || lower.includes('erdkinder') || lower.includes('farm') || lower.includes('baungon');
  const isCdo = lower.includes('alwana') || lower.includes('cdo') || lower.includes('cagayan');
  const isCebu = lower.includes('cebu') || lower.includes('magsaysay') || lower.includes('tandang sora');
  const isIloilo = lower.includes('iloilo') || lower.includes('barbara');
  const isBgc = lower.includes('mckinley') || (lower.includes('bgc') && !lower.includes('bayani'));
  const isBayani = lower.includes('bayani');
  const isAlabang = lower.includes('alabang') || lower.includes('filinvest') || lower.includes('muntinlupa');
  const isGreenhills = lower.includes('greenhills') || lower.includes('mandaluyong');
  const isAntipolo = lower.includes('antipolo') || lower.includes('taktak');
  const isQc = lower.includes('calle industria') || lower.includes('bridgetowne') || lower.includes('quezon city');
  const isLaguna = lower.includes('carmelray') || lower.includes('canlubang') || lower.includes('laguna');

  if (isDavao) {
    if (isBisaya) {
      return `Nalipay mi sa inyong interes sa atong **Davao City Campuses**! 🌱\n\nSa Davao, naa tay duha ka prepared environments para sa inyong anak:\n1. **Obrero Campus:** Infant Community (14 mos–3 yrs), Casa (3–6 yrs), ug Lower & Upper Elementary (6–12 yrs).\n2. **Mandug Campus:** Elementary ug Erdkinder Adolescent farm programs.\n\n📍 *Address:* Loyola St., Bo. Obrero / Mandug, Davao City\n📞 *Direct Line:* (0917) 707 2669\n📧 *Campus Coordinator:* **davao@theabbasorchard.edu.ph**\n\nPila man ang edad sa inyong anak karon, o gusto ba mo mag-schedule og observation tour sa Davao campus?\n<!-- DISPATCH: {"campus": "Davao City - Obrero & Mandug", "to": "davao@theabbasorchard.edu.ph", "subject": "Davao Campus Admissions Inquiry (Bisaya)", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Davao campuses."} -->`;
    }
    return `We are delighted by your interest in our **Davao City Campuses**! 🌱\n\nIn Davao City, we operate two authentic Montessori prepared environments:\n1. **Obrero Campus:** Infant Community (14 mos – 3 yrs), Casa dei Bambini (3 – 6 yrs), and Lower & Upper Elementary (6 – 12 yrs).\n2. **Mandug Campus:** Elementary and Erdkinder Adolescent environments.\n\n📍 *Address:* Loyola St., Bo. Obrero / Mandug, Davao City\n📞 *Direct Line:* (0917) 707 2669\n📧 *Campus Coordinator:* **davao@theabbasorchard.edu.ph**\n\nHow old is your child, or would you like me to connect you with our Davao admissions coordinator to book a morning observation walkthrough?\n<!-- DISPATCH: {"campus": "Davao City - Obrero & Mandug", "to": "davao@theabbasorchard.edu.ph", "subject": "Davao Campus Admissions Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Davao City campuses."} -->`;
  }

  if (isCdo) {
    if (isBisaya) {
      return `Maayong adlaw! Ang atong **Cagayan de Oro — Alwana Campus** nagtanyag sa authentic AMI Montessori environments: 🌱\n• **Infant Community:** 14 mos – 3 yrs\n• **Casa dei Bambini:** 3 – 6 yrs\n• **Elementary:** 6 – 12 yrs\n\n📍 *Address:* Alwana Business Park, Cugman, Cagayan de Oro City\n📞 *Direct Line:* (0917) 707 2668\n📧 *Email:* **alwana@theabbasorchard.edu.ph**\n\nPila man ang edad sa inyong anak, o gusto ba ninyo mag-schedule og weekday morning classroom observation walkthrough sa Alwana?\n<!-- DISPATCH: {"campus": "Cagayan de Oro - Alwana", "to": "alwana@theabbasorchard.edu.ph", "subject": "CDO Alwana Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on CDO Alwana campus."} -->`;
    }
    return `Our **Cagayan de Oro — Alwana Campus** offers authentic AMI Montessori environments:\n• **Infant Community:** 14 mos – 3 yrs\n• **Casa dei Bambini:** 3 – 6 yrs\n• **Elementary:** 6 – 12 yrs\n\n📍 *Address:* Alwana Business Park, Cugman, Cagayan de Oro City\n📞 *Direct Line:* (0917) 707 2668\n📧 *Coordinator:* **alwana@theabbasorchard.edu.ph**\n\nHow old is your child, or would you like to schedule a morning Montessori observation walkthrough at our Alwana campus?\n<!-- DISPATCH: {"campus": "Cagayan de Oro - Alwana", "to": "alwana@theabbasorchard.edu.ph", "subject": "CDO Alwana Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on CDO Alwana campus."} -->`;
  }

  if (isBukidnon) {
    return `🌾 **The Abba's Orchard Bukidnon — La Granja Estates:**\nLa Granja is our flagship **Erdkinder Farm Boarding Campus** in Baungon, Bukidnon. Combining Dr. Maria Montessori's adolescent pedagogy with academic rigor, organic agriculture, animal stewardship, and community living.\n\n**Programs Offered:**\n• Infant Community (14 mos – 3 yrs)\n• Casa (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n• Erdkinder Adolescent Boarding (12 – 18 yrs / Junior & Senior High)\n\n📍 *Address:* La Granja Estates, Pualas, Baungon, Bukidnon\n📞 *Direct Line:* (0917) 508 2668\n📧 *Coordinator:* **lagranja@theabbasorchard.edu.ph**\n\nWould you like to schedule a weekend farm tour or receive the adolescent boarding admissions checklist?\n<!-- DISPATCH: {"campus": "Bukidnon - La Granja Estates", "to": "lagranja@theabbasorchard.edu.ph", "subject": "Bukidnon Farm Boarding Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Bukidnon La Granja farm boarding."} -->`;
  }

  if (isCebu) {
    return `🌴 **The Abba's Orchard — Cebu Campuses (Magsaysay & Tandang Sora):**\nOur Cebu flagship campus provides authentic AMI Montessori environments:\n• Infant Community (14 mos – 3 yrs)\n• Casa dei Bambini (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n\n📍 *Address:* Magsaysay St. / Tandang Sora, Cebu City\n📞 *Direct Line:* (0917) 321 2668\n📧 *Campus Coordinator:* **cebu@theabbasorchard.edu.ph**\n\nWould you like to schedule a morning Montessori observation walkthrough at our Cebu campus?\n<!-- DISPATCH: {"campus": "Cebu City - Magsaysay & Tandang Sora", "to": "cebu@theabbasorchard.edu.ph", "subject": "Cebu Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Cebu campuses."} -->`;
  }

  if (isIloilo) {
    return `🌴 **The Abba's Orchard — Iloilo Campus (Sta. Barbara Heights):**\nOur Western Visayas campus offers complete AMI Montessori environments:\n• Casa dei Bambini (3 – 6 yrs)\n• Lower & Upper Elementary (6 – 12 yrs)\n\n📍 *Address:* Sta. Barbara Heights, Iloilo\n📞 *Direct Line:* (0917) 322 2668\n📧 *Campus Coordinator:* **iloilo@theabbasorchard.edu.ph**\n\nHow old is your child, and would you like to schedule an observation walkthrough in Iloilo?\n<!-- DISPATCH: {"campus": "Iloilo - Sta. Barbara Heights", "to": "iloilo@theabbasorchard.edu.ph", "subject": "Iloilo Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Iloilo campus."} -->`;
  }

  if (isBgc) {
    return `🏙️ **The Abba's Orchard — Taguig BGC McKinley Hill Campus:**\nLocated in McKinley Hill, Fort Bonifacio, Taguig City:\n• Infant Community (14 mos – 3 yrs)\n• Casa dei Bambini (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n\n📍 *Address:* McKinley Hill, Fort Bonifacio, Taguig City\n📞 *Direct Line:* (0917) 854 2668\n📧 *Campus Coordinator:* **mckinleyhill@theabbasorchard.edu.ph**\n\nWould you like to book a weekday morning classroom observation walkthrough at BGC McKinley Hill?\n<!-- DISPATCH: {"campus": "Taguig - BGC McKinley Hill", "to": "mckinleyhill@theabbasorchard.edu.ph", "subject": "BGC McKinley Hill Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on BGC McKinley Hill campus."} -->`;
  }

  if (isBayani) {
    return `🏙️ **The Abba's Orchard — Taguig Bayani Road Campus:**\nConveniently located along Bayani Road, AFPOVAI, Taguig City:\n• Casa dei Bambini (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n\n📍 *Address:* Bayani Road, AFPOVAI Phase 4, Taguig City\n📞 *Direct Line:* (0917) 854 2669\n📧 *Campus Coordinator:* **bayani@theabbasorchard.edu.ph**\n\nHow old is your child, or would you like to visit our Bayani Road campus for an observation tour?\n<!-- DISPATCH: {"campus": "Taguig - Bayani Road", "to": "bayani@theabbasorchard.edu.ph", "subject": "Taguig Bayani Road Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Bayani Road campus."} -->`;
  }

  if (isAlabang) {
    return `🏙️ **The Abba's Orchard — Muntinlupa Alabang Campus (Filinvest City):**\nServing southern Metro Manila in Filinvest City, Alabang:\n• Infant Community (14 mos – 3 yrs)\n• Casa dei Bambini (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n\n📍 *Address:* Civic Prime Bldg, Filinvest City, Alabang, Muntinlupa\n📞 *Direct Line:* (0917) 855 2668\n📧 *Campus Coordinator:* **alabang@theabbasorchard.edu.ph**\n\nWould you like us to schedule a morning classroom observation walkthrough at Alabang?\n<!-- DISPATCH: {"campus": "Muntinlupa - Alabang", "to": "alabang@theabbasorchard.edu.ph", "subject": "Alabang Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Alabang campus."} -->`;
  }

  if (isGreenhills) {
    return `🏙️ **The Abba's Orchard — Mandaluyong Greenhills Campus:**\nConveniently located near Greenhills / Wack-Wack, Mandaluyong:\n• Infant Community (14 mos – 3 yrs)\n• Casa dei Bambini (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n\n📍 *Address:* Ortigas Ave / Greenhills area, Mandaluyong City\n📞 *Direct Line:* (0917) 856 2668\n📧 *Campus Coordinator:* **greenhills@theabbasorchard.edu.ph**\n\nHow old is your child, and would you like to receive the Greenhills admissions schedule?\n<!-- DISPATCH: {"campus": "Mandaluyong - Greenhills", "to": "greenhills@theabbasorchard.edu.ph", "subject": "Greenhills Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Greenhills campus."} -->`;
  }

  if (isAntipolo) {
    return `🌿 **The Abba's Orchard — Antipolo City Campus (Taktak Road):**\nSurrounded by nature along Taktak Road, Antipolo City:\n• Infant Community (14 mos – 3 yrs)\n• Casa dei Bambini (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n\n📍 *Address:* Daang Bakal / Taktak Road, Antipolo City\n📞 *Direct Line:* (0917) 857 2668\n📧 *Campus Coordinator:* **antipolo@theabbasorchard.edu.ph**\n\nWould you like to book a weekday morning observation walkthrough at our Antipolo campus?\n<!-- DISPATCH: {"campus": "Antipolo City - Taktak Road", "to": "antipolo@theabbasorchard.edu.ph", "subject": "Antipolo Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Antipolo campus."} -->`;
  }

  if (isQc) {
    return `🏙️ **The Abba's Orchard — Quezon City Campus (Calle Industria / Bridgetowne):**\nLocated at Bridgetowne / Calle Industria, Quezon City:\n• Infant Community (14 mos – 3 yrs)\n• Casa dei Bambini (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n\n📍 *Address:* Calle Industria, Bagumbayan (near Bridgetowne), Quezon City\n📞 *Direct Line:* (0917) 858 2668\n📧 *Campus Coordinator:* **calleindustria@theabbasorchard.edu.ph**\n\nHow old is your child, and would you like to schedule a morning walkthrough in Quezon City?\n<!-- DISPATCH: {"campus": "Quezon City - Calle Industria", "to": "calleindustria@theabbasorchard.edu.ph", "subject": "Quezon City Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on QC Calle Industria campus."} -->`;
  }

  if (isLaguna) {
    return `🌿 **The Abba's Orchard — Laguna Campus (Carmelray Canlubang):**\nLocated in Carmelray Industrial Park, Canlubang, Laguna:\n• Casa dei Bambini (3 – 6 yrs)\n• Elementary (6 – 12 yrs)\n\n📍 *Address:* Carmelray Industrial Park 1, Canlubang, Calamba, Laguna\n📞 *Direct Line:* (0917) 859 2668\n📧 *Campus Coordinator:* **carmelray@theabbasorchard.edu.ph**\n\nWould you like to schedule a morning Montessori walkthrough at Carmelray Laguna?\n<!-- DISPATCH: {"campus": "Canlubang - Carmelray Laguna", "to": "carmelray@theabbasorchard.edu.ph", "subject": "Laguna Campus Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on Laguna Carmelray campus."} -->`;
  }

  // --------------------------------------------------------------------------
  // INTENT 11: Programs Overview
  // --------------------------------------------------------------------------
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
