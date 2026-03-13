import { useEffect, useState } from "react";
import type { ServiceOrder } from "../types/serviceOrder";
import { ServiceCard } from "../components/ServiceCard";
import { getServiceOrders } from "../services/serviceOrderService";

export function DashboardPage() {
    const [servicesOrders, setServicesOrders] = useState<ServiceOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const so = await getServiceOrders();
            if (!so) {
                alert("Não foi possível obter as ordens de serviço.");
                setIsLoading(false);
                return;
            }

            setServicesOrders(so);
            setIsLoading(false);
        }

        load();
    }, []);

    function setStatus(status: ServiceOrder["status"], index: number) {
        setServicesOrders((prev) =>
            // Se for o indíce da OS a mudar, altera o status,
            // se não, somente retorna a original
            prev.map((so, i) => {
                if (i === index) return { ...so, status };
                return so;
            }),
        );
    }

    function removeSO(index: number) {
        setServicesOrders((prev) => prev.filter((so, i) => i !== index));
    }

    if (isLoading)
        return (
            <div className="h-[80vh] flex items-center justify-center font-bold text-2xl">
                <p>Carregando dados...</p>
            </div>
        );

    return (
        <div className="mx-auto px-6 flex-1 w-full">
            <div className="mt-7 flex flex-wrap gap-3 justify-between max-w-7xl mx-auto">
                <section className="flex-1">
                    <h2 className="font-bold text-center text-lg">Abertas</h2>
                    <ul className="flex flex-col gap-2 mt-2">
                        {servicesOrders.map(
                            (serviceOrder, i) =>
                                serviceOrder.status === "open" && (
                                    <li>
                                        <ServiceCard
                                            onDelete={() => removeSO(i)}
                                            setStatus={(status) => setStatus(status, i)}
                                            {...serviceOrder}
                                        />
                                    </li>
                                ),
                        )}
                    </ul>
                </section>
                <section className="flex-1">
                    <h2 className="font-bold text-center text-lg">Em progresso</h2>
                    <ul className="flex flex-col gap-2 mt-2">
                        {servicesOrders.map(
                            (serviceOrder, i) =>
                                serviceOrder.status === "in_progress" && (
                                    <li>
                                        <ServiceCard
                                            onDelete={() => removeSO(i)}
                                            setStatus={(status) => setStatus(status, i)}
                                            {...serviceOrder}
                                        />
                                    </li>
                                ),
                        )}
                    </ul>
                </section>
                <section className="flex-1">
                    <h2 className="font-bold text-center text-lg">Finalizadas</h2>
                    <ul className="flex flex-col gap-2 mt-2">
                        {servicesOrders.map(
                            (serviceOrder, i) =>
                                serviceOrder.status === "done" && (
                                    <li>
                                        <ServiceCard
                                            onDelete={() => removeSO(i)}
                                            setStatus={(status) => setStatus(status, i)}
                                            {...serviceOrder}
                                        />
                                    </li>
                                ),
                        )}
                    </ul>
                </section>
            </div>
        </div>
    );
}
