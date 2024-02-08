import axios from "axios";

export const baseURL = "http://localhost:8848/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api1 = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const api2 = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

// google maps api

export const GOOGLE_MAP_API_KEY: string = "AIzaSyCodRFdxUuaO1xhadurtAbO6Qct3qcI0GI";
