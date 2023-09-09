import React, { useState } from 'react'
import styles from "./Navbar.module.css";
import Layout from '../../utils/Layout'
import Logo from '../../elements/Logo'
import Button from '../../utils/Button'
import Link from 'next/link'
import { useAuth } from '@/src/providers/Auth'
import AccountAvatar from '../../elements/Profile/AccountAvatar'
import PlaygroundIcon from "@heroicons/react/20/solid/CommandLineIcon";
import Dropdown from '../../utils/Dropdown';
import { Menu } from '@headlessui/react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import PlaygroundPlayIcon from "@heroicons/react/24/outline/CodeBracketIcon";
import AddDiagramOption, { AddDiagramDrawer } from './AddDiagramOption';
import Drawer from '../../utils/Drawer';


const PlaygroundAction = () => {
    const [drawerVisibility, mutateDrawerVisibility] = useState(false);
    const toggleDrawerVisibility = () => {
        mutateDrawerVisibility(prev => !prev);
    }
    return <> <Dropdown MenuBtn={<Button className="btn-icon text-center" href="/playground">
        <PlaygroundIcon className="w-6 h-6" />
    </Button>}>
        <Menu.Item as="span" className="p-2 hover:bg-white/10  cursor-pointer">
            <Link href="/playground" className="flex justify-between">
                Goto playground <PlaygroundPlayIcon className="w-5 h-5 ml-1" />
            </Link>
        </Menu.Item>
        <AddDiagramOption toggleDrawerVisibility={toggleDrawerVisibility} />
    </Dropdown>
        <AddDiagramDrawer open={drawerVisibility} onClose={toggleDrawerVisibility} />
    </>
}

const Navbar = () => {
    const auth = useAuth();
    return (
        <>
            <Logo />
            <Layout.Row className={styles.navbar_row}>
                <AccountAvatar />
                {!auth.data && <>
                    <Link href="/register"><Button className="btn-icon">Register</Button></Link>
                    <Link href="/login"><Button className="btn-secondary">Login</Button></Link>
                </>}
                <PlaygroundAction />
            </Layout.Row>
        </>
    )
}

export default Navbar