import type { ServiceOrder } from "../types";
import { ServiceCard } from "./ServiceCard";

interface ServicesOrdersListProps {
    servicesOrders: ServiceOrder[];
    refresh: () => void;
}

export function ServicesOrdersList({ servicesOrders, refresh }: ServicesOrdersListProps) {
    return (
        <div className="mt-7 flex flex-wrap gap-3 justify-between max-w-7xl mx-auto">
            <section className="flex-1">
                <h2 className="font-bold text-center text-lg">Abertas</h2>
                <ul className="flex flex-col gap-2 mt-2">
                    {servicesOrders.map(
                        (serviceOrder) =>
                            serviceOrder.status === "open" && (
                                <li>
                                    <ServiceCard onDelete={refresh} setStatus={refresh} {...serviceOrder} />
                                </li>
                            ),
                    )}
                </ul>
            </section>

            <section className="flex-1">
                <h2 className="font-bold text-center text-lg">Em progresso</h2>
                <ul className="flex flex-col gap-2 mt-2">
                    {servicesOrders.map(
                        (serviceOrder) =>
                            serviceOrder.status === "in_progress" && (
                                <li>
                                    <ServiceCard onDelete={refresh} setStatus={refresh} {...serviceOrder} />
                                </li>
                            ),
                    )}
                </ul>
            </section>

            <section className="flex-1">
                <h2 className="font-bold text-center text-lg">Finalizadas</h2>
                <ul className="flex flex-col gap-2 mt-2">
                    {servicesOrders.map(
                        (serviceOrder) =>
                            serviceOrder.status === "done" && (
                                <li>
                                    <ServiceCard onDelete={refresh} setStatus={refresh} {...serviceOrder} />
                                </li>
                            ),
                    )}
                </ul>
            </section>
        </div>
    );
}
