import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'

interface Props {
  content: string
}

export const BlogContent = ({ content }: Props) => {
  return (
    <div>
      <Markdown
        className="prose text-xl"
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: 'h2',
          h2: 'h3',
        }}>
        {content}
      </Markdown>
    </div>
  )
}
