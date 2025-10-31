import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import seedDefaultCategories from "./config/seedDefaultCategories.js";

dotenv.config();
const app = express();
const PORT = 3000;

connectDB();
seedDefaultCategories();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Expense Manager");
});

app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
app.use("/api", categoryRoutes);

app.use(errorHandler); // The error handler should be after all the routes

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
