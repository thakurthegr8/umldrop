import Typography from '@/src/components/utils/Typography'
import { Menu } from '@headlessui/react'
import Link from 'next/link'
import React from 'react'

const AccountAvatarLink = (props) => {
    return (
        <Menu.Item
            as="div"
            onClick={() => null}
            className="w-full gap-2 text-left flex flex-row cursor-pointer items-center hover:bg-gray-100 dark:hover:bg-white/10"
        ><Link href={props.link} className="w-full p-2">
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