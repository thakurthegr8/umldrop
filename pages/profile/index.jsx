import Avatar from '@/src/components/elements/Avatar';
import Page from '@/src/components/pages';
import Navbar from '@/src/components/sections/Navbar';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import withAuthPage from '@/src/middlewares/withAuthPage';
import { useAuth } from '@/src/providers/Auth';
import React from 'react'

const ProfilePage = () => {
    const auth = useAuth();
    console.log(auth)
    return (
        <Page>
            <Layout.Col>
                <Layout.Row className="p-2 border-b fixed inset-x-0 top-0 backdrop-blur-lg border-dark_secondary">
                    <Layout.Container className="max-w-4xl">
                        <Layout.Row className="justify-between items-center">
                            <Navbar />
                        </Layout.Row>
                    </Layout.Container>
                </Layout.Row>
                <Layout.Container className="max-w-4xl py-8 mt-24">
                    <Layout.Grid className="grid-cols-3 gap-2">
                        <Layout.Card>
                            <Layout.Col className="gap-2 items-center">
                                <Typography.Body className="medium text-secondary text-left w-full">Your Profile</Typography.Body>
                                <Avatar seed={auth?.data?.name} dimensions={[96, 96]} />
                                <Layout.Col className="w-full divide-y divide-dark_secondary gap-3">
                                    <Typography.Caption className="text-left capitalize">{auth?.data?.name}</Typography.Caption>
                                    <Typography.Caption className="text-left w-full pt-2">{auth?.data?.id}</Typography.Caption>
                                </Layout.Col>
                            </Layout.Col>
                        </Layout.Card>
                        <Layout.Card className="col-span-2">
                        <Typography.Body className="medium text-secondary text-left w-full">Your Progress</Typography.Body>
                        </Layout.Card>
                    </Layout.Grid>
                </Layout.Container>
            </Layout.Col>
        </Page>
    )
}

export default ProfilePage;


export const getServerSideProps = withAuthPage(async ctx => {
    console.log(ctx.req.user)
    return {
        props: {
        }
    }
})