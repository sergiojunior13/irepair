import type { ServiceOrder } from "../types/serviceOrder";

type ServiceCardProps = ServiceOrder & { setStatus: (status: ServiceOrder["status"]) => void };

export function ServiceCard({ clientName, defect, deviceModel, status, createdAt, setStatus }: ServiceCardProps) {
    function handleChangeStatusBtnClick() {
        if (status === "done") setStatus("open");
        else setStatus("done");
    }

    return (
        <div
            className={`flex flex-col gap-1 max-w-3xl mx-auto ${status === "open" ? "border-green-600 bg-green-200" : "border-zinc-600 bg-zinc-200"} border-2 rounded-xl p-3 shadow-blue-100 shadow-lg`}
        >
            <div className="flex justify-between">
                <span
                    className={`text-white w-min ${status === "open" ? "bg-green-600" : "bg-zinc-600"} p-1 px-2 rounded-full font-semibold`}
                >
                    {status === "open" ? "Aberto" : "Finalizado"}
                </span>

                <button
                    onClick={handleChangeStatusBtnClick}
                    className="text-white shadow-md shadow-red-900/80 bg-red-600 cursor-pointer hover:bg-red-800 transition-colors px-2 p-0.5 rounded-lg font-semibold inline"
                >
                    Mudar status
                </button>
            </div>

            <h3 className="font-extrabold first-letter:uppercase text-lg">{defect}</h3>

            <div className="flex gap-2">
                <p>
                    <span className="font-bold">Modelo:</span> {deviceModel}
                </p>
                |
                <p>
                    <span className="font-bold">Cliente:</span> {clientName}
                </p>
            </div>

            <p className="font-medium text-black/80 text-end text-sm">{createdAt.toLocaleString()}</p>
        </div>
    );
}
