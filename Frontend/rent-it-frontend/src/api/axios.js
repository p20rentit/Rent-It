import axios from "axios";

// ========================================
// Main API Instance
// ========================================
// Used for: Authentication, Registration, Forgot Password, Location Services
// Base URL: http://localhost:8080 (Main backend services)
const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Rohit❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

// ========================================
// Owner Services API Instance
// ========================================
// Used for: Owner Vehicle Management (CRUD operations)
// Base URL: http://localhost:5004 (Owner microservice - .NET backend)
// Note: In future, when all services are merged, use only one URL
const ownerApi = axios.create({
  baseURL: "http://localhost:5004/api",
});

// Request interceptor to add token to headers for owner API
ownerApi.interceptors.request.use(
  (config) => {
    console.log(`🚀 OWNER API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔑 Token added to request");
    } else {
      console.log("⚠️ No token found in localStorage");
    }
    return config;
  },
  (error) => {
    console.error("❌ OWNER API Request Error:", error);
    return Promise.reject(error);
  }
);

// ========================================
// Exports
// ========================================
export default api;        // For auth, registration, location services
export { ownerApi };       // For owner vehicle services
