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

const loader = ({ src }) => src;

const PlaygroundEditPage = (props) => {
    const [image, setImage] = useState(props.query.encoded_string);

    return <Page>
        <Layout.Grid className="w-full fixed bottom-0 inset-0 grid-cols-2">
            <PlaygroundNavbar />
            <DiagramProvider payload={props.query}>
                <Layout.Col className="w-full relative border-dark_secondary">
                    <CodeEditor setImage={setImage} />
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

export default PlaygroundEditPage;

export const getServerSideProps = withAuthPage(async (ctx) => {
    const { query } = ctx;
    const schema = Joi.object({
        id: {
            type: Joi.string().required,
        },
        collection_name: {
            type: Joi.string().required()
        },
        encoded_string: {
            type: Joi.string().required()
        }
    });
    try {
        const decodedString = PlantUmlEncoder.decode(query.encoded_string)
        console.log(decodedString);
        await schema.validate({
            id: query.id,
            collection_name: query.id,
            encoded_string: query.encoded_string
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
})