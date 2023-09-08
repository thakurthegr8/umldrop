import Layout from '@/src/components/utils/Layout'
import React from 'react'
import features from './constants'
import FeatureItem from './FeatureItem'
import Typography from '@/src/components/utils/Typography'
import Image from 'next/image'

const FeaturesBlock = () => {
    return (
        <Layout.Col className=" mt-16 gap-20">
            <Typography.Title className="font-bold md:text-5xl">{`Features that you'll love`}</Typography.Title>
            <Layout.Grid className="grid-cols-1 sm:grid-cols-3 gap-4">
                {
                    features.map((item, index) => <FeatureItem key={index} feature={item} />)
                }
            </Layout.Grid>
            <Layout.Col className="text-center items-center gap-4">
                <Typography.Title className="font-bold md:text-5xl">{`Stop right there`}</Typography.Title>
                <Typography.Body className="text-white/80 max-w-3xl">{`Harness the power of UMLDROP. Visualize your ideas, organize them with collections, and collaborate seamlessly. It's your canvas to sketch and innovate! Become a picasso of diagrams.`}</Typography.Body>
                <Layout.Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Image className='rounded-md' src="/assets/features_hero_1.jpg" width={400} height={600} alt="einstein in diagram making"/>
                <Image className='rounded-md' src="/assets/features_hero_2.jpg" width={400} height={600} alt="einstein in diagram making"/>
                <Image className='rounded-md h-full object-cover' src="/assets/features_hero_3.jpg" width={400} height={600} alt="einstein in diagram making" />
                </Layout.Grid>
            </Layout.Col>
        </Layout.Col>
    )
}

export default FeaturesBlock