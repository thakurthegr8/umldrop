import Layout from '@/src/components/utils/Layout'
import React from 'react'
import Navbar from '../../Navbar'

const CollectionNavbar = () => {
    return (
        <Layout.Row className="justify-between items-center">
            <Navbar />
        </Layout.Row>
    )
}

export default CollectionNavbar