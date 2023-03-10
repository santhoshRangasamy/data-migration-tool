import React from "react";
import styles from "@/styles/Side.module.scss";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Product", "sub1", <FolderAddOutlined />, [
    getItem("Get_All_Product", "5"),
    getItem("Get_Product_By_Id", "6"),
  ]),
  getItem("Template", "sub2", <FolderAddOutlined />, [
    getItem("Create_Template", "7"),
    getItem("Update_Template", "8"),
  ]),
  getItem("File", "sub3", <FolderAddOutlined />, [
    getItem("Create_File", "9"),
    getItem("Update_File", "10"),
  ]),
];

function Sidebar() {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <span className={styles.logo}>MIGR</span>
      </div>
      <hr />
      <div className={styles.center}>
        <p className={styles.title}>Elastic Path</p>

        <Menu
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
    // <div className="sidebar">
    //   <div className="top">
    //     <span className="logo">MIGR</span>
    //   </div>
    //   <p className="title">Elastic Path</p>
    //   <Menu
    //     onClick={onClick}
    //     style={{
    //       width: 256,
    //     }}
    //     defaultSelectedKeys={["1"]}
    //     defaultOpenKeys={["sub1"]}
    //     mode="inline"
    //     items={items}
    //   />
    // </div>
  );
}

export default Sidebar;
