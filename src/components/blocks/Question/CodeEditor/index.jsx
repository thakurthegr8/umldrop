import React, { useContext, useEffect, useRef, useState } from 'react'
import { Editor, useMonaco } from '@monaco-editor/react';
import Theme from "monaco-themes/themes/Blackboard.json";
import Layout from '@/src/components/utils/Layout';
import useFetch from '@/src/hooks/general/useFetch';
import { QuestionContext } from '@/src/providers/QuestionProvider';
import Button from '@/src/components/utils/Button';
import SubmissionStatus from './SubmissionStatus';
import useLocalStorage from '@/src/hooks/general/useLocalStorage';
import { useAuth } from '@/src/providers/Auth';
import useEditorTheme from '@/src/hooks/useEditorTheme';
import Form from '@/src/components/utils/Form';
import { Combobox } from '@headlessui/react';
import { themes } from '@/src/constants/themes';
import CustomComboBox from '@/src/components/utils/ComboBox';

const CodeEditor = () => {
    const auth = useAuth();
    const monaco = useMonaco();
    const theme = useLocalStorage({ fallback: "Monokai", key: "theme" });
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
            payload.difficulty = question.difficulty.toLowerCase()
            await runCode.dispatch(payload);
            return;
        }
        await runCode.dispatch(payload)
    }
    const onChangeTheme = async (value) => {
        const currTheme = await import(`monaco-themes/themes/${value}.json`).then((mod) => mod);
        monaco.editor.defineTheme("my-theme", currTheme);
        monaco.editor.setTheme('my-theme');
        theme.setItem("theme", value);
    }
    const onEditorMount = async () => {
        if (!monaco || !theme.value) return;
        const currTheme = await import(`monaco-themes/themes/${theme.value}.json`).then((mod) => mod);
        monaco.editor.defineTheme("my-theme", currTheme);
        monaco.editor.setTheme('my-theme');
    }
    useEffect(() => {
        onEditorMount();
    }, [monaco]);
    return <>
        <Layout.Row className="p-2 relative">
            <CustomComboBox placeholder="Select theme" list={Object.values(themes)} onChange={onChangeTheme} value="Your theme" />
        </Layout.Row>
        <Editor onChange={handleEditorChange} language="sql" height="100%" defaultValue={editorHistory.value ? editorHistory.value : question?.baseQuery} theme="my-theme" className="w-full" />
        <Layout.Col className="sticky bottom-0 ">
            {(runCode.data !== null || runCode.error !== null) && <SubmissionStatus runCode={runCode} />}
            <Layout.Row className="px-4 justify-end py-3 bg-general border-t border-dark_secondary">
                <Button className="btn-primary font-medium" onClick={handleSubmitCode} loading={runCode.loading} disabled={!editorHistory.value}>Run Code</Button>
            </Layout.Row>
        </Layout.Col>
    </>
}

export default CodeEditor;