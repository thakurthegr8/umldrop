import React from 'react'
import LogOutIcon from "@heroicons/react/20/solid/ArrowLeftOnRectangleIcon";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react';
import { useAuth } from '@/src/providers/Auth'
import Avatar from '../Avatar';
import Typography from '../../utils/Typography';
import Layout from '../../utils/Layout';

const AccountAvatar = () => {
    const auth = useAuth();
    const router = useRouter();
    const name = auth?.data?.name;
    if (!auth.data) return null;
    return (
        <>
            <Menu className="relative z-10" as="div">
                <Menu.Button>
                    <Avatar seed={auth.data?.name} />
                </Menu.Button>
                <Menu.Items className="absolute w-72 right-0 bg-general border-dark_secondary border rounded-xl shadow-md flex-col overflow-hidden">
                    <Menu.Item>
                        <Link href="/me">
                            <Layout.Row className="p-2 gap-2 items-center border-b dark:border-white/20">
                            <Avatar seed={auth.data?.name} />
                                <Typography.Heading className="font-bold capitalize">
                                    {name}
                                </Typography.Heading>
                            </Layout.Row>
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        as="div"
                        onClick={() => null}
                        className="p-2 w-full gap-2 text-left flex flex-row cursor-pointer items-center hover:bg-gray-100 dark:hover:bg-white/10 "
                    >
                        <LogOutIcon className="w-6 h-6" />
                        <Typography.Caption
                            className="text-sm"
                            onClick={() => auth.signoutHandler.dispatch(null).then(res => router.reload("/"))}
                        >
                            Sign Out
                        </Typography.Caption>
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </>
    );
};


export default AccountAvatar