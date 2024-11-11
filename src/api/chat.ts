import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const md: MarkdownIt = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<div class="hljs">' + 
          hljs.highlight(str, { language: lang }).value + 
          '</div>'
      } catch (__) {}
    }
    return '<div class="hljs">' + md.utils.escapeHtml(str) + '</div>'
  }
})

interface ChatCompletionResponse {
    choices: [{
      message: {
        content: string
      }
    }]
  }
  export const sendChatMessage = async (
    message: string, 
    signal?: AbortSignal,
    onUpdate?: (content: string, htmlContent: string) => void
  ): Promise<void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        body: JSON.stringify({
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
          ],
          stream: true
        }),
        signal: signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('无法获取响应流')
      }

      let rawContent = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split('\n').filter(line => line.trim() !== '')
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6)
            if (jsonStr === '[DONE]') continue
            
            try {
              const json = JSON.parse(jsonStr)
              const content = json.choices[0]?.delta?.content || ''
              rawContent += content
              
              if (content && onUpdate) {
                const htmlContent = md.render(rawContent)
                onUpdate(rawContent, htmlContent)
              }
            } catch (e) {
              console.warn('解析JSON失败:', e)
            }
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('请求已取消')
      }
      console.error('API 调用失败:', error)
      throw new Error('API 调用失败')
    }
  }