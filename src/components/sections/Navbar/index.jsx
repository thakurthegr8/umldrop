import React from 'react'
import Layout from '../../utils/Layout'
import Typography from '../../utils/Typography'

const Navbar = () => {
    return (
        <Layout.Row className="p-4 z-10 border-b border-dark_secondary fixed inset-x-0 top-0  bg-black text-white">
            <Typography.Subtitle className="font-bold">Ace SQL</Typography.Subtitle>
        </Layout.Row>
    )
}

export default Navbar