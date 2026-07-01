import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://chat-app-04ig.onrender.com/api",
    withCredentials: true,
});