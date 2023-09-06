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
import { useRouter } from 'next/router';

const CodeEditor = (props) => {
    const auth = useAuth();
    const router = useRouter();
    const updateDiagram = useFetch({ url: "/api/diagrams/update", method: "PUT" })
    const addDiagram = useFetch({ url: "/api/diagrams/add", method: "POST" })
    const diagram = useContext(DiagramContext);
    const currentDiagram = diagram?.encoded_string ? PlantUmlEncoder.decode(diagram.encoded_string) : "@startuml\n@enduml";
    const editorHistory = useLocalStorage({ key: "current_Code", fallback: "" })

    const handleSubmitCode = async () => {
        if (!props?.image) return;
        if (diagram?.action_type) {
            if (diagram.action_type === "add") {
                const payload = {
                    name: diagram.name,
                    collection_name: diagram.collection_name,
                    encoded_string: props.image
                }
                try {
                    const addDiagramHandler = await addDiagram.dispatch(payload);
                    if (addDiagramHandler.data) router.back();
                } catch (error) {
                    toast("an error occurred", { type: "error" })
                }
            } else if (diagram.action_type == "edit") {
                const payload = {
                    id: diagram.id,
                    collection_name: diagram.collection_name,
                    encoded_string: props.image
                }
                await updateDiagram.dispatch(payload);
            }
        }
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
        <CustomEditor localStorageInstance={editorHistory} localStorageKey="current_code" seed={currentDiagram} onChangeHandler={onChangeHandler} />
        <Layout.Col className={styles.status_container}>
            {auth.data && diagram?.action_type && <Layout.Row className={styles.bottom_navbar}>
                <Button disabled={!props.image} loading={updateDiagram.loading || addDiagram.loading} className="btn-primary font-medium" onClick={handleSubmitCode}>Save</Button>
            </Layout.Row>}
        </Layout.Col>
    </>
}

export default CodeEditor;