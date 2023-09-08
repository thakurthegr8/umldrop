import React from 'react'
import styles from "./CollectionHeaderBlock.module.css"
import Button from '@/src/components/utils/Button';
import Form from '@/src/components/utils/Form';
import Layout from '@/src/components/utils/Layout';
import { useRouter } from 'next/router';
import useCollection from '@/src/hooks/collection/useCollection';
import { toast } from 'react-toastify';
import { useAuth } from '@/src/providers/Auth';

const UpdateCollectionForm = (props) => {
    const { collection } = props;
    const router = useRouter();
    const auth = useAuth();
    const collectionHandler = useCollection();
    const onUpdateCollectionFormSubmit = async (payload) => {
        try {
            const updateHandler = await collectionHandler.updateCollection.dispatch(payload);
            if (updateHandler.data?.name) {
                router.push(`/${auth.data?.username}`)
            }
            if (updateHandler.error) throw updateHandler.error
        } catch (error) {
            toast("An unexpected error occurred", { type: "error" })
        }
    }
    return (
        <Form onSubmit={onUpdateCollectionFormSubmit}>
            <Layout.Col className={styles.add_diagram_form_layout}>
                <Form.Input type="text" name="name" placeholder="Enter collection name..." defaultValue={collection.name} required />
                <Form.Input type="text" name="description" placeholder="Enter description..." defaultValue={collection.description} required />
                <Form.Input type="hidden" name="prev_name" defaultValue={collection.name} />
                <Button className="btn-primary" loading={collectionHandler.updateCollection.loading}>Update Collection</Button>
            </Layout.Col>
        </Form>
    )
}

export default UpdateCollectionForm