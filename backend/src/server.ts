import app from "./app";
import { connectDB } from "./config/database";
import * as dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  await connectDB();
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

startServer();
