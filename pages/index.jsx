
import Badge from "@/src/components/elements/Badge";
import Page from "@/src/components/pages";
import Navbar from "@/src/components/sections/Navbar";
import Layout from "@/src/components/utils/Layout";
import Typography from "@/src/components/utils/Typography"
import withURL from "@/src/middlewares/withUrl";
import axios from "axios";
import Link from "next/link";

const colors = {
  "Hard": "red",
  "Medium": "yellow",
  "Easy": "green"
}

export default function Home(props) {

  return <Page> <Layout.Col className="w-full">
    <Navbar />
    <Layout.Container className="max-w-5xl py-8 mt-24">
      <Layout.Col className="w-1/2 h-[200px] animate-pulse bg-white blur-3xl rounded-full bg-opacity-30 -z-30 left-16 top-20 absolute"></Layout.Col>
      <Layout.Col className="w-1/2 h-[200px] animate-pulse bg-yellow-500 rounded-full blur-3xl bg-opacity-50 -z-30 top-24  right-16  absolute"></Layout.Col>
      <Layout.Col className="w-full gap-4">
        <Typography.Title className="font-bold text-center text-5xl lg:text-8xl tracking-tighter">⚡️Unleash Your SQL Mastery</Typography.Title>
        <Typography.Body className="text-center dark:text-secondary">Dive into the world of databases and query your way to excellence with our cutting-edge SQL coding platform. Elevate your skills, conquer complex data challenges, and shape your future as a database maestro.</Typography.Body>
        <Layout.Row className="justify-between w-full  backdrop:blur-2xl py-3 rounded-lg border border-secondary/30 bg-dark_secondary/50 px-4">
          <Typography.Body className="font-semibold hidden md:flex">Company</Typography.Body>
          <Typography.Body className="font-semibold">Title</Typography.Body>
          <Typography.Body className="font-semibold">Difficulty</Typography.Body>
        </Layout.Row>
        <Layout.Col className="divide-y divide-dark_secondary ">
          {props.data && props.data.map((item, index) => {
            return item.category === "SQL" && !item.accessGroups ? <Link key={index} className="justify-between w-full py-2 px-4 flex hover:bg-dark_secondary/30 transition-all" href={`/questions/${item.slug}`}>
              <Typography.Body className="text-left hidden md:flex">{item.company}</Typography.Body>
              <Typography.Body className="text-left md:text-center flex-1">{item.title}</Typography.Body>
              <Badge type={item.difficulty.toLowerCase()}>{item.difficulty}</Badge>
            </Link> : null
          })}
        </Layout.Col>
      </Layout.Col>
    </Layout.Container>
  </Layout.Col>
  </Page>;
}


export const getServerSideProps = withURL(async (ctx) => {
  const { url } = ctx.req;
  try {
    const res = await axios.get(`${url}/api/questions`);
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
