import React from 'react'
import styles from "./AccountAvatar.module.css";
import LogOutIcon from "@heroicons/react/20/solid/ArrowLeftOnRectangleIcon";
import { Menu } from '@headlessui/react'
import Typography from '@/src/components/utils/Typography';
import { useAuth } from '@/src/providers/Auth';
import { useRouter } from 'next/router';

const AccountAvatarSignoutHandler = () => {
    const auth = useAuth();
    const router = useRouter();
    const signout = () => {
        auth.signoutHandler.dispatch(null).then(res => router.reload("/"))
    }
    return (
        <Menu.Item
            as="div"
            onClick={() => null}
            className={styles.signout_handler_main}
        >
            <LogOutIcon className={styles.signout_handler_logout_icon} />
            <Typography.Caption
                className={styles.signout_handler_caption_text}
                onClick={signout}
            >
                Sign Out
            </Typography.Caption>
        </Menu.Item>
    )
}

export default AccountAvatarSignoutHandler