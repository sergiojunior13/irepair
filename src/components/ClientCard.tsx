import { deleteClient } from "../services/clientService";
import type { Client } from "../types";

interface ClientCardProps {
    client: Client;
    onDelete: () => void;
}

export const ClientCard = ({ onDelete, client }: ClientCardProps) => {
    async function handleDeleteBtnClick() {
        const success = await deleteClient(client.id);

        if (success) onDelete();
    }

    return (
        <div
            className={`flex flex-col gap-1 max-w-3xl min-w-sm mx-auto bg-zinc-200 border-zinc-600 border-2 rounded-xl p-3 shadow-blue-100 shadow-lg`}
        >
            <div className="flex justify-between">
                <h3 className="font-extrabold first-letter:uppercase text-lg">{client.name}</h3>

                <button
                    onClick={handleDeleteBtnClick}
                    className="text-white shadow-sm shadow-red-900/80 bg-red-600 cursor-pointer hover:bg-red-800 border border-red-700 transition-colors px-2 p-0.5 rounded-lg font-semibold inline"
                >
                    X
                </button>
            </div>

            <div className="flex gap-2">
                <p>{client.email}</p>|<p>{`(${client.phone.substring(0, 2)}) ${client.phone.substring(2)}`}</p>
            </div>

            <p className="font-medium text-black/60 text-end text-sm">{client.created_at.toLocaleString()}</p>
        </div>
    );
};
