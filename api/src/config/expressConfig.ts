import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { authRoutes } from "../domains/auth/ auth.router";
import { ordersRoutes } from "../domains/service-orders/orders.router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_ORIGIN,
        credentials: true,
    }),
);

app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);

export { app };
