import React, { useContext } from 'react';
import styles from "./CodeEditor.module.css";
import Layout from '@/src/components/utils/Layout';
import useFetch from '@/src/hooks/general/useFetch';
import { QuestionContext } from '@/src/providers/QuestionProvider';
import Button from '@/src/components/utils/Button';
import SubmissionStatus from './SubmissionStatus';
import useLocalStorage from '@/src/hooks/general/useLocalStorage';
import { useAuth } from '@/src/providers/Auth';
import CustomEditor from './CustomEditor';

const CodeEditor = () => {
    const auth = useAuth();
    const question = useContext(QuestionContext);
    const editorHistory = useLocalStorage({ key: question.id, fallback: question?.baseQuery })
    const runCode = useFetch({ url: auth.data ? "/api/solution/run-auth" : "/api/solution/run", method: "POST" });

    const handleSubmitCode = async () => {
        const payload = {
            questionId: question.id,
            userSolution: editorHistory.value,
        }
        if (auth.data) {
            payload.questionText = question.slug
            payload.difficulty = question.difficulty.toLowerCase()
            await runCode.dispatch(payload);
            return;
        }
        await runCode.dispatch(payload)
    }
    
    return <>
        <CustomEditor localStorageInstance={editorHistory} localStorageKey={question.id} seed={question?.baseQuery} />
        <Layout.Col className={styles.status_container}>
            {(runCode.data !== null || runCode.error !== null) && <SubmissionStatus runCode={runCode} />}
            <Layout.Row className={styles.bottom_navbar}>
                <Button className="btn-primary font-medium" onClick={handleSubmitCode} loading={runCode.loading} disabled={!editorHistory.value}>Run Code</Button>
            </Layout.Row>
        </Layout.Col>
    </>
}

export default CodeEditor;