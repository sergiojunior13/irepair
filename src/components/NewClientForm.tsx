import { useState } from "react";
import type { NewClient } from "../types";

interface NewClientFormProps {
    addClient: (newClient: NewClient) => Promise<void>;
}

export const NewClientForm = ({ addClient }: NewClientFormProps) => {
    const [client, setClient] = useState<NewClient>({} as NewClient);
    const [isSavingClient, setIsSavingClient] = useState(false);

    async function handleCreateClientBtnClick(e: React.SubmitEvent<HTMLFormElement>) {
        // Impede a página de recarregar
        e.preventDefault();
        setIsSavingClient(true);

        // Verificações dos inputs
        if (!client.name) {
            alert("Insira o nome do cliente!");
            setIsSavingClient(false);

            return;
        }

        if (!client.email) {
            alert("Insira o email do cliente!");
            setIsSavingClient(false);

            return;
        }

        if (!client.phone || isNaN(Number(client.phone))) {
            alert("Insira um número de telefone válido!");
            setIsSavingClient(false);

            return;
        }

        await addClient(client);
        setIsSavingClient(false);
    }

    const formInputsData = [
        { id: "name", type: "text", label: "Nome" },
        { id: "email", type: "email", label: "E-mail" },
        { id: "phone", type: "tel", label: "Número de telefone" },
    ];

    return (
        <form
            className="flex flex-wrap gap-2 mx-auto bg-blue-200 border-2 rounded-xl border-blue-600 p-3 shadow-blue-100 shadow-lg"
            onSubmit={handleCreateClientBtnClick}
        >
            {formInputsData.map((inputData) => (
                <div className={`flex flex-col ${inputData.id === "name" ? "basis-full" : "flex-1"}`}>
                    <label className="font-semibold" htmlFor={inputData.id}>
                        {inputData.label}
                    </label>

                    <input
                        type={inputData.type}
                        id={inputData.id}
                        placeholder={`Insira o ${inputData.label.toLowerCase()}...`}
                        onChange={(e) => setClient({ ...client, [inputData.id]: e.target.value })}
                        className="bg-blue-50 p-2 rounded-lg"
                        required
                    />
                </div>
            ))}

            <button
                type="submit"
                disabled={isSavingClient}
                className="w-full disabled:opacity-60 cursor-pointer bg-blue-700 hover:bg-blue-800 mt-4 transition-colors p-2 rounded-xl text-white font-extrabold text-lg"
            >
                {isSavingClient ? "Criando..." : "Criar"}
            </button>
        </form>
    );
};
