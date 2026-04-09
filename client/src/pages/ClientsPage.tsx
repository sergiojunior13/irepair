import { useEffect, useState } from "react";
import { getClients } from "../services/clientService";
import type { Client } from "../types";
import { ClientCard } from "../components/ClientCard";
import { useAuth } from "../contexts/AuthContext";

export const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const auth = useAuth();

    useEffect(() => {
        async function load() {
            const client = await getClients();
            if (!client) {
                alert("Não foi possível obter os clientes.");
                setIsLoading(false);
                return;
            }

            setClients(client);
            setIsLoading(false);
        }

        load();
    }, []);

    return (
        <div className="flex flex-col p-6">
            <h2 className="font-bold text-center text-3xl">Clientes</h2>
            {!isLoading && (
                <ul className="flex flex-wrap justify-center gap-3 mt-5 max-w-5xl mx-auto">
                    {clients.map((client) => (
                        <li>
                            <ClientCard client={client} onDelete={auth.logout} />
                        </li>
                    ))}
                </ul>
            )}

            {isLoading && <p className="text-center font-bold text-2xl mt-10">Carregando clientes...</p>}
        </div>
    );
};
