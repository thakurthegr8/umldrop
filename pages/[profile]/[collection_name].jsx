import moment from 'moment';
import Image from 'next/image';
import React, { useState } from 'react'
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import DownloadIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import Page from '@/src/components/pages';
import Navbar from '@/src/components/sections/Navbar';
import Button from '@/src/components/utils/Button';
import Layout from '@/src/components/utils/Layout';
import Typography from '@/src/components/utils/Typography';
import { LOGOTEXT } from '@/src/constants';
import supabaseClient from '@/src/services/supabase';
import { imageLoader } from '@/src/utils/images';
import { useAuth } from '@/src/providers/Auth';
import Modal from '@/src/components/utils/Modal';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Drawer from '@/src/components/utils/Drawer';
import Form from '@/src/components/utils/Form';

const CollectionPage = (props) => {
    const { collection, diagrams } = props;
    const router = useRouter();
    const auth = useAuth();
    const [isModalOpen, setShowModal] = useState(false);
    const [isAddDrawerOpen, setShowDrawer] = useState(false);
    const [diagram, setCurrentDiagram] = useState(null);

    const toggleModal = () => {
        setShowModal(prev => !prev);
    }

    const toggleDrawer = () => {
        setShowDrawer(prev => !prev);
    }
    const onAddDiagramFormSubmit = (payload) => {
        router.push(`/playground?action_type=add&name=${payload.name}&collection_name=${payload.collection_name}`);
    }


    return (
        <Page page={`${LOGOTEXT} | ${collection.name}`}>
            <Layout.Col className="border-b border-dark_secondary p-3">
                <Layout.Row className="justify-between items-center">
                    <Navbar />
                </Layout.Row>
            </Layout.Col>
            <Layout.Container className="max-w-6xl">
                <Layout.Col>
                    <Layout.Col className="sm:items-center sm:justify-between sm:flex-row py-4 gap-4">
                        <Layout.Col>
                            <Typography.Title className="font-bold">{collection.name}</Typography.Title>
                            <Typography.Body className="text-white/80 first-letter:capitalize">{collection.description}</Typography.Body>
                        </Layout.Col>
                        {auth.data && <Button className="btn-secondary font-semibold" onClick={toggleDrawer}>Add New Diagram <PlusIcon className='w-5 h-5 ml-1 font-bold' /></Button>}
                    </Layout.Col>
                    <Layout.Col>
                        {diagrams.length !== 0 ?
                            <Layout.Grid className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {diagrams.map((item) => <Layout.Col key={item.id} className="border border-dark_secondary divide-y divide-dark_secondary rounded-md overflow-hidden hover:bg-dark_secondary/50 cursor-pointer justify-between ">
                                    <Image className="w-full h-full object-cover" src={`https://www.plantuml.com/plantuml/png/${item.encoded_string}`} quality={100} width={350} height={350} alt={item.name} loader={imageLoader} />
                                    <Layout.Col className="p-2 gap-2">
                                        <Layout.Col>
                                            <Typography.Caption className="capitalize font-medium overflow-hidden text-ellipsis">{item.name}</Typography.Caption>
                                            <Typography.Caption className="capitalize text-xs text-white/80">Created at {moment(item.created_At).fromNow("MMMM Do YYYY, h:mm a")}</Typography.Caption>
                                        </Layout.Col>
                                        <Layout.Row className="gap-2">
                                            <Button className="btn-secondary text-xs" onClick={() => {
                                                setCurrentDiagram(item);
                                                toggleModal();
                                            }}><EyeIcon className='w-5 h-5 font-bold' /></Button>
                                            <Link href={`/playground?action_type=edit&id=${item.id}&collection_name=${item.collection_name}&encoded_string=${item.encoded_string}`}>
                                                <Button className="btn-icon"><PencilIcon className='w-4 h-4 font-bold' /></Button>
                                            </Link>
                                        </Layout.Row>
                                    </Layout.Col>
                                </Layout.Col>)}
                            </Layout.Grid> :
                            <Typography>No diagrams for now</Typography>}
                    </Layout.Col>
                </Layout.Col>
            </Layout.Container>
            <Drawer open={isAddDrawerOpen} onClose={toggleDrawer} title="Add Diagram">
                <Form onSubmit={onAddDiagramFormSubmit}>
                    <Layout.Col className="p-4 gap-2">
                        <Form.Input type="text" name="name" placeholder="Enter name..." required/>
                        <Form.Input type="text" name="collection_name" placeholder="Enter collection name..." required/>
                        <Button className="btn-primary">Create Diagram</Button>
                    </Layout.Col>
                </Form>
            </Drawer>
            <Modal open={isModalOpen} onClose={toggleModal} title="View Diagram">
                <Layout.Col className="h-full w-full">
                    <Layout.Row className="p-4 justify-end gap-2">
                        <Button className="bg-dark_secondary/50 border border-dark_secondary">Download<DownloadIcon className='w-4 h-4 ml-1' /></Button>
                        {auth.data && <Button className="btn-primary">Edit <PencilIcon className='w-3 h-3 ml-1' /></Button>}
                        {auth.data && <Button className="bg-red-900/50 text-red-500"><TrashIcon className='w-5 h-5' /></Button>}
                    </Layout.Row>
                    <img src={`https://www.plantuml.com/plantuml/png/${diagram?.encoded_string}`} alt={diagram?.name} />
                </Layout.Col>
            </Modal>
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
                diagrams: diagrams.data
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true
        }
    }
}