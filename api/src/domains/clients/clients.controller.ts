import { Request, Response } from "express";
import { ClientsService, UpdatedClient } from "./clients.service.js";
import { AppError } from "../../utils/AppError.js";

const clientsService = new ClientsService();

export class ClientsController {
    async getById(req: Request, res: Response) {
        try {
            const idParam = req.params?.id;
            const id = Number(idParam);

            if (!idParam) throw new AppError("Campo 'id' ausente na query da requisição", 400);
            if (isNaN(id)) throw new AppError("Campo 'id' inválido", 400);

            const client = await clientsService.getById(id);

            return res.status(200).json(client);
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({ error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const clients = await clientsService.getAll();

            return res.status(200).json(clients);
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const idParam = req.params?.id;
            const id = Number(idParam);

            if (!idParam) throw new AppError("Campo 'id' ausente na query da requisição", 400);
            if (isNaN(id)) throw new AppError("Campo 'id' inválido", 400);

            if (req.user?.id !== id) throw new AppError("Você não possui autorização para editar este usuário", 401);

            if (!req.body) throw new AppError("Corpo da requisição ausente", 400);

            const client = req.body as UpdatedClient;
            if (!client.name && !client.phone)
                throw new AppError(
                    "Pelo menos um dos campos 'email', 'name' ou 'phone' precisam estar presentes no corpo da requisição",
                    400,
                );

            const updatedClient = await clientsService.update(id, client);

            return res.status(200).json(updatedClient);
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const idParam = req.params?.id;
            const id = Number(idParam);

            if (!idParam) throw new AppError("Campo 'id' ausente na query da requisição", 400);
            if (isNaN(id)) throw new AppError("Campo 'id' inválido", 400);

            if (req.user?.id !== id) throw new AppError("Você não possui autorização para deletar este usuário", 401);

            await clientsService.delete(id);

            return res.status(204).send();
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({ error: error.message });
        }
    }
}
