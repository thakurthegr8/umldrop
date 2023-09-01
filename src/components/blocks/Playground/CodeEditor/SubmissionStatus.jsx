import React, { useState } from 'react';
import styles from "./CodeEditor.module.css";
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import OpenIcon from "@heroicons/react/24/solid/ChevronUpIcon";
import Layout from '@/src/components/utils/Layout'
import Table from '@/src/components/utils/Table'
import Typography from '@/src/components/utils/Typography'
import Button from '@/src/components/utils/Button'

const getColumns = (obj) => {
    if (!obj) return [];
    return Object.keys(obj).map((item) => ({
        placeholder: item,
        key: item
    }))
}

const SolvedStatus = (props) => {
    const { payload } = props;
    return <><Typography.Subtitle className="font-bold">Accepted</Typography.Subtitle>
        {payload?.payload &&
            <Layout.Col className="gap-3">
                <Typography.Heading>Expected Output</Typography.Heading>
                <Table cols={getColumns(payload.payload.adminQueryResult[0])} dataset={payload.payload.adminQueryResult} />
                <Typography.Heading>Your Output</Typography.Heading>
                <Table cols={getColumns(payload.payload.userQueryResult[0])} dataset={payload.payload.userQueryResult} />
            </Layout.Col>}</>
}

const RejectedStatus = (props) => {
    const { payload } = props;
    return (<>
        <Layout.Col className="gap-2 justify-start">
            <Typography.Title className="capitalize">
                Wrong Answer
            </Typography.Title>
            {payload?.error && <Typography.Body className="border border-dark_secondary p-2 text-red-500 rounded-md">{payload.error}</Typography.Body>}
        </Layout.Col>
        {payload?.payload &&
            <Layout.Col className="gap-3 justify-start">
                <Typography.Heading>Expected Output</Typography.Heading>
                <Table cols={getColumns(payload.payload.adminQueryResult[0])} dataset={payload.payload.adminQueryResult} />
                <Typography.Heading>Your Output</Typography.Heading>
                <Table cols={getColumns(payload.payload.userQueryResult[0])} dataset={payload.payload.userQueryResult} />
            </Layout.Col>}
    </>
    )
}


const SubmissionStatus = (props) => {
    const { runCode } = props;
    const [showStatus, setShowStatus] = useState(true);
    const handleShowStatus = () => {
        setShowStatus(prev => !prev);
    }
    return (
        <Layout.Col className={styles.submission_status_main}>
            <Layout.Row className={styles.submission_status_top_navbar}>
                <Button className="btn-icon" onClick={handleShowStatus}>
                    {showStatus ? <CloseIcon className='w-6 h-6 aspect-square' /> : <OpenIcon className='w-6 h-6 aspect-square' />}
                </Button>
            </Layout.Row>
            {showStatus && <Layout.Col className={styles.submission_status_sub_col}>
                {runCode.data?.data?.codeResult && <SolvedStatus payload={runCode.data.data.codeResult} />}
                {runCode.error && <RejectedStatus payload={runCode.error.error} />}
            </Layout.Col>}
        </Layout.Col>
    )
}

export default SubmissionStatus