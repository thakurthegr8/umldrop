import React, { useState } from 'react'
import { useAuth } from '@/src/providers/Auth'
import Drawer from '../../utils/Drawer';
import { Menu } from '@headlessui/react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Button from '../../utils/Button';
import Form from '../../utils/Form';
import Layout from '../../utils/Layout';
import useFetch from '@/src/hooks/general/useFetch';
import CustomComboBox from '../../utils/ComboBox';
import Typography from '../../utils/Typography';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const AddDiagramForm = () => {
    const router = useRouter();
    const collections = useFetch({ url: "/api/collections", method: "GET" })
    const onFormSubmit = (payload) => {
        if (payload.combobox_name === "Select collection...") {
            toast("Please select collection", { type: "error" });
            return;
        }
        router.push(`/playground?action_type=add&name=${payload.name}&collection_name=${payload.combobox_name}`)
    }
    const onChangeCollectionValue = _value => null;
    return <Form onSubmit={onFormSubmit}>
        <Layout.Col className="gap-2 p-4">
            <Form.Input type="text" name="name" placeholder="Enter name..." required />
            <CustomComboBox placeholder="Select theme" list={collections.data?.map(item => item.name) || []} onChange={onChangeCollectionValue} value="Select collection..." />
            {collections.data?.length === 0 && !collections.loading &&<Typography.Caption className="text-red-500 bg-red-200/10 p-2 rounded-md">
                {`You don't have any collections make some then come back here.`}
            </Typography.Caption>}
            <Button className="btn-primary" disabled={!collections.data?.length}>Add Diagram</Button>
        </Layout.Col>
    </Form>
}

export const AddDiagramDrawer = (props) => {

    return <Drawer open={props.open} onClose={props.onClose} title="Add diagram">
        <AddDiagramForm />
    </Drawer>
}

const AddDiagramOption = (props) => {
    const auth = useAuth();

    if (!auth.data) return null;
    return (
        <Menu.Item as="span" onClick={props.toggleDrawerVisibility} className="p-2 hover:bg-white/10 flex justify-between cursor-pointer">
            Add a diagram<PlusIcon className="w-5 h-5 ml-1" />
        </Menu.Item>
    )
}

export default AddDiagramOption