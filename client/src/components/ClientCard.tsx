import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalProvider";
import { deleteClient } from "../services/clientService";
import type { Client } from "../types";

interface ClientCardProps {
    client: Client;
    onDelete: () => void;
}

export const ClientCard = ({ onDelete, client }: ClientCardProps) => {
    const modal = useModal();
    const { user } = useAuth();

    async function handleDeleteBtnClick() {
        try {
            await deleteClient(client.id);

            onDelete();
        } catch (err: any) {
            const message = err.response?.data?.error || "Não foi possível deletar o cliente.";
            modal.showMessage(message, "error");
        }
    }

    return (
        <div
            className={`flex flex-col gap-1 max-w-3xl min-w-sm mx-auto bg-zinc-200 border-zinc-600 border-2 rounded-xl p-3 shadow-blue-100 shadow-lg`}
        >
            <div className="flex justify-between">
                <h3 className="font-extrabold first-letter:uppercase text-lg">{client.name}</h3>

                {user?.id === client.id && (
                    <button
                        onClick={handleDeleteBtnClick}
                        className="text-white shadow-sm shadow-red-900/80 bg-red-600 cursor-pointer hover:bg-red-800 border border-red-700 transition-colors px-2 p-0.5 rounded-lg font-semibold inline"
                    >
                        X
                    </button>
                )}
            </div>

            <div className="flex gap-2">
                <p>{client.email}</p>|<p>{`(${client.phone.substring(0, 2)}) ${client.phone.substring(2)}`}</p>
            </div>

            <p className="font-medium text-black/60 text-end text-sm">{client.created_at.toLocaleString()}</p>
        </div>
    );
};
