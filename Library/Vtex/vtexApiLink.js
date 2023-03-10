export function apiLink(props) {
  let baseURL = {
    Trika: "https://trika.vtexcommercestable.com.br",
  };
  const apiLink = {
    Get_Product_by_ID: `${baseURL[props.Account]}/api/catalog/pvt/product/${
      props.Payload.ProductId
    }`,
    Get_SKU_File: `${baseURL[props.Account]}/api/catalog/pvt/stockkeepingunit/${
      props.Payload.SKUId
    }/file`,
    Get_SKU: `${baseURL[props.Account]}/api/catalog/pvt/stockkeepingunit/${
      props.Payload.SKUId
    }`,
  };
  return apiLink[props.Parameter];
}
