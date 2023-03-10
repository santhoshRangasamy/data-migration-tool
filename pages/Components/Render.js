import React, { useState, useEffect, createContext } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/Render.module.scss";
import { getData, postData, updateData } from "@/firebase/data";
import axios from "axios";
import Table from "./Table";
import { getrequests, postrequest, updaterequest } from "./Datahandler";

var XLSX = require("xlsx");
const collectionName = "requests";
const Render = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(collectionName).then((response) => {
      setData(response);
    });
  }, []);
  // getData(collectionName);
  const dispatch = useDispatch();
  const getRequest = useSelector((state) => state.getRequest);
  const user = useSelector((state) => state.user);
  let feedData = getRequest;
  const [collectionData, setCollectionData] = useState([]);

  const [records, setRecords] = useState(0);
  const userData = useSelector((state) => state.user);
  const userInput = useSelector((state) => state.userInput);
  const [render, setRender] = useState(false);
  const [remainingData, setRemainingData] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);

  let td = {
    DocumentId: "Gft3RW6PaTOsKmBp81e8",
    Account: "Trika",
    RefId: 1,
    Parameter: "Get_Product_by_ID",
    Payload: {
      PrimaryId: 17,
    },
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsondata = XLSX.utils.sheet_to_json(worksheet);
    setRecords(jsondata.length);

    let required = { ResponseCode: 0, ResponseData: "", ResponseStatus: "" };

    let payload = {
      UserName: "Santhosh.nct@gmail.com",
      Platform: "Vtex",
      Account: "Trika",
      Parameter: "Get-All",
      RequestInputs: {},
    };

    for (let i = 0; i < jsondata.length; i++) {
      let reqPayload = { ...jsondata[i] };
      let obj = { RefId: reqPayload.RefId, Payload: reqPayload, ...required };
      delete obj.Payload.RefId;
      payload.RequestInputs[jsondata[i].RefId] = obj;
    }

    await postrequest(payload).then((res) => {
      console.log(res);
    });

    await getrequests().then((res) => {
      setData(res.data);
    });
    setRender(false);
  };

  return (
    <div className={styles.featured}>
      <div className={styles.upload}>
        <Button variant="outlined" component="label" className="uploadButton">
          Import
          <input
            hidden
            accept="xlsx/*"
            multiple
            type="file"
            onChange={(e) => handleFile(e)}
          />
        </Button>
      </div>
      <hr />
      <Table data={data}></Table>
    </div>
  );
};

export default Render;
