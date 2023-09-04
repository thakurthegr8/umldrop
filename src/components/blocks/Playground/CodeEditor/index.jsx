import React, { useContext, useState } from 'react';
import styles from "./CodeEditor.module.css";
import Layout from '@/src/components/utils/Layout';
import useFetch from '@/src/hooks/general/useFetch';
import { DiagramContext, QuestionContext } from '@/src/providers/QuestionProvider';
import Button from '@/src/components/utils/Button';
import SubmissionStatus from './SubmissionStatus';
import useLocalStorage from '@/src/hooks/general/useLocalStorage';
import { useAuth } from '@/src/providers/Auth';
import CustomEditor from './CustomEditor';
import PlantUmlEncoder from 'plantuml-encoder';
import _ from 'lodash';
import { toast } from 'react-toastify';

const CodeEditor = (props) => {
    const auth = useAuth();
    const diagram = useContext(DiagramContext);
    const currentDiagram = diagram?.encoded_string ? PlantUmlEncoder.decode(diagram.encoded_string) : "@startuml\n@enduml";
    const editorHistory = useLocalStorage({ key: "current_Code", fallback: "" })
    const handleSubmitCode = async () => {

    }
    const onChangeHandler = (value) => {
        try {
            const encodedString = PlantUmlEncoder.encode(value);
            props.setImage(encodedString);
        } catch (error) {
            console.log(error);
            toast(`error in your code please fix`, { type: "error" })
        }
    }
    return <>
        <CustomEditor localStorageInstance={editorHistory} localStorageKey={"current_code"} seed={currentDiagram} onChangeHandler={onChangeHandler} />
        <Layout.Col className={styles.status_container}>
            {auth.data && <Layout.Row className={styles.bottom_navbar}>
                <Button className="btn-primary font-medium" onClick={null}>Save</Button>
            </Layout.Row>}
        </Layout.Col>
    </>
}

export default CodeEditor;