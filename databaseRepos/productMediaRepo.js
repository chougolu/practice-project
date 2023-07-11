const ProductMedia     = require("../models/ProductMediaModel");

const productMediaRepo = {
  async add(bodyData, filePath) {
    try {
      // console.log(bodyData, filePath);

      const productmedia = new ProductMedia({
        product_id : bodyData.product_id,
        image      : filePath,
        image_desc : bodyData.image_desc,
      });

      return (document = await productmedia.save());
    } catch (error) {
      return error;
    }
  },
  async index() {
    try {
      return (data = await ProductMedia.find({}).populate("product_id", "name"));
    } catch (error) {
      return error;
    }
  },
  async edit(id) {
    try {
      return (data = await ProductMedia.find({
        _id: id,
      }).populate("product_id", "name"));
    } catch (error) {
      return error;
    }
  },
  async update(bodyData, filePath) {
    try {
      return (updateData = await ProductMedia.findByIdAndUpdate(
        { _id: bodyData.id },
        {
          product_id : bodyData.product_id,
          image      : filePath,
          image_desc : bodyData.image_desc,
        },
        {
          new: true,
        }
      ));
    } catch (error) {
      return error;
    }
  },
  async delete(_id) {
 
    // console.log(_id)
    try {
   
      return (deleteData = await ProductMedia.findByIdAndDelete(_id));
      console.log(deleteData);
    } catch (error) {
      return error;
      console.log(error)
    }
  },


};

module.exports = productMediaRepo;
