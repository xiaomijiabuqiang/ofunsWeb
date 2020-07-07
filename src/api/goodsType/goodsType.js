import request from "@/utils/request.js";

export function goodsTypeList(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "/goodsType/list", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}

export function addGoodsType(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "/goodsType/add", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}
