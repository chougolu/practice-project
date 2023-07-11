const mongoose           = require("mongoose");

const productStockSchema = mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    product_variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
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
    availability: {
      type: String,
    },
    quantity: {
      type: String,
    },

    isEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ProductStock = mongoose.model("ProductStock", productStockSchema);

module.exports     = ProductStock;
