import Badge from '@/src/components/elements/Badge';
import Button from '@/src/components/utils/Button';
import Drawer from '@/src/components/utils/Drawer';
import Form from '@/src/components/utils/Form';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import { useAuth } from '@/src/providers/Auth';
import { useCollections } from '@/src/providers/Collections';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ProfileAddCollectionElement = () => {
    const auth = useAuth();
    const [drawerOpen, toggleDrawer] = useState(false);
    const collections = useCollections();
    const onSubmit = async (data) => {
        const res = await collections.addCollections.dispatch(data);
        if (res.error) {
            toast(res.error.message, { type: "error" })
        } else if (res.data) {
            collections.mutate((state) => [...state, res.data]);
            toggle();
        }
    }
    const toggle = () => {
        toggleDrawer(prevValue => !prevValue);
    }
    if (!auth.data) return null;
    return auth.data ? <Layout.Row className="justify-start">
        <Button className="btn-primary" onClick={toggle}>New</Button>
        <Drawer open={drawerOpen} onClose={toggle} title="Add Collection">
            <Form onSubmit={onSubmit}>
                <Layout.Col className="p-4 gap-4">
                    <Form.Input type="text" name="name" placeholder="Enter name" required />
                    <Form.Input type="text" name="description" placeholder="Enter description" required />
                    <Layout.Row>
                        <Button className="btn-primary" loading={collections.addCollections.loading}>Submit</Button>
                    </Layout.Row>
                </Layout.Col>
            </Form>
        </Drawer>
    </Layout.Row> : null;

}

const ProfileCollectionsBlock = () => {
    const { collections, user } = useCollections();

    return (
        <Layout.Container className="p-4">
            <Layout.Col className="gap-4">
                <ProfileAddCollectionElement />
                {collections.length !== 0 ?
                    <Layout.Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {collections.map((item, index) => {
                            return <Link href={`/${user.username}/${item.name}`} key={index}>
                                <Layout.Card className="hover:border-primary transition-all active:bg-dark_secondary">
                                    <Layout.Row className="items-center justify-between">
                                        <Typography.Body>{item.name}</Typography.Body>
                                        <Badge>{item.private ? "Private" : "Public"}</Badge>
                                    </Layout.Row>
                                </Layout.Card>
                            </Link>
                        })}
                    </Layout.Grid> : <Typography.Body>No collections for now</Typography.Body>}
            </Layout.Col>
        </Layout.Container >
    )
}

export default ProfileCollectionsBlock;