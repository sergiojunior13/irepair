import type { ServiceOrder } from "../types/ServiceOrder";

export function ServiceCard({ clientName, defect, deviceModel, status }: ServiceOrder) {
    return (
        <div>
            <span>{status}</span>
            <h3>{defect}</h3>
            <p>Modelo: {deviceModel}</p>
            <p>Cliente: {clientName}</p>
        </div>
    );
}
