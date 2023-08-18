
import Navbar from "@/src/components/sections/Navbar";
import Layout from "@/src/components/utils/Layout";
import Typography from "@/src/components/utils/Typography"
import withURL from "@/src/middlewares/withUrl";
import axios from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import MarkdownIt from "markdown-it";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Editor } from "@monaco-editor/react";
import Button from "@/src/components/utils/Button"
import { useState } from "react";
import useFetch from "@/src/hooks/general/useFetch";
import { BeatLoader } from "react-spinners";
import SubmissionStatus from "@/src/components/blocks/Question/Editor/SubmissionStatus";

export default function QuestionPage(props) {
    const [result, setResult] = useState(props.data?.baseQuery);
    const runCode = useFetch({ url: "/api/solution/run", method: "POST" })
    const markDownIt = require('markdown-it'),
        md = new MarkdownIt();
    const mditResult = md.render(props.data.description ? props.data.description : "");

    const handleEditorChange = (editorResult) => {
        setResult(editorResult);
    }
    const handleSubmitCode = async () => {
        await runCode.dispatch({ questionId: props.data.id, userSolution: result })
    }
    return <Layout.Col className="w-full">
        <Navbar />
        <Layout.Col className="mt-16 fixed bottom-0 top-0 ">
            <Layout.Grid className="grid-cols-1 md:grid-cols-2 divide-x divide-dark_secondary">
                <Layout.Col className="gap-2 p-4 overflow-y-scroll h-screen pb-24 mkdwn">
                    <Typography.Title className="font-bold">{props.data.title}</Typography.Title>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} >{mditResult}</ReactMarkdown>
                </Layout.Col>
                <Layout.Col className="gap-2 w-full relative">
                    <Editor onChange={handleEditorChange} language="sql" height="80%" defaultValue={props.data?.baseQuery} theme="vs-dark" className="w-full" />
                    <Layout.Col>
                        {(runCode.data !== null || runCode.error !== null) && <SubmissionStatus runCode={runCode} />}
                        <Layout.Row className="px-4 justify-end">
                            <Button className="btn-secondary" onClick={handleSubmitCode} disabled={runCode.loading}>{runCode.loading ? <BeatLoader color="#ffffff" size={16} /> : "Run Code"}</Button>
                        </Layout.Row>
                    </Layout.Col>
                </Layout.Col>
            </Layout.Grid>
        </Layout.Col>
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
