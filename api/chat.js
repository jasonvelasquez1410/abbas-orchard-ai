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

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
      const apiRes = await axios.post(url, {
        system_instruction: { parts: [{ text: ABBAS_SYSTEM_PROMPT }] },
        contents: contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 800
        }
      });
      rawResponse = apiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Thank you for contacting The Abba's Orchard School.";

    } else if (provider === 'openai' && openaiKey) {
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
        }
      });
      rawResponse = apiRes.data?.choices?.[0]?.message?.content || "Thank you for contacting The Abba's Orchard School.";

    } else {
      rawResponse = "Welcome to The Abba's Orchard School! Discover True Montessori®. Inquire anytime regarding our 15+ campuses in Luzon, Visayas, and Mindanao (including Erdkinder farm boarding at Bukidnon La Granja).";
    }

    let cleanText = rawResponse;
    let dispatchData = null;
    const dispatchMatch = rawResponse.match(/<!--\s*DISPATCH:\s*(\{.*?\})\s*-->/s);

    if (dispatchMatch) {
      cleanText = rawResponse.replace(dispatchMatch[0], '').trim();
      try {
        dispatchData = JSON.parse(dispatchMatch[1]);
      } catch (e) {}
    }

    return res.status(200).json({
      reply: cleanText,
      dispatch: dispatchData
    });

  } catch (err) {
    console.error('Vercel API Chat Error:', err.response?.data || err.message);
    return res.status(500).json({ error: 'AI processing failed', details: err.message });
  }
};
