import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // your Spring Boot URL
});

// Add token automatically
API.interceptors.request.use((req) => {
  //const token = localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NzQyNTIyNTcsImV4cCI6MTc3NDI1NTg1N30.IfIzo4jCMo8M5ChYxcS3Y8I8mHWD8KXuaNLwBOI-NnQ");

  const token = localStorage.getItem("token");
  
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;