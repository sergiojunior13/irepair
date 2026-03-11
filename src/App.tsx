import { BrowserRouter, Routes, Route } from "react-router";
import { DashboardPage } from "./pages/DashboardPage";
import { ClientsPage } from "./pages/ClientsPage";
import { ServiceOrdersPage } from "./pages/ServiceOrdersPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MainLayout } from "./pages/MainLayout";
import "./App.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/clientes" element={<ClientsPage />} />
                    <Route path="/ordens-de-servico" element={<ServiceOrdersPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
