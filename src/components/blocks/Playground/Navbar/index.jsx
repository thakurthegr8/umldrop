import React from 'react'
import styles from "./PlaygroundNavbar.module.css";
import Navbar from '@/src/components/sections/Navbar';
import Layout from '@/src/components/utils/Layout';


const PlaygroundNavbar = () => {
    return (
        <Layout.Row className={styles.main}>
            <Navbar />
        </Layout.Row>
    )
}

export default PlaygroundNavbar;