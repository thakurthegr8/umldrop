import React, { useState } from 'react'
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import OpenIcon from "@heroicons/react/24/solid/ChevronUpIcon";
import Layout from '@/src/components/utils/Layout'
import Table from '@/src/components/utils/Table'
import Typography from '@/src/components/utils/Typography'
import Button from '@/src/components/utils/Button'

const getColumns = (obj) => {
    if (!obj) return {};
    return Object.keys(obj).map((item) => ({
        placeholder: item,
        key: item
    }))
}

const SolvedStatus = (props) => {
    const { payload } = props;
    return <><Typography.Subtitle className="font-bold">Accepted</Typography.Subtitle>
        {payload?.payload &&
            <Layout.Col className="gap-3 ">
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
            <Typography.Body className="border border-dark_secondary p-2 text-red-500 rounded-md">{payload.error}</Typography.Body>
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
        <Layout.Col className="absolute z-10 justify-start bg-general inset-x-0 bottom-1 mb-28 max-h-[50%] overflow-y-scroll">
            <Layout.Row className="sticky top-0 bg-general inset-x-0 p-2 justify-end">
                <Button className="btn-icon" onClick={handleShowStatus}>
                    {showStatus ? <CloseIcon className='w-6 h-6 aspect-square' /> : <OpenIcon className='w-6 h-6 aspect-square' />}
                </Button>
            </Layout.Row>
            {showStatus && <Layout.Col className="p-4 items-start border-t border-dark_secondary">
                {runCode.data && <SolvedStatus payload={runCode.data} />}
                {runCode.error && <RejectedStatus payload={runCode.error} />}
            </Layout.Col>}
        </Layout.Col>
    )
}

export default SubmissionStatus