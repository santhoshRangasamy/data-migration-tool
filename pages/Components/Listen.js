import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  docs,
} from "firebase/firestore";
import db from "@/firebase/config";

const Listen = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  function realtime() {
    const q = query(doc(db, "requests", "0AP3Dp5mIxH8epd1pgEh"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      // console.log(querySnapshot.data());
      setData(querySnapshot.data());
    });
  }
  useEffect(() => {
    realtime();
  }, []);
  console.log(data);
  return <div>Need</div>;
};

export default Listen;
