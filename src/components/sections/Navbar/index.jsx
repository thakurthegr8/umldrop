import React from 'react'
import styles from "./Navbar.module.css";
import Layout from '../../utils/Layout'
import Logo from '../../elements/Logo'
import Button from '../../utils/Button'
import Link from 'next/link'
import { useAuth } from '@/src/providers/Auth'
import AccountAvatar from '../../elements/Profile/AccountAvatar'

const Navbar = () => {
    const auth = useAuth();
    return (
        <>
            <Logo />
            <AccountAvatar />
            {!auth.data && <Layout.Row className={styles.navbar_row}>
                <Link href="/register"><Button className="btn-icon">Register</Button></Link>
                <Link href="/login"><Button className="btn-secondary">Login</Button></Link>
            </Layout.Row>}
        </>
    )
}

export default Navbar