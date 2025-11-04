import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import Expense from "../models/expenseModel.js";

export const getAllCategoriesByUserId = asyncHandler(async (req, res) => {
  const categories = await Category.find({ users: req.user._id });

  res.status(200).json({
    success: true,
    message:
      categories.length > 0
        ? "Successfully found categories linked to the user"
        : "No linked categories found for the user",
    data: categories,
  });
});

export const addCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const cleanedTitle = title.toLowerCase().trim();

  const existingCategory = await Category.findOne({
    title: { $regex: `^${cleanedTitle}$`, $options: "i" },
  });

  if (existingCategory) {
    const isUserLinked = await existingCategory.users.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (isUserLinked) {
      res.status(400).json({
        success: false,
        message: "User is already linked to this category",
      });
      return;
    }

    existingCategory.users.push(req.user._id);
    await existingCategory.save();

    res.status(200).json({
      success: true,
      message: "User added successfully to the existing category",
      data: existingCategory,
    });
  } else {
    const category = await Category.create({
      title,
      users: [req.user._id],
    });

    if (category) {
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Category creation failed",
      });
    }
  }
});

export const deleteCategoryById = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const categoryFound = await Category.findById(categoryId);

  if (!categoryFound) {
    return res.status(404).json({
      success: false,
      message: "Category not found for the given ID",
    });
  }

  const userBelongs = categoryFound.users.some(
    (user) => user.toString() === req.user._id.toString()
  );

  if (!userBelongs) {
    return res.status(403).json({
      success: false,
      message: "Category does not belong in your list",
    });
  }

  let uncategorized = await Category.findOne({
    title: "Uncategorized",
    users: req.user._id,
  });

  if (!uncategorized) {
    uncategorized = await Category.create({
      title: "Uncategorized",
      users: [req.user._id],
    });
  }

  await Expense.updateMany(
    {
      userId: req.user._id,
      category: categoryFound._id,
    },
    {
      $set: { category: uncategorized._id },
    }
  );

  categoryFound.users = categoryFound.users.filter(
    (user) => user.toString() !== req.user._id.toString()
  );

  if (categoryFound.users.length === 0) {
    await categoryFound.deleteOne();
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } else {
    await categoryFound.save();
    res.status(200).json({
      success: true,
      message: "Category successfully delinked",
    });
  }
});
