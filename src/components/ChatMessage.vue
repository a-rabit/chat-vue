<script setup lang="ts">
interface Props {
  content: string
  role: 'user' | 'assistant'
  htmlContent?: string  // 添加可选的 htmlContent 属性
}

// 定义组件的 props
const props = defineProps<Props>()
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
    </div>
    <!-- 如果有 HTML 内容且是 assistant 角色才使用 HTML 渲染 -->
   
  </div>
</template>

<style scoped>
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
  display: inline-block;
  padding: 16px;
  border-radius: 8px;
  background: #2a2a2a;
  max-width: 80%;
  width: fit-content;
  line-height: 1.6;
  color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(107, 106, 106, 0);
  word-wrap: break-word;
  white-space: pre-wrap;
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