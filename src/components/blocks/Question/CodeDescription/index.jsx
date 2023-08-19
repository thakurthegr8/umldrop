import Typography from '@/src/components/utils/Typography'
import { QuestionContext } from '@/src/providers/QuestionProvider'
import React, { useContext } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import MarkdownIt from 'markdown-it'

const CodeDescription = () => {
    const question = useContext(QuestionContext)
    const md = new MarkdownIt();
    const mditResult = md.render(question.description ? question.description : "");
    return (<>
        <Typography.Title className="font-bold">{question.title}</Typography.Title>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} >{mditResult}</ReactMarkdown>
    </>
    )
}

export default CodeDescription