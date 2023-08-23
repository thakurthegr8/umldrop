import React from "react";
import axios from "axios";
import Page from "@/src/components/pages";
import Navbar from "@/src/components/sections/Navbar";
import Layout from "@/src/components/utils/Layout";
import withURL from "@/src/middlewares/withUrl";
import HomeHeroBlock from "@/src/components/blocks/Home/Hero";
import HomeQuestionsTableBlock from "@/src/components/blocks/Home/QuestionsTable";
import HomeGlowingBlock from "@/src/components/blocks/Home/GlowingBlock";

export default function Home(props) {
  return <Page>
    <Layout.Col className="w-full">
      <Layout.Row className="p-2 border-b fixed inset-x-0 backdrop-blur-lg border-dark_secondary">
        <Layout.Container className="max-w-4xl">
          <Layout.Row className="justify-between items-center">
            <Navbar />
          </Layout.Row>
        </Layout.Container>
      </Layout.Row>
      <Layout.Container className="max-w-4xl py-8 mt-24">
        <HomeGlowingBlock />
        <Layout.Col className="w-full gap-4 text-center items-center">
          <HomeHeroBlock />
          <HomeQuestionsTableBlock questions={props.data} />
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
