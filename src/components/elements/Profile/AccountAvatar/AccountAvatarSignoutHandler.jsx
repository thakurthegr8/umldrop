import React from 'react'
import LogOutIcon from "@heroicons/react/20/solid/ArrowLeftOnRectangleIcon";
import { Menu } from '@headlessui/react'
import Typography from '@/src/components/utils/Typography';
import { useAuth } from '@/src/providers/Auth';
import { useRouter } from 'next/router';

const AccountAvatarSignoutHandler = () => {
    const auth = useAuth();
    const router = useRouter();
    return (
        <Menu.Item
            as="div"
            onClick={() => null}
            className="p-2 w-full gap-2 text-left flex flex-row cursor-pointer items-center hover:bg-gray-100 dark:hover:bg-red-900/50 bg-red-900/30 text-red-500"
        >
            <LogOutIcon className="w-6 h-6" />
            <Typography.Caption
                className="text-sm"
                onClick={() => auth.signoutHandler.dispatch(null).then(res => router.reload("/"))}
            >
                Sign Out
            </Typography.Caption>
        </Menu.Item>
    )
}

export default AccountAvatarSignoutHandler