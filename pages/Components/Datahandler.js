import axios from "axios";

export async function getrequests() {
  return await axios
    .get("/api/request")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function postrequest(data) {
  return await axios
    .post("/api/request", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function updaterequest(payload) {
  return await axios
    .patch("/api/request", payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function updaterequestbyid(documentId) {
  return await axios
    .patch(`/api/updatebyid?documentId=${documentId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
}
