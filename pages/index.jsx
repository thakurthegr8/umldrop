import React from "react";
import styles from "@/styles/Home.module.css";
import Page from "@/src/components/pages";
import Layout from "@/src/components/utils/Layout";
import HomeHeroBlock from "@/src/components/blocks/Home/Hero";
import HomeGlowingBlock from "@/src/components/blocks/Home/GlowingBlock";
import NavbarFixed from "@/src/components/sections/Navbar/NavbarFixed";

const Home = (props) => {
  return (<Page>
    <Layout.Col className={styles.main}>
      <NavbarFixed />
      <Layout.Container className={styles.main_container}>
        <HomeGlowingBlock/>
        <Layout.Col className={styles.main_container_hero_col}>
          <HomeHeroBlock />
        </Layout.Col>
      </Layout.Container>
    </Layout.Col>
  </Page>);
}

export default Home;

export const getStaticProps = async () => {
  return {
    props: {}
  }
};
