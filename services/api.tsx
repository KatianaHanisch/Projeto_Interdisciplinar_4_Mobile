import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.0.127:8082/api",
});

export const api_chat = "ws://10.0.0.102:8081/api";
export const api_url = "http://10.0.0.102:8081/api";
