const mongoose      = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    SKU: {
      type: String,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    childcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Childcategory",
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports     = productModel;
