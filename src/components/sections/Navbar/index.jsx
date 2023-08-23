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
        <Layout.Row className="p-4 justify-between items-center z-10 border-b border-dark_secondary fixed inset-x-0 top-0  bg-black text-white">
            <Logo />
            <AccountAvatar />
            {!auth.data && <Layout.Row className="gap-2">
                <Link href="/register"><Button className="btn-sm btn-primary">Register</Button></Link>
                <Link href="/login"><Button className="btn-sm btn-secondary">Login</Button></Link>
            </Layout.Row>}
        </Layout.Row>
    )
}

export default Navbar