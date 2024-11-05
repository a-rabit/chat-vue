import MarkdownIt from 'markdown-it'
import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { ChatResponse } from '../types/chat'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 选择一个主题

const md = new MarkdownIt({
  html: true,        // 启用 HTML 标签
  breaks: true,      // 转换换行符为 <br>
  linkify: true,     // 自动转换 URL 为链接
  typographer: true,  // 启用一些语言中立的替换和引号美化
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用默认的转义
  }
})

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
            content: 'You are a helpful assistant. Please format your responses in markdown when appropriate.'
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
  
      // 将返回的内容转换为 HTML
      const rawContent = response.data.choices[0].message.content
      const htmlContent = md.render(rawContent)
  
      return {
        message: rawContent,           // 原始 markdown 文本
        htmlContent: htmlContent,      // 转换后的 HTML
        status: 0
      }
    } catch (error) {
      console.error('API 调用失败:', error)
      return {
        message: '抱歉，发生了错误',
        status: 1  // 错误状态
      }
    }
  }