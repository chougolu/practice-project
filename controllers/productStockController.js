const productStockRepo = require("../databaseRepos/productStockRepo");
const productStockController = {
  async add(req, res) {
    const document = await productStockRepo.add(req.body);

    if (document) {
      res
        .status(201)
        .json({ message: "Product Stock created successfully", document });
    } else {
      res.status(400).json({ msg: "Something went wrong", success: false });
    }
  },
  async index(req, res) {
    const data = await productStockRepo.index();

    if (data.length <= 0) {
      res.status(404).json({ msg: "No Data found", success: true });
    } else {
      res.status(200).json({ data: data, success: true, status: 200 });
    }
  },

  async edit(req, res) {
    const id = req.params.id;
    const data = await productStockRepo.edit(id);
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
    const updateData = await productStockRepo.update(req.body);
    //   res.json(updateData);

    if (updateData !== null) {
      res.status(200).json({
        msg: "Product Stock updated Succesfully",
        success: true,
        updateData,
      });
    } else {
      res.status(404).json({ msg: "No Data Found", success: false });
    }
  },
};

module.exports = productStockController;
