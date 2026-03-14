import { useEffect, useState } from "react";
import { NewServiceForm } from "../components/NewServiceForm";
import type { NewServiceOrder, ServiceOrder } from "../types";
import { createServiceOrder, getServiceOrders } from "../services/serviceOrderService";
import { ServiceCard } from "../components/ServiceCard";

export function ServiceOrdersPage() {
    const [servicesOrders, setServicesOrders] = useState<ServiceOrder[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);
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
    }, [refreshKey]);

    function refresh() {
        setRefreshKey((prev) => prev + 1);
    }

    async function addServiceOrder(so: NewServiceOrder) {
        await createServiceOrder(so);
        refresh();
    }

    if (isLoading)
        return (
            <div className="h-[80vh] flex items-center justify-center font-bold text-2xl">
                <p>Carregando dados...</p>
            </div>
        );

    return (
        <>
            <NewServiceForm addServiceOrder={addServiceOrder} />

            {servicesOrders.map((so) => (
                <ServiceCard onDelete={refresh} setStatus={refresh} {...so} />
            ))}
        </>
    );
}
