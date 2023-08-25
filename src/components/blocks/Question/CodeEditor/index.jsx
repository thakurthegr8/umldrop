import React, { useContext, useState } from 'react'
import { BeatLoader } from "react-spinners";
import { Editor } from '@monaco-editor/react';
import Layout from '@/src/components/utils/Layout';
import useFetch from '@/src/hooks/general/useFetch';
import { QuestionContext } from '@/src/providers/QuestionProvider';
import Button from '@/src/components/utils/Button';
import SubmissionStatus from './SubmissionStatus';
import useLocalStorage from '@/src/hooks/general/useLocalStorage';
import { useAuth } from '@/src/providers/Auth';

const CodeEditor = () => {
    const auth = useAuth();
    const question = useContext(QuestionContext);
    const editorHistory = useLocalStorage({ key: question.id, fallback: question?.baseQuery })
    const runCode = useFetch({ url: auth.data ? "/api/solution/run-auth" : "/api/solution/run", method: "POST" });
    const handleEditorChange = (editorResult) => {
        editorHistory.setItem(question.id, editorResult);
    }
    const handleSubmitCode = async () => {
        const payload = {
            questionId: question.id,
            userSolution: editorHistory.value,
        }
        if (auth.data) {
            payload.questionText = question.slug
            await runCode.dispatch(payload);
            return;
        }
        await runCode.dispatch(payload)
    }
    return <>
        <Editor onChange={handleEditorChange} language="sql" height="100%" defaultValue={editorHistory.value ? editorHistory.value : question?.baseQuery} theme="vs-dark" className="w-full" />
        <Layout.Col className="sticky bottom-0 ">
            {(runCode.data !== null || runCode.error !== null) && <SubmissionStatus runCode={runCode} />}
            <Layout.Row className="px-4 justify-end py-3 bg-general border-t border-dark_secondary">
                <Button className="btn-primary font-medium" onClick={handleSubmitCode} disabled={runCode.loading || !editorHistory.value} loading={runCode.loading || !editorHistory.value}>Run Code</Button>
            </Layout.Row>
        </Layout.Col>
    </>
}

export default CodeEditor;