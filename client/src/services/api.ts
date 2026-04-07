import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

export function catchError(error: any) {
    if (axios.isAxiosError(error)) {
        // Erro da API (ex: 404 Not Found, 400 Bad Request)
        console.error("Erro da API:", error.response?.data);
        console.error("Status:", error.response?.status);
    } else {
        // Outro tipo de erro (sem internet, etc)
        console.error("Erro inesperado:", error);
    }
}
