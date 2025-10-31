import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    unique: true,
    trim: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

categorySchema.pre("save", function (next) {
  if (this.title) {
    this.title = this.title
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
