import { useEffect } from "react";

interface MessageModalProps {
    message: string | null;
    messageType: "default" | "error";
    onClose: () => void;
}

export function MessageModal({ message, messageType, onClose }: MessageModalProps) {
    useEffect(() => {
        // Deixa o modal visível por 4s
        const timer = setTimeout(onClose, 4 * 1000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={
                "absolute bottom-4 right-4 flex flex-col gap-3 min-w-80 text-white p-4 rounded-md " +
                (messageType == "default" ? "bg-blue-500" : "bg-red-500")
            }
        >
            <h4 className="text-xl font-bold">{messageType == "default" ? "Mensagem" : "Erro"}</h4>
            <p>{message}</p>
        </div>
    );
}
