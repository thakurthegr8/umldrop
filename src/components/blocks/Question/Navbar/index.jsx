import React from 'react'
import styles from "./QuestionNavbar.module.css";
import Navbar from '@/src/components/sections/Navbar';
import Layout from '@/src/components/utils/Layout';


const QuestionNavbar = () => {
    return (
        <Layout.Row className={styles.main}>
            <Navbar />
        </Layout.Row>
    )
}

export default QuestionNavbar;