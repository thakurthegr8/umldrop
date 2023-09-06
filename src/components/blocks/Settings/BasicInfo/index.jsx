import React from 'react'
import Avatar from '@/src/components/elements/Avatar';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import { useAuth } from '@/src/providers/Auth';

const SettingsBasicInfoBlock = () => {
    const auth = useAuth();
    return (
        <Layout.Card className="flex gap-2 items-center overflow-hidden">
            <Avatar seed={auth?.data?.name} dimensions={[84, 84]} />
            <Layout.Col>
                <Typography.Subtitle className="capitalize font-bold">{auth?.data?.name}</Typography.Subtitle>
                <Typography.Body className="text-secondary text-ellipsis w-full">{auth?.data?.id}</Typography.Body>
            </Layout.Col>
        </Layout.Card>
    )
}

export default SettingsBasicInfoBlock;