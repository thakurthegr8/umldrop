import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "./CollectionHeaderBlock.module.css";
import Button from '@/src/components/utils/Button';
import Drawer from '@/src/components/utils/Drawer';
import Form from '@/src/components/utils/Form';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

const CollectionHeaderBlock = (props) => {
    const router = useRouter();
    const [isAddDrawerOpen, setShowDrawer] = useState(false);
    const { collection, authorised } = props;
    const toggleDrawer = () => {
        setShowDrawer(prev => !prev);
    }
    const onAddDiagramFormSubmit = (payload) => router.push(`/playground?action_type=add&name=${payload.name}&collection_name=${payload.collection_name}`);
    return (
        <Layout.Col className={styles.main}>
            <Layout.Col>
                <Typography.Title className={styles.collection_name}>{collection.name}</Typography.Title>
                <Typography.Body className={styles.collection_description}>{collection.description}</Typography.Body>
            </Layout.Col>
            {authorised &&
                <Button
                    className={`btn-secondary ${styles.add_diagram_btn}`}
                    onClick={toggleDrawer}>
                    Add New Diagram<PlusIcon className={styles.add_diagram_btn_icon} />
                </Button>}
            <Drawer open={isAddDrawerOpen} onClose={toggleDrawer} title="Add Diagram">
                <Form onSubmit={onAddDiagramFormSubmit}>
                    <Layout.Col className={styles.add_diagram_form_layout}>
                        <Form.Input type="text" name="name" placeholder="Enter name..." required />
                        <Form.Input type="text" name="collection_name" placeholder="Enter collection name..." value={collection.name} required disabled />
                        <Button className="btn-primary">Create Diagram</Button>
                    </Layout.Col>
                </Form>
            </Drawer>
        </Layout.Col>
    )
}

export default CollectionHeaderBlock;