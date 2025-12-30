import express from "express";
import cors from "cors";
import foodRoutes from "./routes/food.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/foods", foodRoutes);

export default app;
