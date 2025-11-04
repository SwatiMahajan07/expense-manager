import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },
    title: { type: String, required: [true, "Please provide a title"] },
    amount: {
      type: Number,
      required: [true, "Please provide the amount"],
      min: [1, "Amount must be non-zero"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please provide payment method used"],
    },
    date: {
      type: Date,
      required: [true],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true],
    },
    note: {
      type: String,
      required: [false],
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
