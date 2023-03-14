import styles from "@/styles/Table.module.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updaterequest, updaterequestbyid } from "./Datahandler";
import {
  Button,
  Space,
  Progress,
  Modal,
  Dropdown,
  Typography,
  Menu,
} from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";

import ResultModal from "./ResultModal";
let resData = [];

function Table({ data }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const getRequest = useSelector((state) => state.getRequest);
  const handleRender = async (data) => {
    updaterequestbyid(data.id).then((res) => {
      if (res) {
        console.log("All is well");
      }
    });
  };
  function startRender(id) {
    const renderData = data.filter((item) => item.id === id);
    // dispatch({ type: "getRequest", payload: renderData[0] });
    dispatch({ type: "documentId", payload: id });
    handleRender(renderData[0]);
  }

  const toggleMenu = (data) => {
    resData = Object.values(data.RequestInputs);
    dispatch({ type: "documentId", payload: data.id });
    dispatch({ type: "modalShow", payload: true });
    console.log(data.id);
    setIsOpen(!isOpen);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>DocumentId</th>
          <th>Platform</th>
          <th>Account</th>
          <th>Perameter</th>
          <th>Render Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.Platform}</td>
            <td>{item.Account}</td>
            <td>{item.Parameter}</td>
            <td>{item.RenderStatus}</td>

            {item.RenderStatus !== "Completed" && (
              <td>
                <Button
                  size="small"
                  type="dashed"
                  onClick={() => startRender(item.id)}
                >
                  Start Render
                </Button>
              </td>
            )}

            <div>
              {item.RenderStatus === "Completed" && (
                <td>
                  <Button
                    size="small"
                    type="dashed"
                    onClick={() => {
                      toggleMenu(item);
                    }}
                  >
                    Get Response
                  </Button>
                  {isOpen && <ResultModal data={resData} />}
                </td>
              )}
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
