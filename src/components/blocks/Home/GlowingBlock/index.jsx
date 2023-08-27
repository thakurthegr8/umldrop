import React from 'react'
import styles from "./GlowingBlock.module.css";
import Layout from '@/src/components/utils/Layout';

const HomeGlowingBlock = () => {
    return (
        <>
            <Layout.Col className={styles.lt_block}></Layout.Col>
            <Layout.Col className={styles.rt_block}></Layout.Col>
        </>
    )
}

export default HomeGlowingBlock;