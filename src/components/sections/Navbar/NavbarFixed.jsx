import React from 'react'
import Layout from '../../utils/Layout';
import Navbar from '.';

const NavbarFixed = () => {
    return (
        <Layout.Row className="p-2 border-b fixed inset-x-0 top-0 backdrop-blur-lg border-dark_secondary">
            <Layout.Container className="max-w-4xl">
                <Layout.Row className="justify-between items-center">
                    <Navbar />
                </Layout.Row>
            </Layout.Container>
        </Layout.Row>
    )
}

export default NavbarFixed;