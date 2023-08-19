import React, { useContext, useState } from 'react'
import { BeatLoader } from "react-spinners";
import { Editor } from '@monaco-editor/react';
import Layout from '@/src/components/utils/Layout';
import useFetch from '@/src/hooks/general/useFetch';
import { QuestionContext } from '@/src/providers/QuestionProvider';
import Button from '@/src/components/utils/Button';
import SubmissionStatus from './SubmissionStatus';

const CodeEditor = () => {
    const question = useContext(QuestionContext);
    const [result, setResult] = useState(question?.baseQuery);
    const runCode = useFetch({ url: "/api/solution/run", method: "POST" });
    const handleEditorChange = (editorResult) => {
        setResult(editorResult);
    }
    const handleSubmitCode = async () => {
        await runCode.dispatch({ questionId: question.id, userSolution: result })
    }
    return <>
        <Editor onChange={handleEditorChange} language="sql" height="80%" defaultValue={question?.baseQuery} theme="vs-dark" className="w-full" />
        <Layout.Col>
            {(runCode.data !== null || runCode.error !== null) && <SubmissionStatus runCode={runCode} />}
            <Layout.Row className="px-4 pt-1 justify-end border-t border-dark_secondary">
                <Button className="btn-secondary" onClick={handleSubmitCode} disabled={runCode.loading}>{runCode.loading ? <BeatLoader color="#ffffff" size={16} /> : "Run Code"}</Button>
            </Layout.Row>
        </Layout.Col>
    </>
}

export default CodeEditor;