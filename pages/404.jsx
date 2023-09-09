import React from "react";
import NavbarFixed from "@/src/components/sections/Navbar/NavbarFixed";
import Page from "@/src/components/pages";
import Placeholder from "@/src/components/elements/Placeholder";
import Layout from "@/src/components/utils/Layout";

const NotFoundPage = () => {
  return (
    <Page>
      <NavbarFixed />
      <Layout.Col className="mt-32">
        <Placeholder title="404 Not Found" description="Content not available" />
      </Layout.Col>
    </Page>
  );
};

export default NotFoundPage;
