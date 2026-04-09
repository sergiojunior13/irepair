import type { NewServiceOrder, ServiceOrder } from "../types";
import { api, logError } from "./api";

export async function getServiceOrder(id: ServiceOrder["id"]): Promise<ServiceOrder | null> {
    try {
        const res = await api.get<ServiceOrder>(`/orders/${id}`);
        const serviceOrder = res.data;
        serviceOrder.created_at = new Date(serviceOrder.created_at); // Vem da API como string

        return serviceOrder;
    } catch (error) {
        logError(error);

        throw error;
    }
}

export async function createServiceOrder(newServiceOrder: NewServiceOrder): Promise<ServiceOrder | null> {
    try {
        const res = await api.post<ServiceOrder>(`/orders`, newServiceOrder);
        const createdServiceOrder = res.data;
        createdServiceOrder.created_at = new Date(createdServiceOrder.created_at); // Vem da API como string

        return createdServiceOrder;
    } catch (error) {
        logError(error);

        throw error;
    }
}

export async function updateServiceOrder(
    id: ServiceOrder["id"],
    updatedServiceOrder: NewServiceOrder,
): Promise<ServiceOrder | null> {
    try {
        const res = await api.put<ServiceOrder>(`/orders/${id}`, updatedServiceOrder);
        const serviceOrder = res.data;
        serviceOrder.created_at = new Date(serviceOrder.created_at);

        return serviceOrder;
    } catch (error) {
        logError(error);

        throw error;
    }
}

export async function deleteServiceOrder(id: ServiceOrder["id"]) {
    try {
        await api.delete(`/orders/${id}`);
    } catch (error) {
        logError(error);
    }
}

export async function getServiceOrders(): Promise<ServiceOrder[] | null> {
    try {
        const res = await api.get<ServiceOrder[]>(`/orders`);
        const serviceOrders = res.data;
        serviceOrders.forEach((so) => (so.created_at = new Date(so.created_at)));

        return serviceOrders;
    } catch (error) {
        logError(error);

        throw error;
    }
}
