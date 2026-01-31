import axios from "axios";

// ========================================
// SINGLE API INSTANCE (Through Gateway)
// ========================================
// All services go through API Gateway (8080)

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Add token automatically
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔑 Token added");
    } else {
      console.log("⚠️ No token found");
    }

    return config;
  },
  (error) => {
    console.error("❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

export default api;
