import React from "react";
import Sidebar from "./Sidebar";
import Side from "./side";
import Navbar from "./Navbar";
import styles from "@/styles/Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div>
      <main>
        <div className={styles.home}>
          <Sidebar />
          <div className={styles.homeContainer}>
            <Navbar />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
