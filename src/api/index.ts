interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    message: Message
    logprobs: null
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

const API_KEY = import.meta.env.VITE_API_KEY
const MODEL_ID = import.meta.env.VITE_MODEL_ID

export async function sendMessage(messages: Message[]) {
  const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL_ID,
      messages: messages
    })
  })

  if (!response.ok) {
    throw new Error('API request failed')
  }

  const data: ChatCompletionResponse = await response.json()
  return data.choices[0].message.content
} 