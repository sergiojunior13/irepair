import type { NewServiceOrder, ServiceOrder } from "../types";
import { api, catchError } from "./api";

export async function getServiceOrder(id: ServiceOrder["id"]): Promise<ServiceOrder | null> {
    try {
        const res = await api.get<ServiceOrder>(`/orders/${id}`);
        const serviceOrder = res.data;

        return serviceOrder;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function createServiceOrder(newServiceOrder: NewServiceOrder): Promise<ServiceOrder | null> {
    try {
        const res = await api.post<ServiceOrder>(`/orders`, newServiceOrder);
        const createdServiceOrder = res.data;

        return createdServiceOrder;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function updateServiceOrder(
    id: ServiceOrder["id"],
    updatedServiceOrder: NewServiceOrder,
): Promise<ServiceOrder | null> {
    try {
        const res = await api.put<ServiceOrder>(`/orders/${id}`, updatedServiceOrder);
        const serviceOrder = res.data;

        return serviceOrder;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function deleteServiceOrder(id: ServiceOrder["id"]) {
    try {
        await api.delete(`/orders/${id}`);
    } catch (error) {
        catchError(error);
    }
}

export async function getServiceOrders(): Promise<ServiceOrder[] | null> {
    try {
        const res = await api.get<ServiceOrder[]>(`/orders`);
        const serviceOrders = res.data;

        return serviceOrders;
    } catch (error) {
        catchError(error);

        return null;
    }
}
