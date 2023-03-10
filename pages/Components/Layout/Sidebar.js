import React from "react";
import styles from "@/styles/Sidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";

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

const menuInput = (key) => {
  switch (key) {
    case "1":
      return { Platfrom: "Elastic Path", Parameter: "Get_All_Product" };
    case "2":
      return { Platfrom: "Elastic Path", Parameter: "Get_Product_By_Id" };
    case "3":
      return {};
    case "4":
      return {};
    default:
      return {};
  }
};

const items = [
  getItem("Product", "sub1", <FolderAddOutlined />, [
    getItem("Get_All_Product", "1"),
    getItem("Get_Product_By_Id", "2"),
  ]),
  getItem("Template", "sub2", <FolderAddOutlined />, [
    getItem("Create_Template", "3"),
    getItem("Update_Template", "4"),
  ]),
  getItem("File", "sub3", <FolderAddOutlined />, [
    getItem("Create_File", "5"),
    getItem("Update_File", "6"),
  ]),
];

function Sidebar() {
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state.userInput);
  const onClick = async (e) => {
    console.log("click ", e.key);
    let x = menuInput(e.key);
    dispatch({ type: "userInput", payload: x });
    console.log(x);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <span className={styles.logo}>Data Migration</span>
      </div>
      <hr />
      <div className={styles.center}>
        <p className={styles.title}>Elastic Path</p>
        <Menu
          onClick={onClick}
          style={{
            width: 200,
          }}
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
