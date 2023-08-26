import React from 'react'
import Typography from '@/src/components/utils/Typography'
import { HOME_DESCRIPTION, HOME_HEADING } from '@/src/constants/home';

const HomeHeroBlock = () => {
    return (
        <>
            <Typography.Title className="font-bold text-center text-5xl lg:text-8xl tracking-tighter leading-tight">{HOME_HEADING}</Typography.Title>
            <Typography.Body className="text-center text-secondary max-w-3xl">{HOME_DESCRIPTION}</Typography.Body>
        </>
    )
}

export default HomeHeroBlock;