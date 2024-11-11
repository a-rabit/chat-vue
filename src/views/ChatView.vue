<template>
  <div class="chat-container">
    <div class="chat-messages" ref="messageContainer">
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :content="msg.content"
        :html-content="msg.htmlContent"
        :role="msg.role"
      />
    </div>

    <Transition name="fade">
        <GeneratingIndicator v-if="loading" @cancel="cancelGeneration"/>
    </Transition>
    <div class="chat-input-container">
      <ChatInput
        v-model="userInput"
        @send="sendMessage"
        :loading="loading"
        ref="inputRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ChatMessage from '../components/ChatMessage.vue'
import ChatInput from '../components/ChatInput.vue'
import { sendChatMessage } from '../api/chat'
import type { Message } from '../types/chat'
import GeneratingIndicator from '../components/GeneratingIndicator.vue'

interface ChatMessage {
  id: string
  content: string
  htmlContent?: string
  role: 'user' | 'assistant'
}
const controller = ref<AbortController | null>(null)
const cancelGeneration = () => {
    if (controller.value) {
        controller.value.abort()
        controller.value = null
        loading.value = false
    }
}

const messages = ref<ChatMessage[]>([])
const userInput = ref<string>('')
const loading = ref<boolean>(false)
const messageContainer = ref<HTMLElement | null>(null)

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  
  const userMessage = userInput.value
  userInput.value = ''
  
  // 添加用户消息
  messages.value.push({
    id: uuidv4(),
    role: 'user' as const,  // 使用 as const 来确保类型正确
    content: userMessage,
    htmlContent: undefined
  })
  
  loading.value = true
  controller.value = new AbortController()

  try {
    // 创建一个新的消息索引
    const messageIndex = messages.value.length
    messages.value.push({
      id: uuidv4(),
      role: 'assistant' as const,
      content: '',
      htmlContent: ''
    })

    await sendChatMessage(
      userMessage, 
      controller.value?.signal,
      async (content, htmlContent) => {
        // 直接更新 messages 数组中的对应消息
        messages.value[messageIndex] = {
          ...messages.value[messageIndex],
          content,
          htmlContent
        }
        // 每次内容更新后都滚动到底部
        await scrollToBottom()
      }
    )
  } catch (error) {
    console.error('消息发送失败:', error)
  } finally {
    loading.value = false
    controller.value = null
    await scrollToBottom()
  }
}

const scrollToBottom = async (): Promise<void> => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}
</script>

<style scoped>
.chat-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  color: #e0e0e0;
  position: fixed;
  top: 0;
  left: 0;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  scrollbar-width: thin;
  scrollbar-color: #444444 #1a1a1a;
  scroll-behavior: smooth; /* 添加平滑滚动效果 */
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #444444;
  border-radius: 3px;
}

.chat-input-container {
  padding: 24px 32px;
  background-color: #242424;
  border-top: 1px solid #333333;
}

.message {
  display: flex;
  margin-bottom: 24px;
  gap: 16px;
  animation: fadeIn 0.3s ease-in-out;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.content {
  display: inline-block;
  padding: 16px;
  border-radius: 8px;
  background: #2a2a2a;
  max-width: 80%;
  width: fit-content;
  line-height: 1.6;
  color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
  white-space: pre-wrap;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .chat-messages {
    padding: 16px;
  }
  
  .chat-input-container {
    padding: 16px;
  }
}
</style> 