const ProductStock     = require("../models/ProductStockModel");

const productStockRepo = {
  async add(bodyData) {
    // console.log(bodyData);
    try {
      const productData = new ProductStock({
        product_id            : bodyData.product_id,
        product_variant_id    : bodyData.product_variant_id,
        category_id           : bodyData.category_id,
        subcategory_id        : bodyData.subcategory_id,
        childcategory_id      : bodyData.childcategory_id,
        availability          : bodyData.availability,
        quantity              : bodyData.quantity,
      });

      return await productData.save();
    } catch (error) {
      // console.log(error);
      return error;
    }
  },
  async index() {
    try {
      return (data = await ProductStock.find({
        isEnabled: true,
      }));
    } catch (error) {
      return error;
    }
  },
  async edit(id) {
    try {
      return (data = await ProductStock.find({
        _id: id,
        isEnabled: true,
      }));
    } catch (error) {
      console.log(error);
    }
  },
  async update(bodyData) {
    try {
      // console.log(data)

      return (updateData = await ProductStock.findByIdAndUpdate(
        { _id: bodyData.id },
        {
          product_id         : bodyData.product_id,
          product_variant_id : bodyData.product_variant_id,
          category_id        : bodyData.category_id,
          subcategory_id     : bodyData.subcategory_id,
          childcategory_id   : bodyData.childcategory_id,
          availability       : bodyData.availability,
          quantity           : bodyData.quantity,
          isEnabled          : bodyData.status,
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
module.exports = productStockRepo;
