require('dotenv').config();

async function fetchData(prompt) {
  const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const response = await fetch('https://api.openai.com/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 5,
      n: 1,
      stop: '\n'
    })
  });
  const data = await response.json();
  console.log(data.choices[0].text);
}
