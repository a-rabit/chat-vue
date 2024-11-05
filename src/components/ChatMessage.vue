<template>
  <div class="message" :class="role">
    <div class="avatar">
      {{ role === 'user' ? '😫' : '🤖' }}
    </div>
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: string
  role: 'user' | 'assistant'
}>()
</script>

<style scoped>
.message {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
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

.user {
  justify-content: flex-end;
}

.user .content {
  background: #2b5278;
}

.assistant .content {
  background: #2a2a2a;
}
</style> 