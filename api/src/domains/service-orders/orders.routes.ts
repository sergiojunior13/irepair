import { Router } from "express";
import { OrdersController } from "./orders.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

export const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.use(authMiddleware);

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/:id", ordersController.getById);
ordersRoutes.get("/", ordersController.getAllByClient);
ordersRoutes.put("/:id", ordersController.update);
ordersRoutes.delete("/:id", ordersController.delete);
