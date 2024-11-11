<template>
  <div class="input-container">
    <textarea 
      v-model="inputValue"
      @keydown.enter.prevent="handleEnter"
      :disabled="loading"
      rows="1"
      ref="textareaRef"
      @blur="handleBlur"
    />
    <button 
      @click="handleSend"
      :disabled="loading"
    >发送</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send'): void
}>()

const inputValue = ref(props.modelValue)
const textareaRef = ref<HTMLTextAreaElement>()
const shouldFocus = ref(true)

const handleSend = () => {
  emit('send')
  shouldFocus.value = true
  nextTick(() => {
    textareaRef.value?.focus()
  })
}

const handleEnter = (e: KeyboardEvent) => {
  if (e.shiftKey) {
    const textarea = textareaRef.value
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const value = textarea.value
      inputValue.value = value.substring(0, start) + '\n' + value.substring(end)
      nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1
      })
    }
  } else {
    handleSend()
  }
}

const handleBlur = () => {
  if (shouldFocus.value && !props.loading) {
    nextTick(() => {
      textareaRef.value?.focus()
    })
  }
}

watch(() => props.loading, (newValue) => {
  if (!newValue && shouldFocus.value) {
    nextTick(() => {
      textareaRef.value?.focus()
    })
  }
})

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
  if (shouldFocus.value && !props.loading) {
    nextTick(() => {
      textareaRef.value?.focus()
    })
  }
})

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

onMounted(() => {
  nextTick(() => {
    textareaRef.value?.focus()
  })
})

// 暴露 focus 方法
defineExpose({
  focus: () => {
    shouldFocus.value = true
    textareaRef.value?.focus()
  }
})
</script>

<style scoped>
.input-container {
  display: flex;
  gap: 12px;
}

textarea {
  flex: 1;
  background: #333333;
  border: 1px solid #444444;
  color: #e0e0e0;
  padding: 12px 16px;
  border-radius: 8px;
  outline: none;
  resize: none;
  min-height: 24px;
  line-height: 1.5;
  overflow-y: auto;
  max-height: 200px;
}

textarea:focus {
  border-color: #666666;
}

button {
  background: #4a4a4a;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}

button:hover {
  background: #5a5a5a;
}

button:disabled {
  background: #333333;
  cursor: not-allowed;
}
</style> 