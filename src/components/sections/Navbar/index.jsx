import React from 'react'
import Layout from '../../utils/Layout'
import Typography from '../../utils/Typography'
import Logo from '../../elements/Logo'

const Navbar = () => {
    return (
        <Layout.Row className="p-4 z-10 border-b border-dark_secondary fixed inset-x-0 top-0  bg-black text-white">
            <Logo/>
        </Layout.Row>
    )
}

export default Navbar