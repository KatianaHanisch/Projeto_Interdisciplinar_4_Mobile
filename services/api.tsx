import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.0.103:8081/api",
});

export const api_chat = "ws://10.0.0.103:8081/api";
export const api_url = "http://10.0.0.103:8081/api";
