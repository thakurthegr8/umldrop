import React from 'react'
import Layout from '../../utils/Layout'
import Logo from '../../elements/Logo'
import Button from '../../utils/Button'
import Link from 'next/link'
import { createAvatar } from '@dicebear/core';
import { avataaarsNeutral, initials } from '@dicebear/collection';
import { useAuth } from '@/src/providers/Auth'
import Image from 'next/image'
import Avatar from '../../elements/Avatar'
import AccountAvatar from '../../elements/Profile/AccountAvatar'

const Navbar = () => {
    const auth = useAuth();
    return (
        <>
            <Logo />
            <AccountAvatar />
            {!auth.data && <Layout.Row className="gap-2">
                <Link href="/register"><Button className="btn-sm btn-primary">Register</Button></Link>
                <Link href="/login"><Button className="btn-sm btn-secondary">Login</Button></Link>
            </Layout.Row>}
        </>
    )
}

export default Navbar