import express from "express";
import foodRoutes from "./routes/food.routes";

const app = express();

app.use(express.json());
app.use("/api", foodRoutes);

export default app;
