import { Outlet } from "react-router";
import { Header } from "../components/Header";

export function MainLayout() {
    return (
        <>
            <Header />
            <main className="flex flex-col">
                <Outlet />
            </main>
        </>
    );
}
