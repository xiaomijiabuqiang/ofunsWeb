import request from "@/utils/request.js";

export function selectGoods(params) {
  return request({
    url: "/portal/goods/get", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}
