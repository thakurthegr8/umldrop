import Layout from '@/src/components/utils/Layout'
import Table from '@/src/components/utils/Table'
import Typography from '@/src/components/utils/Typography'
import React from 'react'

const getColumns = (obj) => {
    if (!obj) return {};
    return Object.keys(obj).map((item) => ({
        placeholder: item,
        key: item
    }))
}


const SubmissionStatus = (props) => {
    const { runCode } = props
    return (
        <Layout.Col className="absolute bg-general inset-x-0 bottom-1 mb-28 max-h-[50%] overflow-y-scroll p-4">
            {runCode.error && <Layout.Col className="gap-2">
                <Typography.Title className="capitalize">
                    {runCode.error.status}
                </Typography.Title>
                <Typography.Body className="border border-dark_secondary p-2 text-red-500 rounded-md">{runCode.error.error}</Typography.Body>
            </Layout.Col>}
            {runCode.data && <Typography.Title>Accepted</Typography.Title>}
            {runCode.data?.payload &&
                <Layout.Col className="gap-3">
                    <Typography.Heading>Expected Output</Typography.Heading>
                    <Table cols={getColumns(runCode.data.payload.adminQueryResult[0])} dataset={runCode.data.payload.adminQueryResult} />
                    <Typography.Heading>Your Output</Typography.Heading>
                    <Table cols={getColumns(runCode.data.payload.userQueryResult[0])} dataset={runCode.data.payload.userQueryResult} />
                </Layout.Col>}
            {runCode.error?.payload &&
                <Layout.Col className="gap-3">
                    <Typography.Heading>Expected Output</Typography.Heading>
                    <Table cols={getColumns(runCode.error.payload.adminQueryResult[0])} dataset={runCode.error.payload.adminQueryResult} />
                    <Typography.Heading>Your Output</Typography.Heading>
                    <Table cols={getColumns(runCode.error.payload.userQueryResult[0])} dataset={runCode.error.payload.userQueryResult} />
                </Layout.Col>}
        </Layout.Col>
    )
}

export default SubmissionStatus