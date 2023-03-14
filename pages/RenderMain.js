import React from "react";
import Render from "./Components/Render";
import styles from "@/styles/RenderMain.module.scss";
import Layout from "./Components/Layout/Layout";
import Listen from "./Components/Listen";
import Response from "./Components/Response2";

function renderMain() {
  return (
    <Layout>
      <div className={styles.renderpage}>
        <Render />
        {/* <Listen /> */}
        <Response />
      </div>
    </Layout>
  );
}

export default renderMain;
