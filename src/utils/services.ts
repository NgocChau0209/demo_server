const axios = require("axios").default;
const PORT = parseInt(<string>process.env.PORT, 10) || 9888;


export const axiosInstance = axios.create({
  baseURL: `http://localhost:${PORT}/api/service`,
  withCredentials: false,
});