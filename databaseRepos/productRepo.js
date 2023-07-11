const ProductModel = require("../models/ProductModel");

const ProductRepo  = {
  async add(bodyData, filePath) {
    try {
      // console.log(bodyData);
      // -----

      const productData = new ProductModel({
        name            : bodyData.name,
        desc            : bodyData.desc,
        image           : filePath,
        price           : bodyData.price,
        SKU             : bodyData.SKU,
        category_id     : bodyData.category_id,
        subcategory_id  : bodyData.subcategory_id,
        childcategory_id: bodyData.childcategory_id,
      });

      return (document = await productData.save());
    } catch (error) {
      return error;

      // console.log(error)
    }
  },
  async index() {
    try {
      return (getData = await ProductModel.find().populate(
        "category_id",
        "name"
      ));
    } catch (error) {
      return error;
    }
  },

  async edit(_id) {
    try {
      return (getData = await ProductModel.findById(_id).populate(
        "category_id",
        "name"
      ));
    } catch (error) {
      return error;
    }
  },
  async update(bodyData, filePath) {
    try {
      // checking the existance of product

      // -----

      // console.log(bodyData);
      const _id = bodyData.id;
      // console.log(_id);
      const updateData = await ProductModel.findByIdAndUpdate(
        _id,
        {
          name              : bodyData.name,
          desc              : bodyData.desc,
          image             : filePath,
          price             : bodyData.price,
          SKU               : bodyData.SKU,
          category_id       : bodyData.category_id,
          subcategory_id    : bodyData.subcategory_id,
          childcategory_id  : bodyData.childcategory_id,
        },
        {
          new: true,
        }
      );
      //   res.json(updateData);

      return updateData;
    } catch (error) {
      return error;
    }
  },
  async delete(_id) {
 
    try {
   
      return (deleteData = await ProductModel.findByIdAndDelete(_id));
      // console.log(deleteData);
    } catch (error) {
      return error;
    }
  },
};

module.exports = ProductRepo;
