import axios from "axios";

let base = "";

export const requestLogin = params => {
  return axios
    .get(`${base}/financeAccount/login`, { params: params })
    .then(res => res.data);
};

export const getUserList = params => {
  return axios.get(`${base}/user/list`, { params: params });
};

export const getUserListPage = params => {
  return axios.get(`${base}/user/listpage`, { params: params });
};

export const removeUser = params => {
  return axios.get(`${base}/user/remove`, { params: params });
};

export const batchRemoveUser = params => {
  return axios.get(`${base}/user/batchremove`, { params: params });
};

export const editUser = params => {
  return axios.get(`${base}/user/edit`, { params: params });
};

export const addUser = params => {
  return axios.get(`${base}/user/add`, { params: params });
};

export const getChargeList = params => {
  return axios.post(`${base}/financeAccount/edu_membership_productlist`,params).then(res=>res.data)
};

export const getBuyUrl = params => {
  return axios.post(`${base}/financeAccount/edu_membershipbuy_shop`, params).then(res => res.data);
};

export const queryOrderList = params => {
  return axios.post(`${base}/financeAccount/edu_queryorderlist`, params).then(res => res.data);
}

export const queryOrderInfo = params => {
  return axios.post(`${base}/financeAccount/edu_queryorderinfo`, params).then(res => res.data);
}
