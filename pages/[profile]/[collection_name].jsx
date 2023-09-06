import React from 'react'
import Page from '@/src/components/pages';
import Navbar from '@/src/components/sections/Navbar';
import Layout from '@/src/components/utils/Layout';
import { LOGOTEXT } from '@/src/constants';
import supabaseClient from '@/src/services/supabase';
import { useAuth } from '@/src/providers/Auth';
import CollectionHeaderBlock from '@/src/components/blocks/Collection/Header';
import CollectionDiagramsBlock from '@/src/components/blocks/Collection/Diagrams';
import CollectionNavbar from '@/src/components/sections/Collection/Navbar';

const CollectionPage = (props) => {
    const { collection, diagrams, profile } = props;
    const auth = useAuth();
    const authorised = auth.data && auth.data.username === profile;
    return (
        <Page page={`${LOGOTEXT} | ${collection.name}`}>
            <Layout.Col className="border-b border-dark_secondary p-3">
                <CollectionNavbar />
            </Layout.Col>
            <Layout.Col className="bg-dark_secondary/20 min-h-screen">
                <Layout.Container className="max-w-6xl">
                    <Layout.Col>
                        <CollectionHeaderBlock collection={collection} authorised={authorised} />
                        <CollectionDiagramsBlock diagrams={diagrams} authorised={authorised} />
                    </Layout.Col>
                </Layout.Container>
            </Layout.Col>
        </Page>
    )
}

export default CollectionPage;

export const getServerSideProps = async (ctx) => {
    ctx.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );
    const { profile, collection_name } = ctx.query;
    try {
        const user = await supabaseClient.from("users").select("id").eq("username", profile).single();
        if (user.error) throw user.error;
        const collection = await supabaseClient
            .from("collections")
            .select("*")
            .eq("id", user.data.id)
            .eq("name", collection_name)
            .single();
        if (collection.error) throw collection.error;
        const diagrams = await supabaseClient
            .from("diagrams")
            .select("*")
            .eq("owner", user.data.id)
            .eq("collection_name", collection_name);
        if (diagrams.error) throw diagrams.error;
        return {
            props: {
                collection: collection.data,
                diagrams: diagrams.data,
                profile
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true
        }
    }
}