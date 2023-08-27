import React from "react";
import axios from "axios";
import Layout from "@/src/components/utils/Layout";
import withURL from "@/src/middlewares/withUrl";
import QuestionProvider from "@/src/providers/QuestionProvider";
import CodeEditor from "@/src/components/blocks/Question/CodeEditor";
import Page from "@/src/components/pages";
import { LOGOTEXT } from "@/src/constants";
import QuestionNavbar from "@/src/components/blocks/Question/Navbar";
import QuestionsTabSection from "@/src/components/sections/Question/QuestionsTab";


const QuestionPage = (props) => {
    return <Page page={`${LOGOTEXT} | ${props.data.title}`}>
        <Layout.Grid className="w-full fixed bottom-0 inset-0 grid-cols-2">
            <QuestionNavbar />
            <QuestionProvider payload={props.data}>
                <QuestionsTabSection />
                <Layout.Col className="w-full relative border-l border-dark_secondary">
                    <CodeEditor />
                </Layout.Col>
            </QuestionProvider>
        </Layout.Grid>
    </Page>;
}

export default QuestionPage;


export const getServerSideProps = withURL(async (ctx) => {
    const { url } = ctx.req;
    try {
        const res = await axios.get(`${url}/api/questions/${ctx.query.question}`);
        const data = await res.data;
        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.log(error)
        return {
            notFound: true
        }
    }

});
