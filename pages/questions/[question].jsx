
import Navbar from "@/src/components/sections/Navbar";
import Layout from "@/src/components/utils/Layout";
import withURL from "@/src/middlewares/withUrl";
import axios from "axios";
import QuestionProvider from "@/src/providers/QuestionProvider";
import CodeDescription from "@/src/components/blocks/Question/CodeDescription";
import CodeEditor from "@/src/components/blocks/Question/CodeEditor";
import { useAuth } from "@/src/providers/Auth";
import Page from "@/src/components/pages";
import { LOGOTEXT } from "@/src/constants";

export default function QuestionPage(props) {
    return <Page page={`${LOGOTEXT} | ${props.data.title}`}>
        <Layout.Grid className="w-full fixed bottom-0 inset-0 grid-cols-2">
            <Layout.Row className="justify-between items-center p-2 border-b col-span-2 border-dark_secondary"><Navbar /></Layout.Row>
            <QuestionProvider payload={props.data}>
                <Layout.Col className="gap-2 p-8 h-screen items-start overflow-y-scroll pb-32 mkdwn">
                    <CodeDescription />
                </Layout.Col>
                <Layout.Col className="w-full relative border-l border-dark_secondary">
                    <CodeEditor />
                </Layout.Col>
            </QuestionProvider>
        </Layout.Grid>
    </Page>;
}


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
