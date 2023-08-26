import React from 'react';
import styles from "./NavbarFixed.module.css";
import Layout from '../../utils/Layout';
import Navbar from '.';

const NavbarFixed = () => {
    return (
        <Layout.Row className={styles.main}>
            <Layout.Container className={styles.main_container}>
                <Layout.Row className={styles.navbar_row}>
                    <Navbar />
                </Layout.Row>
            </Layout.Container>
        </Layout.Row>
    )
}

export default NavbarFixed;