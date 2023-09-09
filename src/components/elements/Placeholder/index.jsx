import React from 'react'
import Layout from '../../utils/Layout';
import Typography from '../../utils/Typography';
import Image from 'next/image';

const Placeholder = (props) => {
    return (
        <Layout.Card className="flex flex-col bg-general/50 p-8 items-center justify-center gap-4">
            <Image src="/assets/no_data_placeholder.svg" width={200} height={200} alt={props.title} />
            <Layout.Col className="items-center justify-center gap-1 ">
                <Typography.Title className="font-bold">{props.title}</Typography.Title>
                <Typography.Body className="opacity-75">{props.description}</Typography.Body>
            </Layout.Col>
        </Layout.Card>
    )
}

export default Placeholder;

Placeholder.defaultProps = {
    title: "Placeholder title",
    description: "Placeholder description"
}