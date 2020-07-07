import request from "@/utils/request.js";

/**
 * 获取订单列表
 * @param params
 * @returns {AxiosPromise}
 */
export function orderList(params) {
  return request({
    url: "/order/list", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params, //注意：如果是post请求请使用 data: params
  });
}

/**
 * 获取订单详情列表
 * @param params
 * @returns {AxiosPromise}
 */
export function orderDetailList(params) {
  return request({
    url: "/order/unionlist", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params, //注意：如果是post请求请使用 data: params
  });
}

/**
 * 根据用户id获取订单列表以及订单详情列表
 * @param params
 * @returns {AxiosPromise}
 */
export function orderAndDetailList(params) {
  return request({
    url: "/order/UnionlistByUserId", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params, //注意：如果是post请求请使用 data: params
  });
}
/**
 * 保存订单并支付
 * @param params
 * @returns {AxiosPromise}
 */
export function saveOrderAndPay(params) {
  return request({
    url: "/pay/toSaveAndPay", //如果是绝对路径就不会在使用配置里的url
    method: "post",
    data: params, //注意：如果是post请求请使用 data: params
  });
}
