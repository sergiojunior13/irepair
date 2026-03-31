import type { Client, NewClient } from "../types";
import { api, catchError } from "./api";

export async function getClient(id: Client["id"]): Promise<Client | null> {
    try {
        const res = await api.get<{ data: Client }>(`/clients/${id}`);
        const client = res.data.data;

        return client;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function createClient(newClient: NewClient): Promise<Client | null> {
    try {
        const res = await api.post<{ data: Client }>(`/clients`, newClient);
        const createdClient = res.data.data;

        return createdClient;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function updateClient(id: Client["id"], updatedClient: NewClient): Promise<Client | null> {
    try {
        const res = await api.put<{ data: Client }>(`/clients/${id}`, updatedClient);
        const client = res.data.data;

        return client;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function deleteClient(id: Client["id"]): Promise<boolean> {
    try {
        const res = await api.delete<{ data: { success: boolean } }>(`/clients/${id}`);

        return res.data.data.success;
    } catch (error) {
        catchError(error);

        return false;
    }
}

export async function getClients(): Promise<Client[] | null> {
    try {
        const res = await api.get<{ data: Client[] }>(`/clients`);
        const clients = res.data.data;

        return clients;
    } catch (error) {
        catchError(error);

        return null;
    }
}
