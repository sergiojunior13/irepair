import bcrypt from "bcrypt";
import { prisma } from "../../config/prismaClient.js";
import { JWT } from "../../utils/token.js";
import { AppError } from "../../utils/AppError.js";
import { Prisma } from "../../../generated/prisma/client.js";

const SALT_ROUNDS = 10;

export type NewUser = Omit<Prisma.ClientCreateInput, "created_at" | "service_orders">;

export class AuthService {
    async register(user: NewUser) {
        const alreadyHasAClient = await prisma.client.findUnique({
            where: { email: user.email },
        });

        if (alreadyHasAClient) {
            throw new AppError("Email já cadastrado", 409);
        }

        const hashPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

        const client = await prisma.client.create({
            data: { ...user, password: hashPassword },
            omit: { password: true },
        });

        return client;
    }

    async login(email: string, password: string) {
        const client = await prisma.client.findUnique({
            where: { email },
        });

        if (!client) {
            throw new AppError("Credenciais inválidas", 401);
        }

        const isPasswordCorrect = await bcrypt.compare(password, client.password);

        if (!isPasswordCorrect) {
            throw new AppError("Credenciais inválidas", 401);
        }

        const token = JWT.generateToken({ id: client.id, email: client.email });

        return { token, user: { ...client, password: undefined } };
    }
}
