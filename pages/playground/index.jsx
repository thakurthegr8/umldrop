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

const loader = ({ src }) => src;

const PlaygroundPage = (props) => {
    const [image, setImage] = useState(props.query?.encoded_string);
    return <Page>
        <Layout.Grid className="w-full fixed bottom-0 inset-0 grid-cols-2">
            <PlaygroundNavbar />
            <DiagramProvider payload={props.query}>
                <Layout.Col className="w-full relative border-dark_secondary">
                    <CodeEditor setImage={setImage} image={image} />
                </Layout.Col>
                <Layout.Col className="items-center justify-center border-l border-dark_secondary overflow-scroll h-screen">
                    <Layout.Row className="sticky top-0 inset-x-0 w-full">
                        {/* <Button className="btn-primary" onClick={}>Download</Button> */}
                    </Layout.Row>
                    {image && <img
                        src={`https://plantuml.com/plantuml/png/${image}`}
                        className="object-cover"
                    />}

                </Layout.Col>
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