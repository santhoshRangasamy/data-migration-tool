import axios from "axios";
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
let responseStatus = "";

export default async function handler(req, res) {
  const { documentId } = req.query;

  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = { id: docSnap.id, ...docSnap.data() };

    let requestArray = data.RequestInputs;
    let getRenderedIdsList = data.RenderedIds;

    requestArray = Object.values(requestArray);
    let returnRes = [];
    let renderedIds = [...getRenderedIdsList];

    let payload = {
      DocumentId: data.id,
      Account: data.Account,
      Parameter: data.Parameter,
    };

    const getapidata = async (payload) => {
      let responseDataKey = `RequestInputs.${payload.RefId}.ResponseData`;
      let responseCodeKey = `RequestInputs.${payload.RefId}.ResponseCode`;
      let requstPayload = payload.Payload;
      let renderId = payload.RefId;

      try {
        const data = await vtexapi(payload);
        renderedIds.push(renderId);
        if (requestArray.length === renderedIds.length) {
          responseStatus = "Completed";
        } else {
          responseStatus = "Partially Completed";
        }

        const responseUpdate = {
          [responseDataKey]: data.data,
          [responseCodeKey]: 200,
          RenderedIds: renderedIds,
          RenderStatus: responseStatus,
        };
        await updateDoc(docRef, responseUpdate);
        returnRes.push({
          Request: requstPayload,
          Response: data.data,
        });
        return data;
      } catch (error) {
        console.log(error.data);
        throw error;
      }
    };

    let allCalls = requestArray.map((item) => {
      payload.RefId = item.RefId;
      payload.Payload = item.Payload;
      if (getRenderedIdsList.includes(item.RefId)) {
        returnRes.push({
          Request: item.Payload,
          Response: item.ResponseData,
        });
      } else {
        return getapidata(payload);
      }
    });

    Promise.allSettled(allCalls)
      .then((results) => {
        res.status(200).json(returnRes);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(404).send("Document not found");
  }
}
