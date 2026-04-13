import { Router } from "express";
import { ClientsController } from "./clients.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

export const clientsRoutes = Router();
const clientsController = new ClientsController();

clientsRoutes.get("/:id", clientsController.getById);
clientsRoutes.get("/", clientsController.getAll);
clientsRoutes.put("/:id", authMiddleware, clientsController.update);
clientsRoutes.delete("/:id", authMiddleware, clientsController.delete);
