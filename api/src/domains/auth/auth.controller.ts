import { Request, Response } from "express";
import { AuthService, NewUser } from "./auth.service";
import { AppError } from "../../utils/AppError";
import { Client } from "../../../generated/prisma/client";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            if (!req.body) throw new AppError("Corpo da requisição ausente", 400);

            const { email, password, name, phone } = req.body as NewUser;

            if (!name || !email || !phone || !password)
                throw new AppError(
                    "Os campos 'email', 'password', 'name' e 'phone' precisam estar presentes no corpo da requisição",
                    400,
                );

            const client = await authService.register({ email, name, password, phone });

            return res.status(201).json(client);
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            if (!req.body) throw new AppError("Corpo da requisição ausente", 400);

            const { email, password } = req.body as Pick<Client, "email" | "password">;

            if (!email || !password)
                throw new AppError(
                    "Os campos 'email' e 'password' precisam estar presentes no corpo da requisição",
                    400,
                );

            const { token, user } = await authService.login(email, password);

            res.cookie("token", token, {
                httpOnly: true, // Para o JavaScript não consegue ler este cookie
                secure: process.env.NODE_ENV === "production", // secure: true somente quando estiver em produção
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
                maxAge: 60 * 60 * 1000, // 1 hora em milissegundos
            });

            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({ error: error.message });
        }
    }

    async me(req: Request, res: Response) {
        return res.status(200).json(req.user);
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout realizado com sucesso" });
    }
}
