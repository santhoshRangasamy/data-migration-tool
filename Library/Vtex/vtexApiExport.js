import axios from "axios";
import { apiLink } from "./vtexApiLink";

export async function vtexapi(props) {
  let api = apiLink(props);
  let headers = api.headers;
  const res = await axios.get(api.link, {
    headers,
  });
  return { data: res.data };
}
