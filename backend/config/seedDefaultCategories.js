import { DefaultCategories } from "../constants.js";
import Category from "../models/categoryModel.js";

const seedDefaultCategories = async () => {
  try {
    for (const category of DefaultCategories) {
      const categoryExists = await Category.findOne({ title: category.title });
      if (!categoryExists) {
        await Category.create({
          title: category.title,
        });
      }
    }
    console.log("Default categories seeded");
  } catch (error) {
    console.error("Default categories seeding failed", error.message);
  }
};

export default seedDefaultCategories;
