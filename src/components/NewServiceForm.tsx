import { useState } from "react";
import type { ServiceOrder } from "../types/serviceOrder";

interface NewServiceFormProps {
    addServiceOrder: (serviceOrder: ServiceOrder) => void;
}

export function NewServiceForm({ addServiceOrder }: NewServiceFormProps) {
    const [serviceOrder, setServiceOrder] = useState<ServiceOrder>({ status: "open" } as ServiceOrder);

    const formInputsData = [
        { id: "defect", label: "Defeito do aparelho" },
        { id: "clientName", label: "Nome do cliente" },
        { id: "deviceModel", label: "Modelo do aparelho" },
    ];

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

        // Adiciona a data de criação da OS
        serviceOrder.createdAt = new Date();

        addServiceOrder(serviceOrder);
    }

    return (
        <form
            className="flex flex-wrap gap-2 mx-auto bg-blue-200 border-2 rounded-xl border-blue-600 p-3 shadow-blue-100 shadow-lg"
            onSubmit={handleCreateServiceBtnClick}
        >
            {formInputsData.map((inputData) => (
                <div className={`flex flex-col ${inputData.id === "defect" ? "basis-full" : "flex-1"}`}>
                    <label className="font-semibold" htmlFor={inputData.id}>
                        {inputData.label}
                    </label>
                    <input
                        type="text"
                        id={inputData.id}
                        placeholder={`Insira o ${inputData.label.toLowerCase()}...`}
                        onChange={(e) => setServiceOrder({ ...serviceOrder, [inputData.id]: e.target.value })}
                        className="bg-blue-50 p-2 rounded-lg"
                    />
                </div>
            ))}

            <button
                type="submit"
                className="w-full cursor-pointer bg-blue-700 hover:bg-blue-800 mt-4 transition-colors p-2 rounded-xl text-white font-extrabold text-lg"
            >
                Salvar
            </button>
        </form>
    );
}
