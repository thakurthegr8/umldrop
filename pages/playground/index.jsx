import React, { useState } from "react";
import axios from "axios";
import Layout from "@/src/components/utils/Layout";
import withURL from "@/src/middlewares/withUrl";
import DiagramProvider from "@/src/providers/QuestionProvider";
// import CodeEditor from "@/src/components/blocks/Question/CodeEditor";
import Page from "@/src/components/pages";
import PlaygroundNavbar from "@/src/components/blocks/Playground/Navbar";
import CodeEditor from "@/src/components/blocks/Playground/CodeEditor";
import Joi from "joi";
import PlantUmlEncoder from "plantuml-encoder";
import withAuthPage from "@/src/middlewares/withAuthPage";
import { playgroundAddValidator, playgroundEditValidator } from "@/src/utils/validators";
import Modal from "@/src/components/utils/Modal";
import Button from "@/src/components/utils/Button";
import { useMediaQuery } from "@uidotdev/usehooks";

const DiagramImage = (props) => {
    if (!props?.image) return null
    return <img
        src={`https://plantuml.com/plantuml/png/${props.image}`}
        className="object-cover"
    />
}

const PlaygroundPage = (props) => {
    const [image, setImage] = useState(props.query?.encoded_string);
    const smallDevice = useMediaQuery("only screen and (max-width : 768px)")
    const [modalOpen, setModalOpen] = useState(false);
    const toggle = () => {
        setModalOpen(prev => !prev)
    }
    return <Page>
        <Layout.Grid className="w-full fixed bottom-0 inset-0 grid-cols-1 md:grid-cols-2">
            <PlaygroundNavbar />
            <DiagramProvider payload={props.query}>
                <Layout.Col className="w-full relative border-dark_secondary">
                    <Layout.Row className="fixed bottom-0 p-3 inset-x-0 z-10 flex justify-end md:hidden bg-general border-t border-dark_secondary">
                        <Button className="btn-secondary" onClick={toggle}>Show Diagram</Button>
                    </Layout.Row>
                    <CodeEditor setImage={setImage} image={image} />
                    {smallDevice && <Modal open={modalOpen} onClose={toggle}>
                        <Layout.Col className="w-screen items-center justify-center overflow-scroll h-screen aspect-square">
                            <DiagramImage image={image} />
                        </Layout.Col>
                    </Modal>}
                </Layout.Col>
                {!smallDevice && <Layout.Col className="items-center hidden md:flex justify-center border-l border-dark_secondary overflow-scroll h-screen">
                    {image && <DiagramImage image={image} />}
                </Layout.Col>}
            </DiagramProvider>
        </Layout.Grid>
    </Page>;
}

export default PlaygroundPage;

export const getServerSideProps = async (ctx) => {
    const { query } = ctx;
    if (!query?.action_type) return {
        props: {
            query
        }
    };
    if (query.action_type === "add") {
        try {
            await playgroundAddValidator.validateAsync({
                collection_name: query.collection_name,
                name: query.name
            })
            return { props: { query } }
        } catch (error) {
            return {
                notFound: true
            }
        }
    }
    if (query.action_type === "edit") {
        try {
            PlantUmlEncoder.decode(query.encoded_string)
            await playgroundEditValidator.validateAsync({
                id: query?.id,
                collection_name: query?.collection_name,
                encoded_string: query?.encoded_string
            })
            return {
                props: {
                    query
                }
            }
        } catch (error) {
            console.log(error);
            return {
                notFound: true
            }
        }
    }
    return { notFound: true }
}