import React from "react";
import { useState } from "react";
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
let response = { RefId: "", Response: "" };
const Response = () => {
  let test = {
    contractId: "SC160-000711",
    contractStatus: "Open",
    customerId: "509272",
    contractDate: "2022-11-16T11:29:43.1353737Z",
    contractNumber: "SC160-000711",
    terms: "net30",
    methodOfPayment: "ACH",
    customerReference: "2022 Bulk Rahr Pils",
    contractType: "contract",
    totalQty: 12000,
    deliveryMode: "FED-LTLS",
    lineNumber: 239,
    productId: "MRAHBD2B",
    batchNumber: "001A",
    style: "year",
    lineQty: 700,
    originalQty: 10000,
    remainingQty: 9300,
    unitOfMeasure: "lb",
    unitPrice: 0.07,
    totalPrice: 30.0,
    isMilled: "1",
    lineStatus: "shipped",
    warehouse: "591Main",
    siteCode: "160",
    organizationCode: "509272",
    siteId: "USA",
    location: "Atlanta LTL",
    currencyCode: "USD",
    contractPrice: 20.0,
    skuReference: "MDIN1020",
    contractReference: "abcde",
    externalReference: "fghh",
    lotNumber: "a127",
    lineTransferStatus: "open",
  };

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
    const data = JSON.stringify(test, null, 2);
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

  const myObject = {
    name: "Name",
    age: "Age",
    city: "City",
  };

  const myData = [
    {
      name: "Santhosh Kumar",
      age: 30,
      city: { name: "Santhosh Kumar", age: 30, city: "Bangalore" },
    },
    { name: "John Doe", age: 25, city: "New York" },
  ];

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(myData, {
      header: Object.values(myObject),
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
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>;
      navigator.clipboard.writeText(JSON.stringify(test));
    }
    if (key == 2) {
      downloadJSON();
    }
    if (key == 3) {
      downloadExcel();
    }
  }

  const feedData = useSelector((state) => state.feedData);
  const responseData = useSelector((state) => state.responseData);
  const getRequest = useSelector((state) => state.getRequest);
  let records = [];
  let request = [];

  if (getRequest) {
    records = Object.values(getRequest.RequestInputs);
  }

  if (responseData) {
    request = responseData;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const shoot = (y) => {
    console.log(y);
    showModal();
  };
  let renderPercentage = Math.floor((request.length / records.length) * 100);
  return (
    <div className={styles.chart}>
      <div className={styles.top}>
        <div className={styles.title}>Render Status</div>
        <Progress type="circle" percent={renderPercentage} />
        <div className={styles.data}>
          <div>{records.length}</div>
          <div>{request.length}</div>
          <div>{records.length - request.length}</div>
        </div>
        <div className={styles.datatitle}>
          <div>Total Records</div>
          <div>Success Records</div>
          <div>Fail Records</div>
        </div>
        <div className={styles.title}>Response</div>
        <div className={styles.progressbar}>
          {request &&
            request.map((props, i) => (
              <div key={i} className={styles.progress}>
                {props.ResponseCode === 200 && (
                  <CheckCircleFilled
                    style={{ color: "green", fontSize: "20px" }}
                    onClick={() => {
                      let y = { ...props };
                      response = y;
                      shoot(y);
                    }}
                  />
                )}
                {props.ResponseCode === 0 && (
                  <CloseCircleFilled
                    style={{ color: "red", fontSize: "20px" }}
                    onClick={() => {
                      let y = { ...props };
                      response = y;
                      shoot(y);
                    }}
                  />
                )}
                {/* <CloseCircleFilled style={{ color: 'red',fontSize:"20px" }}/> */}
                <div>{props.RefId}</div>
              </div>
            ))}
        </div>
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
            <p>
              <b>RefId : {response.RefId}</b>
            </p>
            <p>
              <b>Response Code : {response.ResponseCode}</b>
            </p>
            <div>
              {" "}
              <pre
                style={{
                  height: "350px",
                  overflowY: "scroll",
                  overflowX: "scroll",
                }}
              >
                {" "}
                <b>Payload :</b>
                <p>{JSON.stringify(response.Payload, null, 2)}</p>
                <b>Response :</b>
                <p>{JSON.stringify(response.ResponseData, null, 2)}</p>
              </pre>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Response;
