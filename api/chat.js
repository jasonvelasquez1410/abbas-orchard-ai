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
        rawResponse = generateFallbackMontessoriResponse(message, campus);
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
        rawResponse = apiRes.data?.choices?.[0]?.message?.content || generateFallbackMontessoriResponse(message, campus);
      } catch (openAiErr) {
        console.warn("OpenAI call failed, using built-in engine:", openAiErr.message);
        rawResponse = generateFallbackMontessoriResponse(message, campus);
      }

    } else {
      rawResponse = generateFallbackMontessoriResponse(message, campus);
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
    const fallbackText = generateFallbackMontessoriResponse(req.body?.message || '', req.body?.campus || null);
    return res.status(200).json({
      reply: fallbackText,
      dispatch: null
    });
  }
};

function generateFallbackMontessoriResponse(message, campusName) {
  const lower = (message || '').toLowerCase();
  const campus = campusName || 'Bukidnon - La Granja Estates';
  
  if (lower.includes('grade') || lower.includes('level') || lower.includes('program') || lower.includes('age') || lower.includes('offer')) {
    return `At **The Abba's Orchard School**, we follow authentic Association Montessori Internationale (AMI) pedagogical planes of development from infancy through adolescence:

1. **Infant Community (14 months – 3 years):** Fosters functional independence, language acquisition, and coordinated movement in a nurturing toddler environment.
2. **Casa dei Bambini (3 – 6 years / Pre-School & Kindergarten):** Hands-on learning across Practical Life, Sensorial, Language, Mathematics, and Cultural subjects.
3. **Elementary (6 – 12 years / Lower & Upper Elementary):** Cosmic Education fostering collaborative research, moral development, critical thinking, and broad intellectual curiosity.
4. **Erdkinder Adolescent Program (12 – 18 years / Junior & Senior High):** Offered at our Bukidnon La Granja farm campus with boarding, combining academic rigor with real-world land stewardship and student-run micro-economies.

Which grade level or campus are you inquiring about for your child?
<!-- DISPATCH: {"campus": "${campus}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "Admissions Query - Grade Levels & Programs", "parentName": "Prospective Parent", "parentContact": "Captured via AI Assistant", "details": "Inquired about offered grade levels and AMI Montessori programs."} -->`;
  }

  if (lower.includes('farm') || lower.includes('granja') || lower.includes('erdkinder') || lower.includes('bukidnon')) {
    return `🌾 **The Abba's Orchard Bukidnon — La Granja Estates:**
La Granja is our premier **Erdkinder Farm Campus** located in Baungon, Bukidnon. Rooted in Dr. Maria Montessori's vision for adolescents, our Erdkinder program combines academic rigor with practical land stewardship, animal husbandry, economics, and community boarding.

**Programs Offered at La Granja:**
• Infant Community (14 mos – 3 yrs)
• Casa (3 – 6 yrs)
• Elementary (6 – 12 yrs)
• Erdkinder Adolescent Boarding (12 – 18 yrs / Junior & Senior High)

📍 *Address:* La Granja Estates, Pualas, Baungon, Bukidnon
📞 *Direct Line:* (0917) 508 2668
📧 *Campus Coordinator:* lagranja@theabbasorchard.edu.ph

Would you like to schedule a weekend farm tour or receive the adolescent boarding admissions checklist?
<!-- DISPATCH: {"campus": "Bukidnon - La Granja Estates", "to": "lagranja@theabbasorchard.edu.ph", "subject": "Bukidnon La Granja Farm & Boarding Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Inquiry on Bukidnon La Granja Erdkinder farm and adolescent dormitory boarding."} -->`;
  }

  if (lower.includes('pila') || lower.includes('tagpila') || lower.includes('tuition') || lower.includes('fee') || lower.includes('payment') || lower.includes('cost')) {
    return `Maayong adlaw! Daghang salamat sa pag-inquire sa **The Abba's Orchard School**. 🌱

Regarding tuition fees, our admissions office offers flexible payment schedules:
• **Annual (Full Payment)**
• **Semi-Annual (2 Installments)**
• **Quarterly (4 Installments)**

To provide the exact schedule of fees for your target campus, I have routed your details to our campus admissions coordinator and Roxane at our central accounting desk (accounting@theabbasorchard.edu.ph).

Could you please share your child's age and target entry grade level so we can send the exact fee breakdown?
<!-- DISPATCH: {"campus": "${campus}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Schedule & Payment Breakdown Request", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent requested tuition fee schedule and payment plans."} -->`;
  }

  return `Thank you for contacting **The Abba's Orchard School**, the premier Association Montessori Internationale (AMI) school network in the Philippines. 🌿

We operate 15+ campuses nationwide across Luzon, Visayas, and Mindanao, offering complete Montessori environments from Infant Community (14 mos) through Casa, Elementary, and Erdkinder farm boarding (12–18 yrs).

How may I assist you today? You may ask about our campus locations, admissions requirements, tuition payment plans, or booking a weekday morning classroom observation.
<!-- DISPATCH: {"campus": "${campus}", "to": "admission_application@theabbasorchard.edu.ph", "subject": "General Admissions Inquiry", "parentName": "Prospective Parent", "parentContact": "Captured via AI Session", "details": "Parent asked: ${message}"} -->`;
}
