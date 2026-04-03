import "dotenv/config";
import { app } from "./config/expressConfig";

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
