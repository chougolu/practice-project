const productVariantRepo = require("../databaseRepos/productVariantRepo");

const productVariantController = {
  async add(req, res) {
    const document = await productVariantRepo.add(req.body);

    if (document) {
      res
        .status(201)
        .json({ message: "Product Variant created successfully", document });
    } else {
      res.status(400).json({ msg: "Something went wrong", success: false });
    }
  },
  async index(req, res) {
    const data = await productVariantRepo.index();

    if (data.length <= 0) {
      res.status(404).json({ msg: "No Data found", success: true });
    } else {
      res.status(200).json({ data: data, success: true, status: 200 });
    }
  },

  async edit(req, res) {
    const id = req.params.id;
    const data = await productVariantRepo.edit(id);
    // console.log(categoryData.length)
    if (data.length <= 0) {
      res
        .status(404)
        .json({ msg: " Data Not Found ", success: false, status: 404 });
    } else {
      res.status(200).json({ data: data, success: true, status: 200 });
    }
  },
  async update(req, res) {
    const updateData = await productVariantRepo.update(req.body);
    //   res.json(updateData);

    if (updateData !== null) {
      res.status(200).json({
        msg: "Product Variant updated Succesfully",
        success: true,
        updateData,
      });
    } else {
      res.status(404).json({ msg: "No Data Found", success: false });
    }
  },
};

module.exports = productVariantController;
