import { BrowserRouter, Routes, Route } from "react-router";

import { DashboardPage } from "./pages/DashboardPage";
import { ClientsPage } from "./pages/ClientsPage";
import { ServiceOrdersPage } from "./pages/ServiceOrdersPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MainLayout } from "./pages/MainLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { PrivateRoute } from "./routes/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalProvider";

import "./App.css";

export const App = () => {
    return (
        <BrowserRouter>
            <ModalProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<PrivateRoute />}>
                            <Route element={<MainLayout />}>
                                <Route path="/" element={<DashboardPage />} />
                                <Route path="/clientes" element={<ClientsPage />} />
                                <Route path="/ordens-de-servico" element={<ServiceOrdersPage />} />
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </AuthProvider>
            </ModalProvider>
        </BrowserRouter>
    );
};
