import asyncHandler from "express-async-handler";
import Expense from "../models/expenseModel.js";

export const addExpense = asyncHandler(async (req, res) => {
  const { title, amount, paymentMethod, note, date, category } = req.body;

  if (
    !req.user._id ||
    !title ||
    !amount ||
    !paymentMethod ||
    !date ||
    !category
  ) {
    res.status(400).json({
      success: false,
      message: "Please provide all required data",
    });
    throw new Error("Please provide all required data");
  }

  const expense = await Expense.create({
    userId: req.user._id,
    title,
    amount,
    paymentMethod,
    note,
    date,
    category,
  });

  if (expense) {
    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: {
        userId: req.user._id,
        expenseId: expense.id,
        createdAt: expense.createdAt,
      },
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Error creating expense",
    });
    throw new Error("Error creating expense");
  }
});

export const getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ userId: req.user._id });

  if (!expenses || expenses.length === 0) {
    res.status(404).json({
      success: false,
      message: "No expenses found",
    });
    throw new Error("No expenses found");
  }

  res.status(200).json({
    success: true,
    message: "Expenses fetched successfully",
    data: {
      count: expenses.length,
      expenses,
    },
  });
});

export const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (expense) {
    res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      data: expense,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No expense found for the mentioned ID",
    });
    throw new Error("No expense found for the mentioned ID");
  }
});

export const updateExpenseById = asyncHandler(async (req, res) => {
  const { title, amount, paymentMethod, note, category, date } = req.body;

  const updates = {};

  if (title) updates.title = title;
  if (amount) updates.amount = amount;
  if (paymentMethod) updates.paymentMethod = paymentMethod;
  if (note) updates.note = note;
  if (category) updates.category = category;
  if (date) updates.date = date;

  const expense = await Expense.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!expense) {
    res.status(404).json({
      success: false,
      message: "No expense found for the mentioned ID",
    });
    throw new Error("No expense found for the mentioned ID");
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    { _id: expense.id },
    updates,
    { new: true, runValidators: true }
  );

  if (updatedExpense) {
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Update expense failed",
    });
    throw new Error("Update expense failed");
  }
});

export const deleteExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!expense) {
    res.status(404).json({
      success: false,
      message: "No expense found for the mentioned ID",
    });
    throw new Error("No expense found for the mentioned ID");
  }

  const deletedExpense = await Expense.findByIdAndDelete(expense.id);

  if (deletedExpense) {
    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } else {
    res.status(400).json({ success: false, message: "Delete expense failed" });
    throw new Error("Delete expense failed");
  }
});
