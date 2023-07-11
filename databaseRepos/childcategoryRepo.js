const ChildcategoryModel = require("../models/ChildcategoryModel");

const childcategoryRepo  = {
  async addchildCategory(childcategoryData, filePath) {
    try {
      //   console.log(categoryData, filePath);

      const childcategory = new ChildcategoryModel({
        category_id     : childcategoryData.category_id,
        subcategory_id  : childcategoryData.subcategory_id,
        name            : childcategoryData.name,
        desc            : childcategoryData.desc,
        image           : filePath,
      });

      return (childcategoryData = await childcategory.save());
    } catch (error) {
      console.log(error);
    }
  },

  async getchildCategory() {
    try {
      return (childcategoryData = await ChildcategoryModel.find({
        isEnabled: true,
      }).populate([
        {
          path   : "category_id",
          model  : "Category",
          select : "name",
        },
        {
          path   : "subcategory_id",
          model  : "Subcategory",
          select : "name",
        },
      ]));
    } catch (error) {
      console.log(error);
    }
  },

  async editchildCategory(id) {
    try {
      return (subcategoryData = await ChildcategoryModel.find({
        _id       : id,
        isEnabled : true,
      }).populate("category_id", "name"));
    } catch (error) {
      console.log(error);
    }
  },
  async updatechildCategory(data, filePath) {
    try {
      //   console.log(data);
      //   console.log(filePath);

      return (updateData = await ChildcategoryModel.findByIdAndUpdate(
        { _id: data.id },
        {
          category_id     : data.category_id,
          subcategory_id  : data.subcategory_id,
          name            : data.name,
          desc            : data.desc,
          image           : filePath,
          isEnabled       : data.status,
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

module.exports = childcategoryRepo;
