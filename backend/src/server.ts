const app = require("./app");
const { connectDB } = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
