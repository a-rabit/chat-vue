<script setup lang="ts">
import { ref } from 'vue'
interface Props {
  content: string
  role: 'user' | 'assistant'
  htmlContent?: string  // 添加可选的 htmlContent 属性
}

// 定义组件的 props
const props = defineProps<Props>()
const copySuccess = ref(false)
const retryHandler = async () => {
    console.log('retry')
}
const copyContent = async () => {
    try {
    
    // 如果是 markdown 内容，复制原始文本而不是 HTML
    const textToCopy = props.content
    await navigator.clipboard.writeText(textToCopy)
    
    // 显示复制成功状态
    copySuccess.value = true
    
    // 2秒后重置状态
        setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}


</script>

<template>
  <div class="message" :class="role">
    <div class = "avatar">
    {{ role === 'user' ? '👨' : '🤖'}}
    </div>
    <div class = "content">
        <div v-if="role === 'assistant' && htmlContent" 
         v-html="htmlContent" 
         class="markdown-content">
        </div>
        <!-- 否则显示普通文本 -->
        <div v-else>{{ content }}</div>
        <div class="button-group">
            <button 
            class="action-button copy-button" 
            :class="{'copied' : copySuccess}"
            @click="copyContent" 
            >
            <svg v-if="!copySuccess" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"></path>
            </svg>
            </button>
            <button 
            class="action-button retry-button"
            @click="retryHandler"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
            </svg>
            </button>
        </div>
    </div>
    <!-- 如果有 HTML 内容且是 assistant 角色才使用 HTML 渲染 -->
  
    
        
  </div>
</template>

<style scoped>
.button-group {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;  /* 按钮之间的间距 */
}
.action-button {
  padding: 4px 12px;
  border: none;
  background: #333;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  opacity: 0.8;
  height: 24px;  /* 统一按钮高度 */
  line-height: 1; /* 文字垂直居中 */
}

.action-button svg {
  width: 16px;
  height: 16px;
  transition: all 0.2s ease;
}
.action-button:hover svg {
  transform: scale(1.1);
}
/* 定义旋转动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.action-button:hover {
  opacity: 1;
  transform: translateY(-1px);
}
/* .retry-button {
  transition: transform 1s ease; 
} */
.retry-button svg:hover {
    animation: spin 2s linear infinite; /* infinite 表示无限循环 */
}

.copy-button:hover {
  background: #444;
}

/* 复制成功时的样式 */
.message .content .copy-button.copied {
  background: #28a745;
  opacity: 1;
}

.message {
  padding: 1rem;
  margin: 0.5rem 0;
}

.user {
  justify-content: flex-end;
}

.user .content {
  background: #2b5278;
}
    
.assistant .content {
  background: #2a2a2a;
}
.avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333333;
  color: #e0e0e0;
}

.content {
  position: relative; 
  /* display: inline-block; */
  display: flex;  /* 改为 flex 布局 */
  flex-direction: column;  /* 垂直排列 */
  padding: 16px;
  border-radius: 8px;
  background: #2a2a2a;
  max-width: 80%;
  width: fit-content;
  line-height: 1.6;
  color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(107, 106, 106, 0);
  word-wrap: break-word;
  /* white-space: pre-wrap; */
}



.markdown-content {
  /* Markdown 样式保持不变 */
  :deep(pre) {
    background-color: #f6f8fa;
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
  }

  :deep(code) {
    background-color: #f6f8fa;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }

  :deep(p) {
    margin: 1em 0;
  }

  :deep(ul), :deep(ol) {
    padding-left: 2em;
  }

  :deep(blockquote) {
    border-left: 4px solid #ddd;
    padding-left: 1em;
    margin: 1em 0;
    color: #666;
  }

  :deep(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
  }

  :deep(th), :deep(td) {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  :deep(th) {
    background-color: #f6f8fa;
  }
}
</style> 