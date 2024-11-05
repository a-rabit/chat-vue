<template>
  <div class="generating-indicator">
    <div class="indicator-content">
      <div class="spinner"></div>
      <span>正在生成回答...</span>
      <button class="cancel-btn" @click="$emit('cancel')">
        取消
      </button>
    </div>
  </div>
</template>

<style scoped>
.generating-indicator {
  position: fixed;
  bottom: 120px;  /* 调整位置 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;  /* 提高层级 */
  pointer-events: auto;  /* 确保可以点击 */
}

.indicator-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: #2c2c2c;
  border: 1px solid #444;  /* 添加边框 */
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.cancel-btn {
  padding: 4px 12px;
  border: none;
  background: #444;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #555;
}

.cancel-btn:active {
  transform: scale(0.95);
}

/* 添加过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 