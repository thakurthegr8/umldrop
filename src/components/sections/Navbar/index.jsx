import React from 'react'
import styles from "./Navbar.module.css";
import Layout from '../../utils/Layout'
import Logo from '../../elements/Logo'
import Button from '../../utils/Button'
import Link from 'next/link'
import { useAuth } from '@/src/providers/Auth'
import AccountAvatar from '../../elements/Profile/AccountAvatar'
import PlaygroundIcon from "@heroicons/react/20/solid/CommandLineIcon";
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
                <Link className="btn-icon text-center" href="/playground"><PlaygroundIcon className="w-6 h-6" /></Link>
            </Layout.Row>
        </>
    )
}

export default Navbar