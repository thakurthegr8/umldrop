import React, { useState } from 'react'
import PencilIcon from '@heroicons/react/24/solid/PencilIcon'
import Button from '@/src/components/utils/Button'
import Drawer from '@/src/components/utils/Drawer'
import Form from '@/src/components/utils/Form'
import Layout from '@/src/components/utils/Layout'
import useDiagram from '@/src/hooks/diagrams/useDiagram'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const EditDiagramBlock = (props) => {
    const { diagram } = props;
    const [drawerVisibility, mutateDrawerVisibility] = useState(false);
    const router = useRouter();
    const currentDiagramHandler = useDiagram();
    const toggleUpdateDiagramDrawer = () => {
        mutateDrawerVisibility(prevVisibility => !prevVisibility)
    }
    const onFormSubmit = async (payload) => {
        try {
            const updateResponse = await currentDiagramHandler.updateDiagram.dispatch(payload);
            if (updateResponse.data) {
                router.reload();
            }
            if (updateResponse.error) {
                throw updateResponse.error;
            }
        } catch (error) {
            toast("An unexpected error occurred", { type: "error" });
        }
    }
    return (<>
        <Button className="btn-primary" onClick={toggleUpdateDiagramDrawer}>Edit <PencilIcon className='w-4 h-4 ml-1' /></Button>
        <Drawer open={drawerVisibility} onClose={toggleUpdateDiagramDrawer} title="Update Diagram">
            <Form onSubmit={onFormSubmit}>
                <Layout.Col className="p-4 gap-2">
                    <Form.Input
                        type="text"
                        name="name"
                        placeholder="Enter name..."
                        defaultValue={diagram.name}
                        required />
                    <Form.Input
                        type="hidden"
                        name="collection_name"
                        defaultValue={diagram.collection_name}
                        required />
                    <Form.Input
                        type="hidden"
                        name="id"
                        defaultValue={diagram.id}
                        required />
                    <Button
                        className="btn-primary"
                        loading={currentDiagramHandler.updateDiagram.loading}>
                        Submit
                    </Button>
                </Layout.Col>
            </Form>
        </Drawer>
    </>
    )
}

export default EditDiagramBlock