const ProductVariant     = require("../models/productVariant");

const productVariantRepo = {
  async add(bodyData) {
    // console.log(bodyData);
    try {
      const productData = new ProductVariant({
        product_id    : bodyData.product_id,
        variant_name  : bodyData.variant_name,
        variant_value : bodyData.variant_value,
        variant_code  : bodyData.variant_code,
      });

      return await productData.save();
    } catch (error) {
      // console.log(error);
      return error;
    }
  },
  async index() {
    try {
      return (data = await ProductVariant.find({
        isEnabled: true,
      }).populate("product_id", "name"));
    } catch (error) {
      return error;
    }
  },
  async edit(id) {
    try {
      return (data = await ProductVariant.find({
        _id: id,
        isEnabled: true,
      }).populate("product_id", "name"));
    } catch (error) {
      console.log(error);
    }
  },
  async update(bodyData) {
    try {
      // console.log(data)

      return (updateData = await ProductVariant.findByIdAndUpdate(
        { _id: bodyData.id },
        {
          product_id    : bodyData.product_id,
          variant_name  : bodyData.variant_name,
          variant_value : bodyData.variant_value,
          variant_code  : bodyData.variant_code,
          isEnabled     : bodyData.status,
        },
        {
          new: true,
        }
      ));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productVariantRepo;
