import Typography from '@/src/components/utils/Typography'
import { QuestionContext } from '@/src/providers/QuestionProvider'
import React, { useContext } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import MarkdownIt from 'markdown-it'
import Badge from '@/src/components/elements/Badge'
import Layout from '@/src/components/utils/Layout'

const CodeDescription = () => {
    const question = useContext(QuestionContext)
    const md = new MarkdownIt();
    const mditResult = md.render(question.description ? question.description : "");
    return (<>
        <Typography.Title className="font-bold">{question.title}</Typography.Title>
        <Layout.Row className="items-center gap-2 text-white">
            <Badge type={question.difficulty.toLowerCase()}>{question.difficulty}</Badge>
            <Typography.Caption>{question.company}</Typography.Caption>
        </Layout.Row>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} >{mditResult}</ReactMarkdown>
    </>
    )
}

export default CodeDescription