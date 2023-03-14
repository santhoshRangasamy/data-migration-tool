import React from "react";
import { useState, useEffect } from "react";
import { Space, Progress, Modal, Dropdown, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/Responsetwo.module.scss";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownOutlined,
} from "@ant-design/icons";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
var XLSX = require("xlsx");
let modalData = [];
const ResultModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  let allCalls = props.data.map((item) => {
    let obj = {
      RefId: item.RefId,
      Payload: item.Payload,
      ResponseData: item.ResponseData,
    };
    modalData.push(obj);
  });

  function flattenObject(obj) {
    const flattened = {};

    function flatten(subObj, prefix = "") {
      Object.keys(subObj).forEach((key) => {
        const value = subObj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "object" && value !== null) {
          flatten(value, newKey);
        } else {
          flattened[newKey] = value;
        }
      });
    }

    flatten(obj);

    return flattened;
  }

  function convertJSONtoExcel(jsonData) {
    const flattenedData = jsonData.map((data) => flattenObject(data));
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileUrl = URL.createObjectURL(fileData);
    return fileUrl;
  }

  const items = [
    {
      key: "1",
      label: "Copy JSON",
    },
    {
      key: "2",
      label: "Download JSON",
    },
    {
      key: "3",
      label: "Download EXCEL",
    },
  ];

  const downloadJSON = () => {
    const data = JSON.stringify(modalData, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "myJSON.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(modalData, {
      header: Object.values(modalData),
      skipHeader: true,
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "My Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "myData.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  function handleMenuSelect(key, e) {
    if (key == 1) {
      navigator.clipboard.writeText(JSON.stringify(modalData));
    }
    if (key == 2) {
      downloadJSON();
    }
    if (key == 3) {
      downloadExcel();
    }
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fileUrl = convertJSONtoExcel([modalData]);
  return (
    <div>
      <Modal
        open={isModalOpen}
        title="Request & Response"
        style={{ top: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Dropdown
            menu={{
              onClick: (e) => {
                handleMenuSelect(e.key);
              },
              items,
              selectable: true,
              defaultSelectedKeys: ["3"],
            }}
          >
            <Typography.Link>
              <Space>
                Action
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>,
        ]}
      >
        <div>
          {" "}
          <pre
            style={{
              height: "350px",
              overflowY: "scroll",
              overflowX: "scroll",
            }}
          >
            <div>
              <p>{JSON.stringify(modalData, null, 2)}</p>
            </div>
          </pre>
        </div>
        {/* <a href={fileUrl} download="data.xlsx">
          Export to Excel
        </a> */}
      </Modal>
    </div>
  );
};

export default ResultModal;
