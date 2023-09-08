import Button from '@/src/components/utils/Button'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography';
import useCollection from '@/src/hooks/collection/useCollection';
import { useAuth } from '@/src/providers/Auth';
import { useRouter } from 'next/router';
import React from 'react'
import { toast } from 'react-toastify';

const DeleteCollectionConfirmation = (props) => {
    const router = useRouter();
    const auth = useAuth();
    const { collection, rejectDeletion } = props;
    const currentCollectionHandler = useCollection();
    const deleteCollectionHandler = async () => {
        try {
            const res = await currentCollectionHandler.deleteCollection.dispatch({ name: collection.name });
            if (res.data) {
                router.push(`/${auth.data?.username}`);
            }
        } catch (error) {
            toast("An unexpected error occurred", { type: "error" })
        }
    }
    return (
        <Layout.Col className="w-screen sm:w-auto md:min-w-[30rem]">
            <Layout.Col className="py-16 gap-1">
                <Typography.Body className="text-center font-bold">Are sure to delete your collection?</Typography.Body>
                <Typography.Caption className="text-center text-white/90">This will delete all your diagrams.</Typography.Caption>
            </Layout.Col>
            <Layout.Row className="gap-2 p-2 justify-end border-t border-dark_secondary ">
                <Button
                    className="btn-primary"
                    onClick={deleteCollectionHandler}
                    loading={currentCollectionHandler.deleteCollection.loading}>
                    Confirm
                </Button>
                <Button className="btn-icon" onClick={rejectDeletion}>Cancel</Button>
            </Layout.Row>
        </Layout.Col>
    )
}

export default DeleteCollectionConfirmation