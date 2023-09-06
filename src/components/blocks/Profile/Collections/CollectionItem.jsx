import React from 'react'
import Link from 'next/link';
import Badge from '@/src/components/elements/Badge';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';

const CollectionItem = (props) => {
    const { collection, user } = props;
    return (
        <Link href={`/${user.username}/${collection.name}`} >
            <Layout.Card className="hover:border-primary/40 active:border-primary transition-all active:bg-dark_secondary">
                <Layout.Row className="items-center justify-between">
                    <Typography.Body>{collection.name}</Typography.Body>
                    <Badge>{collection.private ? "Private" : "Public"}</Badge>
                </Layout.Row>
            </Layout.Card>
        </Link>
    )
}

export default CollectionItem