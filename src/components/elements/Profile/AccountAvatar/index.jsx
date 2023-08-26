import React from 'react'
import LogOutIcon from "@heroicons/react/20/solid/ArrowLeftOnRectangleIcon";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react';
import { useAuth } from '@/src/providers/Auth'
import Avatar from '../../Avatar';
import Typography from '@/src/components/utils/Typography';
import Layout from '@/src/components/utils/Layout';
import AccountAvatarWithName from './AccountAvatarWithName';
import AccountAvatarSignoutHandler from './AccountAvatarSignoutHandler';
import AccountAvatarLink from './AccountAvatarLink';



const AccountAvatar = () => {
    const auth = useAuth();
    const router = useRouter();
    const name = auth?.data?.name;
    if (!auth.data) return null;
    return (
        <>
            <Menu className="relative z-10 backdrop-blur" as="div">
                <Menu.Button>
                    <Avatar seed={auth.data?.name} />
                </Menu.Button>
                <Menu.Items className="absolute w-72 right-0 bg-general backdrop-blur-sm border-dark_secondary border rounded-xl shadow-md flex-col overflow-hidden divide-y divide-dark_secondary/50">
                    <AccountAvatarWithName />
                    <AccountAvatarLink text="Performance" link="/profile" />
                    <AccountAvatarLink text="Settings" link="/settings" />
                    <AccountAvatarSignoutHandler />
                </Menu.Items>
            </Menu>
        </>
    );
};


export default AccountAvatar