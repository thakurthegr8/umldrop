import React from 'react'
import styles from "./GlowingBlock.module.css";
import Layout from '@/src/components/utils/Layout';

const HomeGlowingBlock = () => {
    return (
        <Layout.Col className="relative items-end justify-center">
            <Layout.Col className={styles.lt_block}></Layout.Col>
            <Layout.Col className={styles.lt_1_block}></Layout.Col>
            <Layout.Col className={styles.lt_2_block}></Layout.Col>
        </Layout.Col>
    )
}

export default HomeGlowingBlock;