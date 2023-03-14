import settings from "../../middleware/manifest.json";

export function apiLink(props) {
  let baseURL =
    settings[props.Account].properties.appCredentials.properties.appLink
      .default;
 
  let headers = {
    "X-VTEX-API-AppKey":
      settings[props.Account].properties.appCredentials.properties.appKey
        .default,
  };

  const apiLink = {
    Get_Product_by_ID: `${baseURL}/api/catalog/pvt/product/${
      props.Payload.ProductId
    }`,
    Get_SKU_File: `${baseURL}/api/catalog/pvt/stockkeepingunit/${
      props.Payload.SKUId
    }/file`,
    Get_SKU: `${baseURL}/api/catalog/pvt/stockkeepingunit/${
      props.Payload.SKUId
    }`,
  };
  return { link: apiLink[props.Parameter], headers: headers };
}
