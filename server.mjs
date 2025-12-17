import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/ask', async (req, res) => {
  const { query } = req.body;
  if(!query) return res.status(400).json({ error: "Query missing" });

  try {
    const prompt = `आप एक हिंदू धार्मिक AI सहायक हैं। 
देवता या त्योहार के लिए प्रार्थना, चालीसा, आरती, पूजा विधि, प्रमुख स्तोत्र का विवरण दें। 
JSON में format करें: 
{
  "prarthana": "...",
  "chalisa": "...",
  "aarti": "...",
  "pooja": "...",
  "stotra": "..."
}
Query: ${query}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const text = completion.choices[0].message.content;

    // JSON parse
    let data;
    try { data = JSON.parse(text); } catch { data = { error: "AI response parsing failed", raw: text }; }

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
