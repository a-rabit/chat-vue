import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 添加 MathJax 配置
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true
  },
  svg: {
    fontCache: 'global'
  }
}

// 动态加载 MathJax
const script = document.createElement('script')
script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
script.async = true
document.head.appendChild(script)

const app = createApp(App)
app.use(router)
app.mount('#app')