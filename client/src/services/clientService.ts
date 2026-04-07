import type { Client, NewClient } from "../types";
import { api, catchError } from "./api";

export async function getClient(id: Client["id"]): Promise<Client | null> {
    try {
        const res = await api.get<Client>(`/clients/${id}`);
        const client = res.data;

        return client;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function createClient(newClient: NewClient): Promise<Client | null> {
    try {
        const res = await api.post<Client>(`/clients`, newClient);
        const createdClient = res.data;

        return createdClient;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function updateClient(id: Client["id"], updatedClient: NewClient): Promise<Client | null> {
    try {
        const res = await api.put<Client>(`/clients/${id}`, updatedClient);
        const client = res.data;

        return client;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function deleteClient(id: Client["id"]) {
    try {
        await api.delete(`/clients/${id}`);
    } catch (error) {
        catchError(error);
    }
}

export async function getClients(): Promise<Client[] | null> {
    try {
        const res = await api.get<Client[]>(`/clients`);
        const clients = res.data;

        return clients;
    } catch (error) {
        catchError(error);

        return null;
    }
}
