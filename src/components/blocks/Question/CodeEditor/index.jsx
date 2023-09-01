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
import PlantUmlEncoder from 'plantuml-encoder';
import _ from 'lodash';

const CodeEditor = (props) => {
    const auth = useAuth();
    const editorHistory = useLocalStorage({ key: "current_Code", fallback: "" })
    const handleSubmitCode = async () => {

    }
    const onChangeHandler = (value) => {
        const encodedString = PlantUmlEncoder.encode(value);
        _.debounce(props.setImage(encodedString), 1000);
    }
    return <>
        <CustomEditor localStorageInstance={editorHistory} localStorageKey={"current_code"} seed={"@startuml \n@enduml"} onChangeHandler={onChangeHandler} />
        <Layout.Col className={styles.status_container}>
            <Layout.Row className={styles.bottom_navbar}>
                <Button className="btn-primary font-medium" onClick={null}>Save</Button>
            </Layout.Row>
        </Layout.Col>
    </>
}

export default CodeEditor;