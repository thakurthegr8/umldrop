import Badge from '@/src/components/elements/Badge';
import Layout from '@/src/components/utils/Layout';
import Table from '@/src/components/utils/Table';
import useFetch from '@/src/hooks/general/useFetch';
import { useAuth } from '@/src/providers/Auth';
import { QuestionContext } from '@/src/providers/QuestionProvider';
import moment from 'moment';
import React, { useContext } from 'react'
import { PulseLoader } from 'react-spinners';

const SubmissionsTable = () => {
    const question = useContext(QuestionContext)
    const submissionsData = useFetch({ method: "GET", url: `/api/questions/${question.slug}/submissions` })
    const cols = [{
        placeholder: "Time",
        key: "created_at",
        render: (text) => moment(text).format("MMMM Do YYYY, h:mm a")
    }, {
        placeholder: "Status",
        key: "status",
        render: (text) => <Badge type={text === "wrong" ? "hard" : "easy"}>{text}</Badge>
    }]
    return <>
        {submissionsData.loading ? <PulseLoader size={8} color='#fff' /> : <Table cols={cols} dataset={submissionsData.data || []} />}
    </>
}

const Submissions = () => {
    const auth = useAuth();
    if (!auth.data) {
        return <>You have not logged in</>
    }
    return (
        <SubmissionsTable />
    )
}

export default Submissions;