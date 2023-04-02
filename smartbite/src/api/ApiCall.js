export const fetchData = async(prompt) => {
  try{
  const openaiApiKey = "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";
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
      "max_tokens": 3000,
      "presence_penalty": 0,
      "frequency_penalty": 0
    })
  });
  const data = await response.json();
  return data;
  }catch (error){
    console.log(error);
  }
};

const fetchImg = async (prompt) => {
  try {
    const apiKey = "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";
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
    return data;
  } catch (error) {
    console.log(error);
  }
};
export{fetchImg}