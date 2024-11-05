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
    <!-- 如果有 HTML 内容且是 assistant 角色才使用 HTML 渲染 -->
    <div v-if="role === 'assistant' && htmlContent" 
         v-html="htmlContent" 
         class="markdown-content">
    </div>
    <!-- 否则显示普通文本 -->
    <div v-else>{{ content }}</div>
  </div>
</template>

<style scoped>
.message {
  padding: 1rem;
  margin: 0.5rem 0;
}

.user {
  background-color: #000000;
}

.assistant {
  background-color: #000000;
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