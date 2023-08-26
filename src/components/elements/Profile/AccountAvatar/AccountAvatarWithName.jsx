import React from 'react'
import styles from "./AccountAvatar.module.css";
import Layout from '@/src/components/utils/Layout'
import { Menu } from '@headlessui/react'
import Avatar from '../../Avatar'
import { useAuth } from '@/src/providers/Auth'
import Typography from '@/src/components/utils/Typography'

const AccountAvatarWithName = () => {
    const auth = useAuth();
    const name = auth?.data?.name;
    return (
        <Menu.Item>
            <Layout.Row className={styles.with_name_row}>
                <Avatar seed={name} />
                <Layout.Col>
                    <Typography.Heading className={styles.with_name_name}>
                        {name}
                    </Typography.Heading>
                    <Typography.Caption className={styles.with_name_email}>
                        {auth?.data?.id}
                    </Typography.Caption>
                </Layout.Col>
            </Layout.Row>
        </Menu.Item>
    )
}

export default AccountAvatarWithName