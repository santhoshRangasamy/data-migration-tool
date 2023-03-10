import axios from "axios";
import { apiLink } from "./vtexApiLink";
let headers = {
  "X-VTEX-API-AppKey": "vtexappkey-trika-BQTPFR",
  "X-VTEX-API-AppToken":
    "BEQPOOSYXAYLNLGVAXLQIMZTCTTGNIZQCKPVPNIMHPAGRDVDFGODEECNHOXXKZGWIFZZAQYZSOYKMMXJVUXDJRTQSNYINJHEYREEUAKDGOEWWFMHMRWCRKTUUATQHOVY",
};

export async function vtexapi(props) {
  let api = apiLink(props);
  const res = await axios.get(api, {
    headers,
  });
  return { data: res.data };
}
