export interface ServiceOrder {
    clientName: string;
    deviceModel: string;
    defect: string;
    status: "open" | "done";
}
