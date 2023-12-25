import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Category = mongoose.model('Category', categorySchema);

export default Category
