import React from 'react'
import styles from "./AccountAvatar.module.css";
import { Menu } from '@headlessui/react';
import { useAuth } from '@/src/providers/Auth'
import Avatar from '../../Avatar';
import AccountAvatarWithName from './AccountAvatarWithName';
import AccountAvatarSignoutHandler from './AccountAvatarSignoutHandler';
import AccountAvatarLink from './AccountAvatarLink';
import { links } from './constants';

const AccountAvatar = () => {
    const auth = useAuth();
    if (!auth.data) return null;
    return (
        <>
            <Menu className={styles.main} as="div">
                <Menu.Button>
                    <Avatar seed={auth.data?.name} />
                </Menu.Button>
                <Menu.Items className={styles.main_menu_items}>
                    <AccountAvatarWithName />
                    {links.map((item, index) => <AccountAvatarLink {...item} key={index} />)}
                    <AccountAvatarSignoutHandler />
                </Menu.Items>
            </Menu>
        </>
    );
};


export default AccountAvatar