import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { ChatResponse } from '../types/chat'
import ChatMessage from '@/components/ChatMessage.vue'

const api: AxiosInstance = axios.create({
  baseURL: '/api/v3',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
  }
})

interface ChatCompletionResponse {
    choices: [{
      message: {
        content: string
      }
    }]
  }
  export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
    try {
      const response: AxiosResponse<ChatCompletionResponse> = await api.post('/chat/completions', {
        model: import.meta.env.VITE_MODEL_ID,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
  
      return {
        message: response.data.choices[0].message.content,
        status: 0  // 假设 0 表示成功状态
      }
    } catch (error) {
      console.error('API 调用失败:', error)
      return {
        message: '抱歉，发生了错误',
        status: 1  // 错误状态
      }
    }
  }