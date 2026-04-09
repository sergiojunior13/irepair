import "dotenv/config";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não definido nas variáveis de ambiente");
}
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não definido nas variáveis de ambiente");
}

import { app } from "./config/expressConfig";

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
