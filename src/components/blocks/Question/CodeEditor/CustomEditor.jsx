import React, { useEffect } from 'react'
import CustomComboBox from '@/src/components/utils/ComboBox';
import Layout from '@/src/components/utils/Layout';
import { themes } from '@/src/constants/themes';
import useLocalStorage from '@/src/hooks/general/useLocalStorage';
import { Editor, useMonaco } from '@monaco-editor/react'

const CustomEditor = (props) => {
    const monaco = useMonaco();
    const theme = useLocalStorage({ fallback: "Monokai", key: "theme" });
    const handleEditorChange = (editorResult) => {
        props.localStorageInstance.setItem(props.localStorageKey, editorResult);
        props.onChangeHandler(editorResult);
    }
    const setTheme = async (value) => {
        const currTheme = await import(`monaco-themes/themes/${value}.json`).then((mod) => mod);
        monaco.editor.defineTheme("my-theme", currTheme);
        monaco.editor.setTheme('my-theme');
    }
    const onChangeTheme = async (value) => {
        setTheme(value);
        theme.setItem("theme", value);
    }
    const onEditorMount = async () => {
        if (!monaco || !theme.value) return;
        setTheme(theme.value);
    }
    useEffect(() => {
        onEditorMount();
    }, [monaco]);
    return (
        <>
            <Layout.Row className="p-2 relative">
                <CustomComboBox placeholder="Select theme" list={Object.values(themes)} onChange={onChangeTheme} value="Your theme" />
            </Layout.Row>
            <Editor onChange={handleEditorChange} language="java" height="100%" defaultValue={props.localStorageInstance.value ? props.localStorageInstance.value : props.seed} theme="my-theme" />
        </>

    )
}

export default CustomEditor