
import Layout from "@/src/components/utils/Layout";
import Typography from "@/src/components/utils/Typography"
import withURL from "@/src/middlewares/withUrl";
import axios from "axios";

export default function Home(props) {
  return <Layout.Col className="w-full">
    <Layout.Row className="p-4 border-b border-dark_secondary">
      <Typography.Subtitle className="font-bold">Ace SQL</Typography.Subtitle>
    </Layout.Row>
    <Layout.Container className="max-w-5xl py-8">
      <Layout.Col className="w-full gap-4">
        <Typography.Title className="font-bold text-center lg:text-7xl tracking-tighter">Unleash Your SQL Mastery</Typography.Title>
        <Typography.Body className="text-center dark:text-secondary">Dive into the world of databases and query your way to excellence with our cutting-edge SQL coding platform. Elevate your skills, conquer complex data challenges, and shape your future as a database maestro.</Typography.Body>
          <Layout.Row className="justify-between w-full py-3 rounded-lg border dark:border-secondary/30 bg-secondary dark:bg-dark_secondary px-4">
            <Typography.Body className="font-semibold">Company</Typography.Body>
            <Typography.Body className="font-semibold">Title</Typography.Body>
            <Typography.Body className="font-semibold">Difficulty</Typography.Body>
          </Layout.Row>
        <Layout.Col className="divide-y divide-dark_secondary ">
          {props.data && props.data.map((item, index) => {
            return <Layout.Row key={index} className="justify-between w-full py-2 px-4">
              <Typography.Body className="text-left">{item.company}</Typography.Body>
              <Typography.Body className="text-center flex-1">{item.title}</Typography.Body>
              <Typography.Body className="text-center">{item.difficulty}</Typography.Body>
            </Layout.Row>
          })}
        </Layout.Col>
      </Layout.Col>
    </Layout.Container>
  </Layout.Col>;
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
