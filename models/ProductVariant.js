const { boolean }          = require("joi");
const mongoose             =  require("mongoose");
const productVariantSchema = mongoose.Schema({
  
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant_name: {
    type: String,
    required: true,
  },
  variant_value: {
    type: String,
    required: true,
  },
  variant_code: {
    type: Number,
    required: true,
  },
  isEnabled: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
module.exports = ProductVariant;
