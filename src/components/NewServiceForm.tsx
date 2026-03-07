import { useState } from "react";
import type { ServiceOrder } from "../types/ServiceOrder";

interface NewServiceFormProps {
    addServiceOrder: (serviceOrder: ServiceOrder) => void;
}

export function NewServiceForm({ addServiceOrder }: NewServiceFormProps) {
    const [serviceOrder, setServiceOrder] = useState<ServiceOrder>({ status: "open" } as ServiceOrder);

    function handleCreateServiceBtnClick(e: React.SubmitEvent<HTMLFormElement>) {
        // Impede a página de recarregar
        e.preventDefault();

        // Verificações dos inputs
        if (!serviceOrder.clientName) {
            alert("Insira o nome do cliente!");
            return;
        }

        if (!serviceOrder.defect) {
            alert("Insira o defeito do aparelho!");
            return;
        }

        if (!serviceOrder.deviceModel) {
            alert("Insira o modelo do aparelho!");
            return;
        }

        // Valor padrão do 'status'
        if (!serviceOrder.status) serviceOrder.status = "open";

        addServiceOrder(serviceOrder);
    }

    return (
        <form onSubmit={handleCreateServiceBtnClick}>
            <div>
                <label htmlFor="client-name">Nome do cliente</label>
                <input
                    type="text"
                    id="client-name"
                    placeholder="Insira o nome do cliente..."
                    onChange={(e) => setServiceOrder({ ...serviceOrder, clientName: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="defect">Defeito do aparelho</label>
                <input
                    type="text"
                    id="defect"
                    placeholder="Insira o defeito do aparelho..."
                    onChange={(e) => setServiceOrder({ ...serviceOrder, defect: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="device-model">Modelo do aparelho</label>
                <input
                    type="text"
                    id="device-model"
                    placeholder="Insira o modelo do aparelho..."
                    onChange={(e) => setServiceOrder({ ...serviceOrder, deviceModel: e.target.value })}
                />
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}
