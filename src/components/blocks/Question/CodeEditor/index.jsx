import React, { useContext, useEffect, useRef } from 'react'
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

const CodeEditor = () => {
    const auth = useAuth();
    const monaco = useMonaco();
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
    const onChangeTheme = (value) => {
        monaco && import(`monaco-themes/themes/${value}.json`).then((theme) => {
            monaco.editor.defineTheme("my-theme", theme)
        })
    }
    return <>
        <Layout.Row className="p-2 relative">
            <Combobox onChange={onChangeTheme} className="flex flex-col" as="div">
                <Layout.Row>
                    <Combobox.Input />
                    <Combobox.Button>show</Combobox.Button>
                </Layout.Row>
                <Combobox.Options className="h-[200px] overflow-y-auto">
                    {Object.keys(themes).map((item) => <Combobox.Option value={themes[item]}>{item}</Combobox.Option>)}
                </Combobox.Options>
            </Combobox>
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