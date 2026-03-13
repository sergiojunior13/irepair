import { useEffect, useState } from "react";
import type { NewServiceOrder, ServiceOrder } from "../types/serviceOrder";
import type { Client } from "../types";
import { getClient } from "../services/clientService";
import { updateServiceOrder } from "../services/serviceOrderService";

type ServiceCardProps = ServiceOrder & { setStatus: (status: ServiceOrder["status"]) => void };

export function ServiceCard({ setStatus, ...serviceOrder }: ServiceCardProps) {
    function handleChangeStatusBtnClick() {
        const updatedServiceOrder: NewServiceOrder = {
            clientId: serviceOrder.client_id,
            device: serviceOrder.device,
            issue: serviceOrder.issue,
            status: serviceOrder.status,
        };

        switch (serviceOrder.status) {
            case "open":
                updatedServiceOrder.status = "in_progress";
                updateServiceOrder(serviceOrder.id, updatedServiceOrder);
                setStatus("in_progress");
                break;
            case "in_progress":
                updatedServiceOrder.status = "done";
                updateServiceOrder(serviceOrder.id, updatedServiceOrder);
                setStatus("done");
                break;
            case "done":
                updatedServiceOrder.status = "open";
                updateServiceOrder(serviceOrder.id, updatedServiceOrder);
                setStatus("open");
                break;
        }
    }

    const [client, setClient] = useState<Client>();

    useEffect(() => {
        getClient(serviceOrder.client_id).then((c) => {
            if (c) setClient(c);
        });
    });

    let statusName;
    switch (serviceOrder.status) {
        case "open":
            statusName = "Aberta";
            break;
        case "in_progress":
            statusName = "Em andamento";
            break;
        case "done":
            statusName = "Fechada";
            break;
    }

    return (
        <div
            className={`flex flex-col gap-1 max-w-3xl mx-auto ${serviceOrder.status === "open" ? "border-green-600 bg-green-200" : "border-zinc-600 bg-zinc-200"} border-2 rounded-xl p-3 shadow-blue-100 shadow-lg`}
        >
            <div className="flex justify-between">
                <span
                    className={`text-white w-min ${serviceOrder.status === "open" ? "bg-green-600" : "bg-zinc-600"} p-1 px-2 rounded-full font-semibold text-xs whitespace-nowrap`}
                >
                    {statusName}
                </span>

                <button
                    onClick={handleChangeStatusBtnClick}
                    className="text-white shadow-md shadow-red-900/80 bg-red-600 cursor-pointer hover:bg-red-800 transition-colors px-2 p-0.5 rounded-lg font-semibold inline"
                >
                    Mudar status
                </button>
            </div>

            <h3 className="font-extrabold first-letter:uppercase text-lg">{serviceOrder.issue}</h3>

            <div className="flex gap-2">
                <p>
                    <span className="font-bold">Modelo:</span> {serviceOrder.device}
                </p>
                |
                <p>
                    <span className="font-bold">Cliente:</span> {client?.name}
                </p>
            </div>

            <p className="font-medium text-black/80 text-end text-sm">{serviceOrder.created_at.toLocaleString()}</p>
        </div>
    );
}
