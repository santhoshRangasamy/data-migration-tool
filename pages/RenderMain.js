import React from "react";
import Render from "./Components/Render";
import Response from "./Components/Response";
import styles from "@/styles/RenderMain.module.scss";
import Layout from "./Components/Layout/Layout";

function renderMain() {
  return (
    <Layout>
      <div className={styles.renderpage}>
        <Render />
        <Response />
      </div>
    </Layout>
  );
}

export default renderMain;
