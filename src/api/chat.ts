import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { ChatResponse } from '../types/chat'
import ChatMessage from '@/components/ChatMessage.vue'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
  }
})

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
//   try {
//     const response: AxiosResponse<ChatResponse> = await api.post('/chat', {
//       message
//     })
//     return response.data
//   } catch (error) {
//     throw error
//   }
    const response: ChatResponse = {
        message: "啊对对对",
        status: 11
    }
    return response
} 