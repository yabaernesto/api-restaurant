import { Router } from "express";

import { tablesRoutes } from "./tables-routes";
import { ordersRoutes } from "./orders-routes";
import { productsRoutes } from "./products-routes";
import { tablesSessionsRoutes } from "./tables-sessions-routes";

const routes = Router();

routes.use("/orders", ordersRoutes);
routes.use("/tables", tablesRoutes);
routes.use("/products", productsRoutes);
routes.use("/tables-sessions", tablesSessionsRoutes);

export { routes };
