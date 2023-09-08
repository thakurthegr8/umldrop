import React from 'react'
import styles from "./CollectionHeaderBlock.module.css"
import Button from '@/src/components/utils/Button';
import Form from '@/src/components/utils/Form';
import Layout from '@/src/components/utils/Layout';
import { useRouter } from 'next/router';

const AddDiagramForm = (props) => {
    const { collection } = props;
    const router = useRouter();
    const onAddDiagramFormSubmit = (payload) => router.push(`/playground?action_type=add&name=${payload.name}&collection_name=${payload.collection_name}`);
    return (
        <Form onSubmit={onAddDiagramFormSubmit}>
            <Layout.Col className={styles.add_diagram_form_layout}>
                <Form.Input type="text" name="name" placeholder="Enter name..." required />
                <Form.Input type="text" name="collection_name" placeholder="Enter collection name..." value={collection.name} required disabled />
                <Button className="btn-primary">Create Diagram</Button>
            </Layout.Col>
        </Form>
    )
}

export default AddDiagramForm