const mongoose            = require("mongoose");
const childcategorySchema = mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  subcategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Subcategory",
  },
  
  name: {
    type: String,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  isEnabled: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const ChildcategoryModel = mongoose.model("Childcategory", childcategorySchema);

module.exports           = ChildcategoryModel;
