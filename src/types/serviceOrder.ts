export interface ServiceOrder {
    client_id: string;
    device: string;
    issue: string;
    status: "open" | "in_progress" | "done";
    created_at: Date;
}

export type NewServiceOrder = Omit<ServiceOrder, "id" | "client_id" | "created_at"> & { clientId: string };
