import axios from 'axios';

const API_URL = 'http://localhost:5022/api';  // Your .NET Core API endpoint

const apiClient = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
