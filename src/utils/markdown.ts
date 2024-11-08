import MarkdownIt from 'markdown-it'

export const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})
const processFormula = (content: string) => {
  // 处理被 font 标签包裹的公式
  return content.replace(
    /\((.*?)\)/g,
    (match, formula) => {
      // 检查是否是数学公式（包含数学符号）
      if (/[_^{}\\]/.test(formula)) {
        // 是数学公式，用 $ 包裹
        return `$${formula}$`
      }
      // 不是数学公式，保持原样
      return match
    }
  )
}

export const renderMarkdown = (content: string) => {
  const processedContent = processFormula(content)
//   console.log(content)
//   console.log(processedContent)
//   console.log(md.render(processedContent))
  return md.render(processedContent)
} 