import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const loginUser = (email, password) =>{
    return axios.post(`${API_URL}/login`, {
        email,
        password,
    });
};