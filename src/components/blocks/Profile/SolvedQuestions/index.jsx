import Badge from '@/src/components/elements/Badge';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import Link from 'next/link';
import React from 'react'

const ProfileSolvedQuestions = (props) => {
    return (
        <Layout.Card className="sm:col-span-3 flex flex-col gap-2">
            <Typography.Body className="text-secondary font-semibold">Solved Questions</Typography.Body>
            <Layout.Col className="gap-1">
                {props.questions && props.questions.map((item) => (
                    <Link key={item.question} href={`/questions/${item.question}`} target='_blank' className="flex w-full p-2 items-center rounded-md justify-between hover:bg-dark_secondary">
                        <Typography.Body>{item.question}</Typography.Body>
                        <Badge type={item.difficulty}>{item.difficulty}</Badge>
                    </Link>
                ))
                }
            </Layout.Col>
        </Layout.Card >
    )
}

export default ProfileSolvedQuestions;