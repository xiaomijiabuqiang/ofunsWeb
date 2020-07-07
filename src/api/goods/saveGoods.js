import request from "@/utils/request.js";


export function saveGoods(params) {
  return request({
    url: "/goods/saveGoods", //如果是绝saveGoods对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是post请求请使用 data: params
  });
}
