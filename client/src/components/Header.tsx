import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
    const auth = useAuth();

    return (
        <header className="flex justify-between p-4 px-10 mb-6 bg-blue-600 text-white shadow-md shadow-blue-300">
            <Link to="/">
                <h1 className="font-extrabold text-2xl">iRepair</h1>
            </Link>

            <nav>
                <ul className="flex gap-3 text-lg font-medium">
                    <li>
                        <Link to="/ordens-de-servico">Ordens de serviço</Link>
                    </li>
                    <li>
                        <Link to="/clientes">Clientes</Link>
                    </li>
                    <li>
                        <button
                            className="bg-blue-800 px-4 rounded-lg cursor-pointer hover:bg-blue-900"
                            onClick={auth.logout}
                        >
                            Sair
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
