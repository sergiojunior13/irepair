import type { Client, NewClient } from "../types";
import { api, logError } from "./api";

export async function getClient(id: Client["id"]): Promise<Client | null> {
    try {
        const res = await api.get<Client>(`/clients/${id}`);
        const client = res.data;
        client.created_at = new Date(client.created_at);

        return client;
    } catch (error) {
        logError(error);

        throw error;
    }
}

export async function createClient(newClient: NewClient): Promise<Client | null> {
    try {
        const res = await api.post<Client>(`/auth/register`, newClient);
        const createdClient = res.data;
        createdClient.created_at = new Date(createdClient.created_at);

        return createdClient;
    } catch (error) {
        logError(error);

        throw error;
    }
}

export async function updateClient(id: Client["id"], updatedClient: NewClient): Promise<Client | null> {
    try {
        const res = await api.put<Client>(`/clients/${id}`, updatedClient);
        const client = res.data;
        client.created_at = new Date(client.created_at);

        return client;
    } catch (error) {
        logError(error);

        throw error;
    }
}

export async function deleteClient(id: Client["id"]) {
    try {
        await api.delete(`/clients/${id}`);
    } catch (error) {
        logError(error);
    }
}

export async function getClients(): Promise<Client[] | null> {
    try {
        const res = await api.get<Client[]>(`/clients`);
        const clients = res.data;
        clients.forEach((cli) => (cli.created_at = new Date(cli.created_at)));

        return clients;
    } catch (error) {
        logError(error);

        throw error;
    }
}
