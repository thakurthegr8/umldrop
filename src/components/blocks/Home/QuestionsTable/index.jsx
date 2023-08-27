import React from 'react';
import styles from "./QuestionsTable.module.css";
import Link from 'next/link'
import Badge from '@/src/components/elements/Badge'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import { HOME_QUESTIONS_TABLE_HEADINGS } from '@/src/constants/home'

const HomeQuestionsTableBlock = (props) => {
    return (
        <>
            <Layout.Row className={styles.main_row}>
                {HOME_QUESTIONS_TABLE_HEADINGS.map((item, index) => <Typography.Body key={index} {...item} />)}
            </Layout.Row>
            <Layout.Col className={styles.main_col}>
                {props.questions && props.questions.map((item, index) => {
                    return item.category === "SQL" && !item.accessGroups ? <Link key={index} className={styles.question_link_row} href={`/questions/${item.slug}`}>
                        <Typography.Body className={styles.question_link_company}>{item.company}</Typography.Body>
                        <Typography.Body className={styles.question_link_title}>{item.title}</Typography.Body>
                        <Badge type={item.difficulty.toLowerCase()}>{item.difficulty}</Badge>
                    </Link> : null
                })}</Layout.Col>
        </>
    )
}

export default HomeQuestionsTableBlock