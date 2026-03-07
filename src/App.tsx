import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { NewServiceForm } from "./components/NewServiceForm";
import type { ServiceOrder } from "./types/ServiceOrder";
import { ServiceCard } from "./components/ServiceCard";

export function App() {
    const [servicesOrders, setServicesOrders] = useState<ServiceOrder[]>([]);

    function addServiceOrder(serviceOrder: ServiceOrder) {
        setServicesOrders((prevServices) => {
            return [...prevServices, serviceOrder];
        });
    }

    // Muda o status do serviço baseado em seu índice
    function setStatus(status: ServiceOrder["status"], index: number) {
        setServicesOrders((prevServices) =>
            prevServices.map((service, i) => {
                if (i === index) return { ...service, status: status };

                return service;
            }),
        );
    }

    return (
        <div>
            <Header />
            <main className="max-w-5xl mx-auto px-6">
                <section>
                    <NewServiceForm addServiceOrder={addServiceOrder} />
                </section>

                <div className="mt-7 flex flex-wrap gap-3 justify-between max-w-5xl mx-auto">
                    <section className="flex-1">
                        <h2 className="font-bold text-center text-lg min-w-80">Abertas</h2>
                        <ul className="flex flex-col gap-2 mt-2">
                            {servicesOrders.map(
                                (serviceOrder, i) =>
                                    serviceOrder.status === "open" && (
                                        <li>
                                            <ServiceCard
                                                setStatus={(status) => setStatus(status, i)}
                                                {...serviceOrder}
                                            />
                                        </li>
                                    ),
                            )}
                        </ul>
                    </section>
                    <section className="flex-1">
                        <h2 className="font-bold text-center text-lg min-w-80">Finalizadas</h2>
                        <ul className="flex flex-col gap-2 mt-2">
                            {servicesOrders.map(
                                (serviceOrder, i) =>
                                    serviceOrder.status === "done" && (
                                        <li>
                                            <ServiceCard
                                                setStatus={(status) => setStatus(status, i)}
                                                {...serviceOrder}
                                            />
                                        </li>
                                    ),
                            )}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}
