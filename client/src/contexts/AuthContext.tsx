import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";
import type { Client } from "../types";

type User = Pick<Client, "id" | "email">;

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: Client["email"], password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Recupera sessão existente ao recarregar a página (o cookie ainda é válido)
    useEffect(() => {
        api.get<User>("/auth/me")
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false));
    }, []);

    async function login(email: string, password: string) {
        const response = await api.post("/auth/login", { email, password });
        setUser(response.data);
    }

    async function logout() {
        await api.post("/auth/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return context;
}
