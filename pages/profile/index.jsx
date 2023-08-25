import ProfileProgress from '@/src/components/blocks/Profile/Progress';
import ProfileSolvedQuestions from '@/src/components/blocks/Profile/SolvedQuestions';
import Avatar from '@/src/components/elements/Avatar';
import Page from '@/src/components/pages';
import Navbar from '@/src/components/sections/Navbar';
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
                <Layout.Row className="p-2 border-b fixed inset-x-0 top-0 backdrop-blur-lg border-dark_secondary">
                    <Layout.Container className="max-w-4xl">
                        <Layout.Row className="justify-between items-center">
                            <Navbar />
                        </Layout.Row>
                    </Layout.Container>
                </Layout.Row>
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
                        <ProfileProgessProvider data={{ totalQuestions: props.totalQuestions, solvedQuestions: props.solvedQuestions }}>
                            <ProfileProgress />
                        </ProfileProgessProvider>
                        <ProfileSolvedQuestions questions={props.solvedQuestions} />
                    </Layout.Grid>
                </Layout.Container>
            </Layout.Col>
        </Page>
    )
}

export default ProfilePage;


export const getServerSideProps = withAuthPage(withURL(async ctx => {
    try {
        const questionsResponse = await axios.get(`${ctx.req.url}/api/questions`);
        const questions = await questionsResponse.data;
        const { data: submissionsData, error: submissionsError } =
            await supabaseClient
                .from("solved_submissions_view_4")
                .select("*")
                .eq("id", ctx.req.user);
        if (submissionsError) throw submissionsError;
        return {
            props: {
                solvedQuestions: submissionsData,
                totalQuestions: questions
            }
        }
    } catch (error) {
        console.log(error)
        return {
            notFound: true
        }
    }
}))