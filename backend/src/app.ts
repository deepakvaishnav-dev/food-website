const express = require("express");
const foodRoutes = require("./routes/food.routes");

const app = express();

app.use(express.json());
app.use("/api", foodRoutes);

module.exports = app;
