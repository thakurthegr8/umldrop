import React from 'react'
import Layout from '../../utils/Layout'
import Logo from '../../elements/Logo'
import Button from '../../utils/Button'

const Navbar = () => {
    return (
        <Layout.Row className="p-4 justify-between items-center z-10 border-b border-dark_secondary fixed inset-x-0 top-0  bg-black text-white">
            <Logo/>
            <Layout.Row className="gap-2">
                <Button className="btn-sm btn-primary">Register</Button>
                <Button className="btn-sm btn-secondary">Login</Button>
            </Layout.Row>
        </Layout.Row>
    )
}

export default Navbar