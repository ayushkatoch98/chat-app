import axios from "axios";

export const SERVER_BASE_URL = "http://192.168.1.139:3001"

export const axiosInstance = axios.create({
  withCredentials: true, // Enable credentials for all requests
  baseURL: SERVER_BASE_URL , // Set your API base URL
});


// export default axiosInstance;