const axios = require('axios');

// Official Multi-Campus Directory & System Prompt
const ABBAS_SYSTEM_PROMPT = `
You are the official 24/7 AI Admissions Digital Employee for "The Abba's Orchard School", the premier and first Association Montessori Internationale (AMI) school network in the Philippines.

Key Leadership & Heritage:
- Founded by Dr. Maria Angelica "Teacher Ann" Paez-Barrameda and Mr. Christopher "Mr. Chris" Barrameda.
- Over 15 campuses nationwide across Luzon, Visayas, and Mindanao.
- Curriculum: Authentic AMI Montessori across Infant Community (14 mos - 3 yrs), Casa (3 - 6 yrs), Elementary (6 - 12 yrs), and Erdkinder Adolescent Farm Boarding (12 - 18 yrs / Junior & Senior High).
- Bukidnon La Granja Estates (Baungon, Bukidnon): Premier farm boarding campus combining Montessori land-based micro-economy, agriculture, animal stewardship, and academic rigor.

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
      rawResponse = generateFallbackResponse(userMessage, preferredCampus);
    }

  } else if (provider === 'openai' && openaiKey) {
    try {
      const messages = [
        { role: 'system', content: ABBAS_SYSTEM_PROMPT },
        ...conversationHistory.map(msg => ({
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

      rawResponse = res.data?.choices?.[0]?.message?.content || generateFallbackResponse(userMessage, preferredCampus);
    } catch (e) {
      console.warn("OpenAI call failed, using fallback:", e.message);
      rawResponse = generateFallbackResponse(userMessage, preferredCampus);
    }

  } else {
    rawResponse = generateFallbackResponse(userMessage, preferredCampus);
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

function generateFallbackResponse(userMessage, preferredCampus) {
  const lower = (userMessage || '').toLowerCase();
  const campus = preferredCampus || 'Bukidnon - La Granja Estates';

  if (lower.includes('grade') || lower.includes('level') || lower.includes('offer') || lower.includes('program') || lower.includes('curriculum')) {
    return `At **The Abba's Orchard School**, we follow authentic Association Montessori Internationale (AMI) pedagogical planes of development from infancy through adolescence:

1. **Infant Community (14 months – 3 years):** Toddler environment fostering functional independence, language acquisition, and coordinated movement.
2. **Casa dei Bambini (3 – 6 years / Pre-School & Kindergarten):** Practical Life, Sensorial, Language, Mathematics, and Cultural subjects.
3. **Elementary (6 – 12 years / Lower & Upper Elementary):** Cosmic Education fostering collaborative research, moral development, critical thinking, and broad intellectual curiosity.
4. **Erdkinder Adolescent Program (12 – 18 years / Junior & Senior High):** Offered at our Bukidnon La Granja farm campus with boarding, combining academic rigor with real-world land stewardship and student-run micro-economies.

Which grade level or campus are you inquiring about for your child?
<!-- DISPATCH: {"campus": "${campus}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "Grade Levels & Programs Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquiry on offered grade levels."} -->`;
  }

  return `Welcome to The Abba's Orchard School! Discover True Montessori®. We offer programs across 15+ campuses in Luzon, Visayas, and Mindanao (including Erdkinder farm boarding at Bukidnon La Granja). How may we assist your family today?
<!-- DISPATCH: {"campus": "${campus}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "Admissions Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Parent asked: ${userMessage}"} -->`;
}

module.exports = {
  generateAIResponse,
  ABBAS_SYSTEM_PROMPT
};
