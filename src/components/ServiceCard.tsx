import type { ServiceOrder } from "../types/ServiceOrder";

export function ServiceCard({ clientName, defect, deviceModel, status }: ServiceOrder) {
    return (
        <div
            className={`flex flex-col gap-1 max-w-3xl mx-auto ${status === "open" ? "border-green-600 bg-green-200" : "border-zinc-600 bg-zinc-200"} border-2 rounded-xl p-3 shadow-blue-100 shadow-lg`}
        >
            <span
                className={`text-white w-min ${status === "open" ? "bg-green-600" : "bg-zinc-600"} p-1 px-2 rounded-full font-semibold`}
            >
                {status === "open" ? "Aberto" : "Finalizado"}
            </span>

            <h3 className="font-extrabold first-letter:uppercase text-lg">{defect}</h3>

            <div className="flex gap-2">
                <p className="">
                    <span className="font-bold">Modelo:</span> {deviceModel}
                </p>
                |
                <p className="">
                    <span className="font-bold">Cliente:</span> {clientName}
                </p>
            </div>
        </div>
    );
}
