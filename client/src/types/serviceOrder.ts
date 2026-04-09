export interface ServiceOrder {
    id: number;
    client_id: number;
    device: string;
    issue: string;
    status: "open" | "in_progress" | "done";
    created_at: Date;
}

export type NewServiceOrder = Omit<ServiceOrder, "id" | "client_id" | "created_at"> & { clientId: number };
