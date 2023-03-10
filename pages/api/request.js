import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "@/firebase/config";
import { vtexapi } from "@/Library/Vtex/vetexApiExport";
const collectionName = "requests";
let responseData = "";
// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

export default async function handler(req, res) {
  // const { q } = req.query;
  // console.log(q);
  const databaseRef = collection(db, collectionName);
  if (req.method === "GET") {
    let resp = await getDocs(databaseRef);
    const data = resp.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.status(200).json(data);
  } else if (req.method === "POST") {
    await addDoc(databaseRef, req.body).then((data) => {
      let resdata = { id: data._key.path.segments[1], ...req.body };
      res.status(201).json(resdata);
    });
  } else if (req.method === "PATCH") {
    await vtexapi(req.body)
      .then((data) => {
        const documentRef = doc(db, collectionName, req.body.DocumentId);
        let responseDataKey = `RequestInputs.${req.body.RefId}.ResponseData`;
        let responseCodeKey = `RequestInputs.${req.body.RefId}.ResponseCode`;
        const responseUpdate = {
          [responseDataKey]: data.data,
          [responseCodeKey]: 200,
        };
        responseData = data;
        updateDoc(documentRef, responseUpdate)
          .then((data) => {
            res.status(200).json(responseData);
          })
          .catch((error) => {
            res.status(400).json(error);
          });
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
}
