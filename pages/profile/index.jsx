import ProfileProgress from '@/src/components/blocks/Profile/Progress';
import ProfileSolvedQuestions from '@/src/components/blocks/Profile/SolvedQuestions';
import Avatar from '@/src/components/elements/Avatar';
import Page from '@/src/components/pages';
import Navbar from '@/src/components/sections/Navbar';
import NavbarFixed from '@/src/components/sections/Navbar/NavbarFixed';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import withAuthPage from '@/src/middlewares/withAuthPage';
import withURL from '@/src/middlewares/withUrl';
import { useAuth } from '@/src/providers/Auth';
import ProfileProgessProvider from '@/src/providers/Profile/Progress';
import supabaseClient from '@/src/services/supabase';
import axios from 'axios';
import React from 'react'

const ProfilePage = (props) => {
    const auth = useAuth();
    return (
        <Page>
            <Layout.Col>
                <NavbarFixed />
                <Layout.Container className="max-w-4xl py-8 mt-20">
                    <Layout.Grid className="grid-cols-1 sm:grid-cols-3 gap-2">
                        <Layout.Card className="col-span-1">
                            <Layout.Col className="gap-2 items-center">
                                <Typography.Body className="font-semibold text-secondary text-left w-full">Your Profile</Typography.Body>
                                <Avatar seed={auth?.data?.name} dimensions={[96, 96]} />
                                <Layout.Col className="w-full divide-y divide-dark_secondary gap-3">
                                    <Typography.Caption className="text-left capitalize">{auth?.data?.name}</Typography.Caption>
                                    <Typography.Caption className="text-left w-full pt-2">{auth?.data?.id}</Typography.Caption>
                                </Layout.Col>
                            </Layout.Col>
                        </Layout.Card>
                    </Layout.Grid>
                </Layout.Container>
            </Layout.Col>
        </Page>
    )
}

export default ProfilePage;


