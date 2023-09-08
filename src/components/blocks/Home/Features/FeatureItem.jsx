import Layout from '@/src/components/utils/Layout'
import Typography from '@/src/components/utils/Typography'
import React from 'react'

const FeatureItem = (props) => {
    const { feature } = props
    return (
        <Layout.Card className={feature.className}>
            <Layout.Col className="items-start justify-end h-full gap-2">
                {feature?.Icon && <Layout.Card className="bg-white/10">{feature.Icon}</Layout.Card>}
                <Typography.Heading className="font-bold text-left">{feature.feature}</Typography.Heading>
                <Typography.Caption className="text-left font-medium contrast-more:text-white/50">{feature.description}</Typography.Caption>
            </Layout.Col>
        </Layout.Card>
    )
}

export default FeatureItem