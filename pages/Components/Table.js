import styles from "@/styles/Table.module.scss";
import { Button, Space } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updaterequest } from "./Datahandler";

function Table({ data }) {
  const dispatch = useDispatch();

  const handleRender = async (data) => {
    let requestArray = data.RequestInputs;
    requestArray = Object.values(requestArray);
    let array = [];

    let payload = {
      DocumentId: data.id,
      Account: data.Account,
      Parameter: data.Parameter,
    };

    const allCalls = requestArray.map((item) => {
      payload.RefId = item.RefId;
      payload.Payload = item.Payload;
      updaterequest(payload).then((res) => {
        if (res) {
          item.ResponseCode = 200;
          item.ResponseData = res.data.data;
        }
        array = [...array, item];
        dispatch({ type: "responseData", payload: array });
      });
    });

    await Promise.allSettled(allCalls);
  };
  function startRender(id) {
    const renderData = data.filter((item) => item.id === id);
    dispatch({ type: "getRequest", payload: renderData[0] });
    handleRender(renderData[0]);
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Platform</th>
          <th>Account</th>
          <th>Perameter</th>
          <th>User Name</th>
          <th>Render Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.Platform}</td>
            <td>{item.Account}</td>
            <td>{item.Parameter}</td>
            <td>{item.UserName}</td>
            <td>
              <Button
                size="small"
                type="dashed"
                onClick={() => startRender(item.id)}
              >
                Start Render
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
