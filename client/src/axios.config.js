import axios from "axios";

const axiosReq = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
  withCredentials: true,
});

export default axiosReq;
