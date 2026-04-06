import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Client, Prisma, ServiceOrder } from "../../../generated/prisma/client";
import { prisma } from "../../config/prismaClient";
import { AppError } from "../../utils/AppError";

export type NewOrder = Omit<Prisma.ServiceOrderCreateInput, "created_at" | "client" | "status">;
export type UpdatedOrder = NewOrder & { status: "open" | "in_progress" | "done" };

export class OrdersService {
    async create(clientId: Client["id"], NewOrder: NewOrder) {
        try {
            const createdOrder = await prisma.serviceOrder.create({
                data: {
                    ...NewOrder,
                    client: {
                        connect: { id: clientId },
                    },
                },
            });

            return createdOrder;
        } catch (error) {
            // O código de erro 'P2018' é quando "The required connected records were not found"
            // Ou seja, se não existe um cliente com aquele id para criar uma ordem de serviço
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2018") {
                throw new AppError("Não existe um cliente com este 'id'", 404);
            }

            throw error;
        }
    }

    async getById(id: ServiceOrder["id"], clientId: ServiceOrder["client_id"]) {
        const serviceOrder = await prisma.serviceOrder.findUnique({
            where: { id, client_id: clientId },
        });

        if (!serviceOrder) throw new AppError("Ordem de serviço não encontrada ou ela não te pertence", 404);

        return serviceOrder;
    }

    async getAllByClient(clientId: Client["id"]) {
        const serviceOrders = await prisma.serviceOrder.findMany({
            where: { client_id: clientId },
        });

        return serviceOrders;
    }

    async update(id: ServiceOrder["id"], clientId: ServiceOrder["client_id"], order: UpdatedOrder) {
        try {
            const updatedOrder = await prisma.serviceOrder.update({
                where: { id, client_id: clientId },
                data: order,
            });

            return updatedOrder;
        } catch (error) {
            // O código de erro 'P2025' é para quando a ordem de serviço a ser atualizada não existe
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new AppError("Não existe uma ordem de serviço com este 'id' ou ela não te pertence", 404);
            }

            throw error;
        }
    }

    async delete(id: ServiceOrder["id"], clientId: ServiceOrder["client_id"]) {
        try {
            await prisma.serviceOrder.delete({
                where: { id, client_id: clientId },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new AppError("Não existe uma ordem de serviço com este 'id' ou ela não te pertence", 404);
            }

            throw error;
        }
    }
}
