import request from "@/utils/request.js";

export function car(params) {
  return request({
    // closeLoading: true,
    // closeInterceptors: true,
    url: "/car/list", //如果是绝对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是post请求请使用 data: params
  });
}

export function getCar(params) {
  return request({
    url: "/car/getByUser", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}

export function saveCar(params) {
  return request({
    url: "/car/save", //如果是绝saveGoods对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是post请求请使用 data: params
  });
}

export function selectCar(params) {
  return request({
    url: "/car/getCar", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}
export function deleteCar(params) {
  return request({
    url: "/car/delete", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}
