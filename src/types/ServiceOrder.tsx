export interface ServiceOrder {
    createdAt: Date;
    clientName: string;
    deviceModel: string;
    defect: string;
    status: "open" | "done";
}
