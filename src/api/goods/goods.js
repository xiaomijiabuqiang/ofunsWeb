import request from "@/utils/request.js";

export function goods(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "/portal/goods/list", //如果是绝对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是post请求请使用 data: params
  });
}

export function updateGoodsState(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "/goods/updateState", //如果是绝对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是post请求请使用 data: params
  });
}
