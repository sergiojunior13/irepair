import type { NewServiceOrder, ServiceOrder } from "../types";
import { api, catchError } from "./api";

export async function getServiceOrder(id: ServiceOrder["id"]): Promise<ServiceOrder | null> {
    try {
        const res = await api.get<{ data: ServiceOrder }>(`/service-orders/${id}`);
        const serviceOrder = res.data.data;

        return serviceOrder;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function createServiceOrder(newServiceOrder: NewServiceOrder): Promise<ServiceOrder | null> {
    try {
        const res = await api.post<{ data: ServiceOrder }>(`/service-orders`, newServiceOrder);
        const createdServiceOrder = res.data.data;

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
        const res = await api.put<{ data: ServiceOrder }>(`/service-orders/${id}`, updatedServiceOrder);
        const serviceOrder = res.data.data;

        return serviceOrder;
    } catch (error) {
        catchError(error);

        return null;
    }
}

export async function deleteServiceOrder(id: ServiceOrder["id"]): Promise<boolean> {
    try {
        const res = await api.delete<{ data: { success: boolean } }>(`/service-orders/${id}`);

        return res.data.data.success;
    } catch (error) {
        catchError(error);

        return false;
    }
}

export async function getServiceOrders(): Promise<ServiceOrder[] | null> {
    try {
        const res = await api.get<{ data: ServiceOrder[] }>(`/service-orders`);
        const serviceOrders = res.data.data;

        return serviceOrders;
    } catch (error) {
        catchError(error);

        return null;
    }
}
