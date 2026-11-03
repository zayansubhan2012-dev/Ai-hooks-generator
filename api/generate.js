export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { prompt } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3-8b-instruct:free",
        "messages": [
          { "role": "system", "content": "You are a viral X/Twitter hook expert. Output 3 killer hooks for the user prompt." },
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();
    const output = data.choices[0].message.content;
    res.status(200).json({ result: output });
  } catch (error) {
    res.status(500).json({ error: 'API Error' });
  }
}