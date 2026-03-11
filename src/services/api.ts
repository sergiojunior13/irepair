import axios from "axios";

export const api = axios.create({
    baseURL: "https://trainee.fidelis.workers.dev/api",
    withCredentials: false,
    headers: {
        Authorization: "Bearer 7f0af8e2-05be-48e1-bba1-31e51326f700",
        "Content-Type": "application/json",
    },
});
