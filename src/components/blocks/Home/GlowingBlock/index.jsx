import Layout from '@/src/components/utils/Layout';
import React from 'react'

const HomeGlowingBlock = () => {
    return (
        <>
            <Layout.Col className="w-1/2 h-[200px] animate-pulse bg-white blur-3xl rounded-full bg-opacity-30 -z-30 left-16 top-20 absolute"></Layout.Col>
            <Layout.Col className="w-1/2 h-[200px] animate-pulse bg-yellow-500 rounded-full blur-3xl bg-opacity-50 -z-30 top-24  right-16  absolute"></Layout.Col>
        </>
    )
}

export default HomeGlowingBlock;