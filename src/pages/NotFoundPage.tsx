import { Link } from "react-router";

export const NotFoundPage = () => {
    return (
        <div className="h-[80vh] flex flex-col items-center justify-center text-3xl">
            <p className="font-extrabold text-6xl text-blue-700">404</p>
            <p className="font-medium">Esta página não existe :(</p>
            <Link to="/" className="text-blue-700 font-bold mt-7 underline">
                [Voltar para o início]
            </Link>
        </div>
    );
};
