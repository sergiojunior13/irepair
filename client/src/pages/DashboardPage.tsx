import { useEffect, useState } from "react";
import type { ServiceOrder } from "../types/serviceOrder";
import { getServiceOrders } from "../services/serviceOrderService";
import { ServicesOrdersList } from "../components/ServicesOrdersList";
import { useModal } from "../contexts/ModalProvider";

export const DashboardPage = () => {
    const [servicesOrders, setServicesOrders] = useState<ServiceOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const modal = useModal();

    useEffect(() => {
        async function load() {
            try {
                const so = await getServiceOrders();
                if (!so) {
                    alert("");
                    setIsLoading(false);
                    return;
                }

                setServicesOrders(so);
                setIsLoading(false);
            } catch (err: any) {
                const message = err.response?.data?.error || "Não foi possível obter as ordens de serviço.";
                modal.showMessage(message, "error");

                return null;
            }
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
