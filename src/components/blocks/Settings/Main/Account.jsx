import Button from '@/src/components/utils/Button'
import Form from '@/src/components/utils/Form'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import { useAuth } from '@/src/providers/Auth'
import { Tab } from '@headlessui/react'
import React from 'react'

const UpdateBasicInfo = () => {
    const auth = useAuth();
    const onSubmit = async (data) => {
        if (!data) {
            return;
        }
        await auth.updateBasicInfo.dispatch(data);
    }
    return <><Typography.Body>Update info</Typography.Body><Form className="w-full gap-2 flex flex-col" onSubmit={onSubmit}>
        <Form.Input type="text" name="name" placeholder="Update your name" defaultValue={auth?.data?.name} className="w-full"  required />
        <Layout.Row className="justify-end">
            <Button type="Submit" className="btn-primary" loading={auth.updateBasicInfo.loading} disabled={auth.updateBasicInfo.loading}>Save</Button>
        </Layout.Row>
    </Form></>
}

const SettingsAccountBlock = () => {
    return (
        <Tab.Panel as={Layout.Col} className="gap-2">
            <Typography.Heading>Your Account</Typography.Heading>
            <UpdateBasicInfo />
        </Tab.Panel>
    )
}

export default SettingsAccountBlock;