import React from 'react'
import styles from "./Hero.module.css";
import Typography from '@/src/components/utils/Typography'
import { HOME_DESCRIPTION, HOME_HEADING } from '@/src/constants/home';
import Layout from '@/src/components/utils/Layout';
import Button from '@/src/components/utils/Button';
import Image from 'next/image';
import ArrowLeftOnRectangleIcon from '@heroicons/react/20/solid/ArrowRightIcon';

const loader = ({ src }) => src;

const HomeHeroBlock = () => {
    const src = "https://www.plantuml.com/plantuml/dpng/TP71Ri8m38RlVGgFEo_0OGA9ZSicq3QqiqdT4k4cKUt0jgTV0crLL76fqlZxV_jtbgBOQcouUD8ZDGH7D2Tg2pJgMzXBEeO4M6C3EeLlEgn201IOxT_VrX_RtUoklkFqJPKlx_bAzHUGRsP5aHrX_jmPBM0Ro0card2X0s08R0sgzQxeMiqJd4KBM5i9ZBy220Q3sdFYN0tMARKL6ffuRqZbLYPHAW5T2VGJsAT_g0WrfiD4jIPZomIe1x6rWnZwKOP9Tab7JWNmYiG0bM-RYTEhPSu3v7XZSEAtCYVdBqnbJG8IZI6HAdAdcIxjfGynRDSsM5EVQU37hx60p_pI0gQbs-BknLACQPYFmlfpjn3FaWFS19sHTm_QxTMo_HiFEOHyr6f3ZbfKaibiIt9bRFWV";
    return (<>
        <Typography.Subtitle className={styles.hero_heading}>{HOME_HEADING}</Typography.Subtitle>
        <Typography.Heading className={styles.hero_description}>{HOME_DESCRIPTION}</Typography.Heading>
        <Layout.Row>
            <Button className="btn-primary rounded-full btn-lg hover:gap-2 transition-all">
                <Typography.Caption className="text-lg font-semibold">Start Umldrop today</Typography.Caption>
                <ArrowLeftOnRectangleIcon className="w-8 h-8" /></Button>
        </Layout.Row>
        <Layout.Card className="w-full flex flex-col justify-center items-center backdrop-blur-lg">
            <Image src={src} loader={loader} width={600} height={600} style={{ objectFit: "cover" }} />
        </Layout.Card>
    </>
    )
}

export default HomeHeroBlock;