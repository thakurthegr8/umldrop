import React from 'react';
import Link from 'next/link';
import styles from "./AccountAvatar.module.css";
import Typography from '@/src/components/utils/Typography'
import { Menu } from '@headlessui/react'

const AccountAvatarLink = (props) => {
    return (
        <Menu.Item
            as="div"
            className={styles.avatar_link_main}
        ><Link href={props.link} className={styles.avatar_link_link}>
                <Typography.Caption
                    className="text-sm"
                >
                    {props?.text}
                </Typography.Caption>
            </Link>
        </Menu.Item>
    )
}

export default AccountAvatarLink