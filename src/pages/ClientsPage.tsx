import { useEffect, useState } from "react";
import { NewClientForm } from "../components/NewClientForm";
import { createClient, getClients } from "../services/clientService";
import type { Client, NewClient } from "../types";
import { ClientCard } from "../components/ClientCard";

export function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const client = await getClients();
            if (!client) {
                alert("Não foi possível obter as ordens de serviço.");
                setIsLoading(false);
                return;
            }

            setClients(client);
            setIsLoading(false);
        }

        load();
    }, [refreshKey]);

    function refresh() {
        setRefreshKey((prev) => prev + 1);
    }

    async function addClient(client: NewClient) {
        await createClient(client);
        refresh();
    }

    return (
        <div className="flex flex-col p-6">
            <NewClientForm addClient={addClient} />

            {!isLoading && (
                <ul className="flex flex-wrap justify-center gap-3 mt-5 max-w-5xl mx-auto">
                    {clients.map((client) => (
                        <li>
                            <ClientCard client={client} onDelete={refresh} />
                        </li>
                    ))}
                </ul>
            )}

            {isLoading && <p className="text-center font-bold text-2xl mt-10">Carregando clientes...</p>}
        </div>
    );
}
