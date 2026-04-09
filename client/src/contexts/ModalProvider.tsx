import { createContext, useContext, useState } from "react";
import { MessageModal } from "../components/MessageModal";

interface ModalContextType {
    message: string | null;
    messageType: "default" | "error";
    showMessage(message: string, messageType: "default" | "error"): void;
    onCloseModal(): void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<ModalContextType["messageType"]>("default");

    function onCloseModal() {
        setMessage(null);
        setMessageType("default");
    }

    function showMessage(message: string, messageType: "default" | "error") {
        setMessage(message);
        setMessageType(messageType);
    }

    return (
        <ModalContext.Provider
            value={{
                message,
                messageType,
                showMessage,
                onCloseModal,
            }}
        >
            {children}

            {message && (
                <MessageModal message={message} messageType={messageType || "default"} onClose={onCloseModal} />
            )}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal deve ser usado dentro de um ModalProvider");
    return context;
}
