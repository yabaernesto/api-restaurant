import express from "express";

import { errorHandling } from "@/middlewares/error-handling";
import { routes } from "./routes";

const app = express();
app.use(express.json());

app.use(routes);
app.use(errorHandling);

const PORT = Number(process.env.PORT ?? 3333);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
