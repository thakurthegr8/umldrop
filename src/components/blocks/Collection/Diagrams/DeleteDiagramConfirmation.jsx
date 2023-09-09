import React, { useState } from 'react'
import Button from '@/src/components/utils/Button'
import TrashIcon from '@heroicons/react/24/solid/TrashIcon'
import Modal from '@/src/components/utils/Modal';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import useDiagram from '@/src/hooks/diagrams/useDiagram';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const DeleteDiagramConfirmation = (props) => {
    const { diagram } = props;
    const router = useRouter();
    const [modalVisibility, mutateModalVisibility] = useState(false);
    const currentDiagramHandler = useDiagram();
    const onConfirmationForDiagramDeletion = async () => {
        try {
            const responseToDelete = await currentDiagramHandler.deleteDiagram.dispatch({ id: diagram.id });
            if (responseToDelete.data) {
                router.reload();
            }
            if (responseToDelete.error) throw responseToDelete.error;
        } catch (error) {
            toast("An un expected error occurred", { type: "error" })
        }

    }
    const toggleModalVisibility = () => {
        mutateModalVisibility(prevVisibility => !prevVisibility);
    }
    return (
        <>
            <Button className="bg-red-900/50 text-red-500" onClick={toggleModalVisibility}><TrashIcon className='w-5 h-5' /></Button>
            <Modal open={modalVisibility} onClose={toggleModalVisibility} title="Confirmation to delete diagram.">
                <Layout.Col className="w-screen sm:w-auto md:min-w-[30rem]">
                    <Layout.Col className="gap-1 py-16">
                        <Typography.Caption className="text-center text-white/90">This will delete your diagram.</Typography.Caption>
                    </Layout.Col>
                    <Layout.Row className="gap-2 p-2 justify-end border-t border-dark_secondary ">
                        <Button
                            className="btn-primary"
                            onClick={onConfirmationForDiagramDeletion}
                            loading={currentDiagramHandler.deleteDiagram.loading}>
                            Confirm
                        </Button>
                        <Button className="btn-icon" onClick={toggleModalVisibility}>Cancel</Button>
                    </Layout.Row>

                </Layout.Col>
            </Modal>
        </>
    )
}

export default DeleteDiagramConfirmation