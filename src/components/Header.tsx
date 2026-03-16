import { Link } from "react-router";

export const Header = () => {
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
                </ul>
            </nav>
        </header>
    );
};
