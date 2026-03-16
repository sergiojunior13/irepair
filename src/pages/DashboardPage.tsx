import { useEffect, useState } from "react";
import type { ServiceOrder } from "../types/serviceOrder";
import { getServiceOrders } from "../services/serviceOrderService";
import { ServicesOrdersList } from "../components/ServicesOrdersList";

export const DashboardPage = () => {
    const [servicesOrders, setServicesOrders] = useState<ServiceOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

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

    if (isLoading)
        return (
            <div className="h-[80vh] flex items-center justify-center font-bold text-2xl">
                <p>Carregando dados...</p>
            </div>
        );

    return (
        <div className="mx-auto p-6 flex-1 w-full">
            <ServicesOrdersList servicesOrders={servicesOrders} refresh={refresh} />
        </div>
    );
};
