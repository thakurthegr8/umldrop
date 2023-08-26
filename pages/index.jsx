import React from "react";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import Page from "@/src/components/pages";
import Layout from "@/src/components/utils/Layout";
import withURL from "@/src/middlewares/withUrl";
import HomeHeroBlock from "@/src/components/blocks/Home/Hero";
import HomeQuestionsTableBlock from "@/src/components/blocks/Home/QuestionsTable";
import HomeGlowingBlock from "@/src/components/blocks/Home/GlowingBlock";
import NavbarFixed from "@/src/components/sections/Navbar/NavbarFixed";

const Home = (props) => {
  return (<Page>
    <Layout.Col className={styles.main}>
      <NavbarFixed />
      <Layout.Container className={styles.main_container}>
        <HomeGlowingBlock />
        <Layout.Col className={styles.main_container_hero_col}>
          <HomeHeroBlock />
          <HomeQuestionsTableBlock questions={props.data} />
        </Layout.Col>
      </Layout.Container>
    </Layout.Col>
  </Page>);
}

export default Home;

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
