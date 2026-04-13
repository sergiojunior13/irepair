import { Client, Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../config/prismaClient.js";
import { AppError } from "../../utils/AppError.js";

export type UpdatedClient = Pick<Prisma.ClientUpdateInput, "name" | "phone">;

export class ClientsService {
    async getById(id: Client["id"]) {
        const client = await prisma.client.findUnique({ where: { id }, omit: { password: true } });

        if (!client) throw new AppError("Não existe um cliente com este 'id'", 404);

        return client;
    }

    async getAll() {
        const clients = await prisma.client.findMany({ omit: { password: true } });

        return clients;
    }

    async update(id: Client["id"], data: UpdatedClient) {
        try {
            const updatedClient = await prisma.client.update({
                where: { id },
                omit: { password: true },
                data: {
                    phone: data.phone,
                    name: data.name,
                },
            });

            return updatedClient;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new AppError("Não existe um cliente com este 'id'", 404);
            }

            throw error;
        }
    }

    async delete(id: Client["id"]) {
        try {
            // É necessário deletar todas as OS pertencentes ao cliente primeiro
            await prisma.serviceOrder.deleteMany({
                where: { client_id: id },
            });

            await prisma.client.delete({ where: { id } });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new AppError("Não existe um cliente com este 'id'", 404);
            }

            throw error;
        }
    }
}
