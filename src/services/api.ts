import axios from "axios";

export const api = axios.create({
    baseURL: "https://trainee.fidelis.workers.dev/api",
    withCredentials: false,
    headers: {
        Authorization: "Bearer 7f0af8e2-05be-48e1-bba1-31e51326f700",
        "Content-Type": "application/json",
    },
});

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
