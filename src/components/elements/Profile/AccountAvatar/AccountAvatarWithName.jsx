import Layout from '@/src/components/utils/Layout'
import { Menu } from '@headlessui/react'
import Link from 'next/link'
import React from 'react'
import Avatar from '../../Avatar'
import { useAuth } from '@/src/providers/Auth'
import Typography from '@/src/components/utils/Typography'

const AccountAvatarWithName = () => {
    const auth = useAuth();
    const name = auth?.data?.name;
    return (
        <Menu.Item>
            <Link href="/me">
                <Layout.Row className="p-2 gap-2 items-center border-b dark:border-white/20 bg-dark_secondary/30">
                    <Avatar seed={name} />
                    <Layout.Col>
                        <Typography.Heading className="font-bold capitalize">
                            {name}
                        </Typography.Heading>
                        <Typography.Caption className="font-medium overflow-hidden text-secondary">
                            {auth?.data?.id}
                        </Typography.Caption>
                    </Layout.Col>
                </Layout.Row>
            </Link>
        </Menu.Item>
    )
}

export default AccountAvatarWithName