import { Request, Response } from "express";
import { NewOrder, OrdersService, UpdatedOrder } from "./orders.service.js";
import { AppError } from "../../utils/AppError.js";

const ordersService = new OrdersService();

export class OrdersController {
    async create(req: Request, res: Response) {
        try {
            if (!req.body) throw new AppError("Corpo da requisição ausente", 400);

            const { issue, device } = req.body as NewOrder;

            if (!issue || !device)
                throw new AppError("Os campos 'issue' e 'device' precisam estar presentes no corpo da requisição", 400);

            const createdServiceOrder = await ordersService.create(req.user?.id!, { issue, device });

            return res.status(201).json(createdServiceOrder);
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const idParam = req.params?.id;
            const id = Number(idParam);

            if (!idParam) throw new AppError("Campo 'id' ausente na query da requisição", 400);
            if (isNaN(id)) throw new AppError("Campo 'id' inválido", 400);

            const serviceOrder = await ordersService.getById(id, req.user?.id!);

            return res.status(200).json(serviceOrder);
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({ error: error.message });
        }
    }

    async getAllByClient(req: Request, res: Response) {
        try {
            const serviceOrders = await ordersService.getAllByClient(req.user?.id!);

            return res.status(200).json(serviceOrders);
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

            if (!req.body) if (!req.body) throw new AppError("Corpo da requisição ausente", 400);

            const order = req.body as UpdatedOrder;

            if (!order.device && !order.issue && !order.status)
                throw new AppError(
                    "Pelo menos um dos campos 'issue', 'device' ou 'status' precisam estar presentes no corpo da requisição",
                    400,
                );

            if (order.status && order.status != "done" && order.status != "in_progress" && order.status != "open")
                throw new AppError("O campo 'status' deve ser 'done', 'in_progress' ou 'open'", 400);

            const updatedServiceOrder = await ordersService.update(id, req.user?.id!, order);

            return res.status(200).json(updatedServiceOrder);
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

            await ordersService.delete(id, req.user?.id!);

            return res.status(204).send();
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({ error: error.message });
        }
    }
}
