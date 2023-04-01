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
      "model" : "gpt-3.5-turbo",
      "messages" :[
      {
        "role": "assistant",
        "content" : prompt
      }
      ],
      "temperature": 1,
      "top_p": 1,
      "n": 1,
      "stream": false,
      "max_tokens": 250,
      "presence_penalty": 0,
      "frequency_penalty": 0
    })
  });
  const data = await response.json();
  
  return data;
}

const fetchImg = async (prompt) => {
  try {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const response = await fetch(`https://api.openai.com/v1/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        "model": "image-alpha-001",
        "prompt": prompt,
        "num_images": 1,
        "size": "1024x1024",
        "response_format": "url"
      })
    });
    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.log(error);
  }
};
