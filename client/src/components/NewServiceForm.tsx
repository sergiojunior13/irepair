import { useState } from "react";
import type { NewServiceOrder } from "../types/serviceOrder";
import { useModal } from "../contexts/ModalProvider";

interface NewServiceFormProps {
    addServiceOrder: (newServiceOrder: NewServiceOrder) => Promise<void>;
}

export const NewServiceForm = ({ addServiceOrder }: NewServiceFormProps) => {
    const [serviceOrder, setServiceOrder] = useState<NewServiceOrder>({ status: "open" } as NewServiceOrder);
    const [isSavingSO, setIsSavingSO] = useState(false);

    const modal = useModal();

    async function handleCreateServiceBtnClick(e: React.SubmitEvent<HTMLFormElement>) {
        try {
            // Impede a página de recarregar
            e.preventDefault();
            setIsSavingSO(true);

            if (!serviceOrder.issue) {
                alert("Insira o defeito do aparelho!");
                setIsSavingSO(false);

                return;
            }

            if (!serviceOrder.device) {
                alert("Insira o modelo do aparelho!");
                setIsSavingSO(false);

                return;
            }

            // Valor padrão do 'status'
            if (!serviceOrder.status) serviceOrder.status = "open";

            await addServiceOrder(serviceOrder);
            setIsSavingSO(false);
        } catch (err: any) {
            const message = err.response?.data?.error || "Não foi possível criar a ordem de serviço.";
            modal.showMessage(message, "error");
        }
    }

    const formInputsData = [
        { id: "issue", label: "Defeito do aparelho" },
        { id: "device", label: "Modelo do aparelho" },
    ];

    return (
        <form
            className="flex flex-wrap gap-2 mx-auto bg-blue-200 border-2 rounded-xl border-blue-600 p-3 shadow-blue-100 shadow-lg"
            onSubmit={handleCreateServiceBtnClick}
        >
            {formInputsData.map((inputData) => (
                <div className={`flex flex-col ${inputData.id === "issue" ? "basis-full" : "flex-1"}`}>
                    <label className="font-semibold" htmlFor={inputData.id}>
                        {inputData.label}
                    </label>

                    <input
                        type="text"
                        id={inputData.id}
                        placeholder={`Insira o ${inputData.label.toLowerCase()}...`}
                        onChange={(e) => setServiceOrder({ ...serviceOrder, [inputData.id]: e.target.value })}
                        className="bg-blue-50 p-2 rounded-lg"
                        required
                    />
                </div>
            ))}

            <button
                type="submit"
                disabled={isSavingSO}
                className="w-full disabled:opacity-60 cursor-pointer bg-blue-700 hover:bg-blue-800 mt-4 transition-colors p-2 rounded-xl text-white font-extrabold text-lg"
            >
                {isSavingSO ? "Salvando..." : "Salvar"}
            </button>
        </form>
    );
};
