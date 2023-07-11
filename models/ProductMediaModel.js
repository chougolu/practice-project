const mongoose           = require("mongoose");
const productMediaSchema = mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    image: {
      type: String,
    },
    image_desc: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductMedia = mongoose.model("ProductMedia", productMediaSchema);
module.exports     = ProductMedia;
