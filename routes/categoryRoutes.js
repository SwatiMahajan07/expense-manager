import express from "express";
import {
  addCategory,
  deleteCategoryById,
  getAllCategoriesByUserId,
} from "../controllers/categoryController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/categories", protect, getAllCategoriesByUserId);
router.post("/categories", protect, addCategory);
router.delete("/categories/:id", protect, deleteCategoryById);

export default router;
