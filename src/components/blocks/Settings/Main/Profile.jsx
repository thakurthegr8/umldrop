import Button from '@/src/components/utils/Button'
import Form from '@/src/components/utils/Form'
import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import { useAuth } from '@/src/providers/Auth'
import { Tab } from '@headlessui/react'
import React from 'react'

const UpdateProfileInfo = () => {
    const auth = useAuth();
    const onSubmit = async (data) => {
        if (!data) {
            return;
        }
        await auth.updateProfileInfo.dispatch(data);
    }
    return <><Typography.Body>Update info</Typography.Body><Form className="w-full gap-2 flex flex-col" onSubmit={onSubmit}>
        <Form.Input type="text" name="username" placeholder="Update your name" defaultValue={auth?.data?.username} className="w-full"  required />
        <Layout.Row className="justify-end">
            <Button type="Submit" className="btn-primary" loading={auth.updateProfileInfo.loading} disabled={auth.updateProfileInfo.loading}>Save</Button>
        </Layout.Row>
    </Form></>
}

const SettingsProfileBlock = () => {
    return (
        <Tab.Panel as={Layout.Col} className="gap-2">
            <Typography.Heading>Your Profile</Typography.Heading>
            <UpdateProfileInfo />
        </Tab.Panel>
    )
}

export default SettingsProfileBlock;