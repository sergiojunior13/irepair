import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { NewServiceForm } from "./components/NewServiceForm";
import type { ServiceOrder } from "./types/ServiceOrder";
import { ServiceCard } from "./components/ServiceCard";

export function App() {
    const [servicesOrders, setServicesOrders] = useState<ServiceOrder[]>([]);

    function addServiceOrder(serviceOrder: ServiceOrder) {
        setServicesOrders([...servicesOrders, serviceOrder]);
    }

    return (
        <div>
            <Header />
            <main>
                <NewServiceForm addServiceOrder={addServiceOrder} />

                <ul>
                    {servicesOrders.map((serviceOrder) => (
                        <li>
                            <ServiceCard {...serviceOrder} />
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
