import Layout from '@/src/components/utils/Layout';
import React from 'react'
import Navbar from '../../Navbar';

const AuthNavbar = () => {
  return (
    <Layout.Row className="col-span-2 items-center justify-between p-3 border-b backdrop-blur border-dark_secondary">
      <Navbar />
    </Layout.Row>
  )
}

export default AuthNavbar;