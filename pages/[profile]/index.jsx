import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon"
import CollectionIcon from "@heroicons/react/24/outline/InboxIcon"
import Page from '@/src/components/pages';
import Navbar from '@/src/components/sections/Navbar';
import Layout from '@/src/components/utils/Layout';
import { LOGOTEXT } from '@/src/constants';
import supabaseClient from '@/src/services/supabase';
import ProfileOverviewBlock from '@/src/components/blocks/Profile/Overview';
import ProfileCollectionsBlock from '@/src/components/blocks/Profile/Collections';
import ProfileProvider from '@/src/providers/Profile';
import CollectionsProvider from '@/src/providers/Collections';
import Typography from '@/src/components/utils/Typography';

const tabItems = [
    { tab: "overview", Icon: <UserCircleIcon className='w-5 h-5 ml-1' /> },
    { tab: "collections", Icon: <CollectionIcon className='w-5 h-5 ml-1' /> }
]

const ProfilePage = (props) => {
    return (
        <Page page={`${LOGOTEXT} | Collections`}>
            <Tab.Group>
                <Layout.Col className="border-dark_secondary">
                    <Layout.Row className="justify-between items-center p-3">
                        <Navbar />
                    </Layout.Row>
                    <Tab.List as={Layout.Row} className="px-3 border-b border-dark_secondary gap-2 transition-all font-medium">
                        {tabItems.map(item => (<Tab key={item.tab} className="capitalize p-2 cursor-pointer" as={Fragment}>
                            {({ selected }) => <Typography.Caption className={selected ? "border-b-2 bg-dark_secondary rounded-t flex items-center" : "border-b  border-black rounded-t hover:bg-dark_secondary flex items-center"}>{item.tab}{item.Icon}</Typography.Caption>}
                        </Tab>))}
                    </Tab.List>
                </Layout.Col>
                <Tab.Panels className="bg-dark_secondary/30  min-h-screen">
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