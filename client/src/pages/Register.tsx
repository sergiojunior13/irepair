import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { AxiosError } from "axios";
import { createClient } from "../services/clientService";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await createClient({ email, name, password, phone });
            navigate("/login");
        } catch (err: unknown) {
            setError(
                err instanceof AxiosError ? err.response?.data?.error || err?.message : "Erro ao criar uma conta.",
            );
        } finally {
            setIsLoading(false);
        }
    }

    const formInputsData = [
        { value: name, id: "name", type: "text", label: "Nome", set: setName },
        { value: email, id: "email", type: "email", label: "E-mail", set: setEmail },
        { value: password, id: "password", type: "password", label: "Senha", set: setPassword },
        { value: phone, id: "phone", type: "tel", label: "Telefone", set: setPhone },
    ];

    return (
        <div className="p-4 flex flex-col items-center gap-6 min-h-screen justify-center">
            <h1 className="text-3xl font-extrabold text-blue-600">iRepair — Criar uma conta de cliente</h1>
            <form
                className="bg-blue-200 flex flex-col max-w-2xl w-full gap-3 border-2 rounded-xl border-blue-600 p-3 shadow-blue-100 shadow-lg"
                onSubmit={handleSubmit}
            >
                {formInputsData.map((inputData) => (
                    <div className={`flex flex-col`}>
                        <label className="font-semibold" htmlFor={inputData.id}>
                            {inputData.label}
                        </label>

                        <input
                            type={inputData.type}
                            id={inputData.id}
                            value={inputData.value}
                            placeholder={`Insira o/a ${inputData.label.toLowerCase()}...`}
                            onChange={(e) => inputData.set(e.target.value)}
                            className="bg-blue-50 p-2 rounded-lg"
                            required
                        />
                    </div>
                ))}

                {error && <p className="text-red-600 font-semibold">{error}</p>}

                <button
                    type="submit"
                    className="bg-blue-600 rounded-lg py-2 text-white font-bold hover:bg-blue-800 cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? "Criando..." : "Criar"}
                </button>
            </form>

            <p>
                Já possui uma conta?{" "}
                <Link to="/login" className="text-blue-600 font-bold">
                    Entre nela
                </Link>
                .
            </p>
        </div>
    );
}
