import React from 'react'
import styles from "./Hero.module.css";
import Typography from '@/src/components/utils/Typography'
import { HOME_DESCRIPTION, HOME_HEADING } from '@/src/constants/home';

const HomeHeroBlock = () => {
    return (
        <>
            <Typography.Title className={styles.hero_heading}>{HOME_HEADING}</Typography.Title>
            <Typography.Body className={styles.hero_description}>{HOME_DESCRIPTION}</Typography.Body>
        </>
    )
}

export default HomeHeroBlock;