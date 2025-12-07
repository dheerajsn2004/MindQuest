import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

export const apiConnector = async (method, url, bodyData, headers, params) => {
  const token = localStorage.getItem("token");
  
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }
  
  return await axiosInstance({
    method: method,
    url: url,
    data: bodyData ? bodyData : null,
    headers: headers ? { ...defaultHeaders, ...headers } : defaultHeaders,
    params: params ? params : null,
    withCredentials: true,
  });
};
