
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
import { Tab } from "@headlessui/react";
import Button from "@/src/components/utils/Button";
import Submissions from "@/src/components/blocks/Question/Submissions";

const tabs = ["description", "submissions"]

export default function QuestionPage(props) {
    console.log(props.data)
    return <Page page={`${LOGOTEXT} | ${props.data.title}`}>
        <Layout.Grid className="w-full fixed bottom-0 inset-0 grid-cols-2">
            <Layout.Row className="justify-between items-center p-2 border-b col-span-2 border-dark_secondary"><Navbar /></Layout.Row>
            <QuestionProvider payload={props.data}>
                <Tab.Group as={Layout.Col} className="h-screen items-start overflow-y-scroll pb-32 relative mkdwn">
                    <Tab.List as={Layout.Row} className="items-center divide-x divide-dark_secondary border-b border-dark_secondary bg-general w-full sticky top-0">
                        {tabs.map((item, index) => <Tab key={item} className="capitalize rounded-none">{item}</Tab>)}
                    </Tab.List>
                    <Tab.Panels className="p-4">
                        <Tab.Panel className="gap-2" as={Layout.Col}>
                            <CodeDescription />
                        </Tab.Panel>
                        <Tab.Panel as={Layout.Col} className="h-full w-full">
                            <Submissions />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
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
