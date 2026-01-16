import express from "express";
import cors from "cors";
import foodRoutes from "./routes/food.routes";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

export default app;
