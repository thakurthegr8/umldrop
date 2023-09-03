import React from 'react';
import { Tab } from '@headlessui/react';
import Page from '@/src/components/pages';
import Navbar from '@/src/components/sections/Navbar';
import Layout from '@/src/components/utils/Layout';
import { LOGOTEXT } from '@/src/constants';
import supabaseClient from '@/src/services/supabase';
import ProfileOverviewBlock from '@/src/components/blocks/Profile/Overview';
import ProfileCollectionsBlock from '@/src/components/blocks/Profile/Collections';
import ProfileProvider from '@/src/providers/Profile';
import CollectionsProvider from '@/src/providers/Collections';

const ProfilePage = (props) => {
    console.log(props)
    return (
        <Page page={`${LOGOTEXT} | Collections`}>
            <Tab.Group>
                <Layout.Col className="border-b border-dark_secondary p-3">
                    <Layout.Row className="justify-between items-center">
                        <Navbar />
                    </Layout.Row>
                    <Tab.List as={Layout.Row}>
                        <Tab>Overview</Tab>
                        <Tab>Collections</Tab>
                    </Tab.List>
                </Layout.Col>
                <Tab.Panels className="bg-dark_secondary/30 min-h-screen">
                    <Tab.Panel><ProfileProvider value={props}><ProfileOverviewBlock /></ProfileProvider></Tab.Panel>
                    <Tab.Panel><CollectionsProvider value={props}><ProfileCollectionsBlock /></CollectionsProvider></Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Page >
    )
}

export default ProfilePage;


export const getServerSideProps = async (ctx) => {
    ctx.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const { profile } = ctx.query;
    try {
        const user = await supabaseClient.from("users").select("*").eq("username", profile).single();
        if (user.error) throw user.error;
        const collections = await supabaseClient.from("collections").select("*").eq("id", user.data.id);
        if (collections.error) throw collections.error;
        return {
            props: {
                user: user.data,
                collections: collections.data
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true
        }
    }
}