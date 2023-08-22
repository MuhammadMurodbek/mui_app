import axios from "axios";
import { md5 } from "../helpers/md5crypto";

export const request = axios.create({
  baseURL: "https://no23.lavina.tech",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const { method, url, data } = config;

    const key = localStorage.getItem("key");
    const secret = localStorage.getItem("secret");

    const apiMethod = method ? method.toUpperCase() : "";
    const apiUrl = url ? url : "";
    const apiBody = data ? JSON.stringify(data) : "";
    const apiSecret = secret ? secret : "";

    console.log("sign", apiMethod + apiUrl + apiBody + apiSecret);

    if (key && secret) {
      config.headers["Key"] = key;
      config.headers["Sign"] = md5(apiMethod + apiUrl + apiBody + apiSecret);
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// request.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response.status === 401) {
// 			window.location.replace('/login')
// 			localStorage.clear()
// 		}
// 		return error
// 	}
// )
