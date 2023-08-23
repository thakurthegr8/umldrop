import Link from 'next/link'
import React from 'react'
import Badge from '@/src/components/elements/Badge'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import { HOME_QUESTIONS_TABLE_HEADINGS } from '@/src/constants/home'

const HomeQuestionsTableBlock = (props) => {
    return (
        <>
            <Layout.Row className="justify-between w-full backdrop:blur-2xl py-3 rounded-lg border border-secondary/30 bg-dark_secondary/50 px-4">
                {HOME_QUESTIONS_TABLE_HEADINGS.map((item, index) => <Typography.Body key={index} {...item} />)}
            </Layout.Row>
            <Layout.Col className="divide-y divide-dark_secondary w-full">
                {props.questions && props.questions.map((item, index) => {
                    return item.category === "SQL" && !item.accessGroups ? <Link key={index} className="justify-between w-full py-2 px-4 flex hover:bg-dark_secondary/30 transition-all" href={`/questions/${item.slug}`}>
                        <Typography.Body className="text-left hidden md:flex">{item.company}</Typography.Body>
                        <Typography.Body className="text-left md:text-center flex-1">{item.title}</Typography.Body>
                        <Badge type={item.difficulty.toLowerCase()}>{item.difficulty}</Badge>
                    </Link> : null
                })}</Layout.Col>
        </>
    )
}

export default HomeQuestionsTableBlock