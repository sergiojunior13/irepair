export interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    created_at: Date;
}

export type NewClient = Omit<Client, "id" | "created_at">;
