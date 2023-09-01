import React, { useState } from "react";
import axios from "axios";
import Layout from "@/src/components/utils/Layout";
import withURL from "@/src/middlewares/withUrl";
import QuestionProvider from "@/src/providers/QuestionProvider";
import CodeEditor from "@/src/components/blocks/Question/CodeEditor";
import Page from "@/src/components/pages";
import { LOGOTEXT } from "@/src/constants";
import QuestionNavbar from "@/src/components/blocks/Question/Navbar";
import MinusIcon from "@heroicons/react/20/solid/MagnifyingGlassMinusIcon";
import PlusIcon from "@heroicons/react/20/solid/MagnifyingGlassPlusIcon";
import ScaleIcon from "@heroicons/react/20/solid/ArrowsPointingOutIcon"
import Image from "next/image";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Button from "@/src/components/utils/Button";

const loader = ({ src }) => src;

const PlaygroundPage = (props) => {
    const [image, setImage] = useState(null);
   
    return <Page>
        <Layout.Grid className="w-full fixed bottom-0 inset-0 grid-cols-2">
            <QuestionNavbar />
            <QuestionProvider payload={props}>
                <Layout.Col className="w-full relative border-dark_secondary">
                    <CodeEditor setImage={setImage} />
                </Layout.Col>
                <Layout.Col className="items-center justify-center border-l border-dark_secondary overflow-scroll h-screen">
                    <Layout.Row className="sticky top-0 inset-x-0 w-full">
                        {/* <Button className="btn-primary" onClick={}>Download</Button> */}
                    </Layout.Row>
                    {image && <img
                        src={`https://plantuml.com/plantuml/svg/${image}`}
                        className="object-cover"
                    />}

                </Layout.Col>
            </QuestionProvider>
        </Layout.Grid>
    </Page>;
}

export default PlaygroundPage;