import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import db from "@/firebase/config";
import { vtexapi } from "@/Library/Vtex/vtexApiExport";
const collectionName = "requests";
let responseData = "";
// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

export default async function handler(req, res) {
  let databaseRef = collection(db, collectionName);
  if (req.method === "GET") {
    const { documentId } = req.query;
    if (documentId) {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        res.status(200).json(data);
      } else {
        res.status(404).send("Document not found");
      }
    } else {
      let resp = await getDocs(databaseRef);
      const data = resp.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      res.status(200).json(data);
    }
  } else if (req.method === "POST") {
    await addDoc(databaseRef, req.body).then((data) => {
      let resdata = { id: data._key.path.segments[1], ...req.body };
      res.status(201).json(resdata);
    });
  } else if (req.method === "PATCH") {
    let props = req.body;
    let returnRes = [];
    const getapidata = async (payload) => {
      let responseDataKey = `RequestInputs.${payload.Requestinputs.RefId}.ResponseData`;
      let responseCodeKey = `RequestInputs.${payload.Requestinputs.RefId}.ResponseCode`;
      let responseStatusKey = `RequestInputs.${payload.Requestinputs.RefId}.ResponseStatus`;
      let requstPayload = payload.Requestinputs.Payload;
      try {
        const data = await vtexapi(payload);
        const documentRef = doc(db, collectionName, payload.DocumentId);
        const responseUpdate = {
          [responseDataKey]: data.data,
          [responseCodeKey]: 200,
          [responseStatusKey]: 1,
        };
        await updateDoc(documentRef, responseUpdate);
        returnRes.push({
          Request: requstPayload,
          Response: data.data,
        });
        return data;
      } catch (error) {
        throw error;
      }
    };

    const allCalls = props.Requestinputs.map((item) => {
      props.Requestinputs = item;
      return getapidata(props);
    });

    Promise.allSettled(allCalls)
      .then((results) => {
        // const responseData = results.map((result) => result.value);
        res.status(200).json(returnRes);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
}
