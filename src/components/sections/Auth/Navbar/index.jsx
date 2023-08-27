import React from 'react'
import styles from "./AuthNavbar.module.css";
import Layout from '@/src/components/utils/Layout';
import Navbar from '../../Navbar';

const AuthNavbar = () => {
  return (
    <Layout.Row className={styles.main}>
      <Navbar />
    </Layout.Row>
  )
}

export default AuthNavbar;