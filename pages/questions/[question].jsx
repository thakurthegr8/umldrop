
import Navbar from "@/src/components/sections/Navbar";
import Layout from "@/src/components/utils/Layout";
import withURL from "@/src/middlewares/withUrl";
import axios from "axios";
import QuestionProvider from "@/src/providers/QuestionProvider";
import CodeDescription from "@/src/components/blocks/Question/CodeDescription";
import CodeEditor from "@/src/components/blocks/Question/CodeEditor";

export default function QuestionPage(props) {
    return <Layout.Col className="w-full">
        <Navbar />
        <QuestionProvider payload={props.data}>
            <Layout.Col className="mt-16 fixed bottom-0 top-0 ">
                <Layout.Grid className="grid-cols-1 md:grid-cols-2 divide-x divide-dark_secondary">
                    <Layout.Col className="gap-2 p-4 overflow-y-scroll h-screen pb-24 mkdwn">
                        <CodeDescription />
                    </Layout.Col>
                    <Layout.Col className="gap-2 w-full relative">
                        <CodeEditor/>
                    </Layout.Col>
                </Layout.Grid>
            </Layout.Col>
        </QuestionProvider>
    </Layout.Col>;
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
