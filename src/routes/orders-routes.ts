import { Router } from "express";

import { OrdersController } from "@/controllers/orders-controller";

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/session-table/:table_session_id", ordersController.index);
ordersRoutes.get(
  "/session-table/:table_session_id/total",
  ordersController.show,
);

export { ordersRoutes };
