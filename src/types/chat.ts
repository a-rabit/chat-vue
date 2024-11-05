export interface Message {
  role: 'user' | 'assistant'
  content: string
  id: string
}

export interface ChatResponse {
  message: string
  status: number
} 