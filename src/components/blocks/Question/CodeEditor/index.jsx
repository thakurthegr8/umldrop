import React, { useContext, useState } from 'react'
import { BeatLoader } from "react-spinners";
import { Editor } from '@monaco-editor/react';
import Layout from '@/src/components/utils/Layout';
import useFetch from '@/src/hooks/general/useFetch';
import { QuestionContext } from '@/src/providers/QuestionProvider';
import Button from '@/src/components/utils/Button';
import SubmissionStatus from './SubmissionStatus';
import useLocalStorage from '@/src/hooks/general/useLocalStorage';

const CodeEditor = () => {
    const question = useContext(QuestionContext);
    const editorHistory = useLocalStorage({ key: question.id })
    const runCode = useFetch({ url: "/api/solution/run", method: "POST" });
    const handleEditorChange = (editorResult) => {
        editorHistory.setItem(question.id, editorResult);
    }
    const handleSubmitCode = async () => {
        await runCode.dispatch({ questionId: question.id, userSolution: editorHistory.value })
    }
    return <>
        <Editor onChange={handleEditorChange} language="sql" height="80%" defaultValue={editorHistory.value ? editorHistory.value : question?.baseQuery} theme="vs-dark" className="w-full" />
        <Layout.Col>
            {(runCode.data !== null || runCode.error !== null) && <SubmissionStatus runCode={runCode} />}
            <Layout.Row className="px-4 pt-3 justify-end">
                <Button className="btn-primary font-medium" onClick={handleSubmitCode} disabled={runCode.loading || !editorHistory.value}>{runCode.loading ? <BeatLoader color="#ffffff" size={12} /> : "Run Code"}</Button>
            </Layout.Row>
        </Layout.Col>
    </>
}

export default CodeEditor;