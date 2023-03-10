import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import styles from "@/styles/Navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const imageUrl = "";

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleOk = () => {
    setIsPopupOpen(false);
  };
  const handleCancel = () => {
    setIsPopupOpen(false);
  };
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.wrapper}>
          <div className={styles.search}></div>
          <div className={styles.items}>
            <div className={styles.item}>
              <img
                onClick={togglePopup}
                src={imageUrl}
                alt=""
                className={styles.avatar}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={isPopupOpen}
          title="Request & Response"
          style={{ top: 20, alignItems: "end" }}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            <b>Index </b>
          </p>
          <p>
            <b>Response Code : 200 OK</b>
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
