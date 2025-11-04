import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  addExpense,
  deleteExpenseById,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/expenses", protect, addExpense);
router.get("/expenses", protect, getAllExpenses);
router.get("/expenses/:id", protect, getExpenseById);
router.put("/expenses/:id", protect, updateExpenseById);
router.delete("/expenses/:id", protect, deleteExpenseById);

export default router;
