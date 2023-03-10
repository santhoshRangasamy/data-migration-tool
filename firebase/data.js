import React from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  query,
  querySnapshot,
  where,
  getDoc,
  getFirestore,
  firestore,
} from "firebase/firestore";
import db from "@/firebase/config";

import { useDispatch, useSelector } from "react-redux";

const postData = async (collectionname, payload) => {
  const databaseRef = collection(db, collectionname);
  await addDoc(databaseRef, payload)
    .then(() => {
      console.log("Data Updated");
    })
    .catch((err) => {
      console.error(err);
    });
};

export async function getData(collectionName) {
  const databaseRef = collection(db, collectionName);
  let res = await getDocs(databaseRef);
  const data = res.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return data;
}

// Final
export async function updateData(collectionName, id, conditionField, value) {
  // Get a reference to the document to update
  const documentRef = doc(db, collectionName, id);
  // Update a specific field in the document
  const fieldToUpdate = { [conditionField]: value };
  return await updateDoc(documentRef, fieldToUpdate)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}

export { postData };
