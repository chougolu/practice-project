const multer      = require("multer");
const path        = require("path");
const Joi         = require("joi");
const fs          = require("fs");
const ProductRepo = require("../databaseRepos/productRepo");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image"); //5 MB

// -------------------------------------------------------------------

const productController = {
  async add(req, res) {
    handleMultipartData(req, res, async (err) => {
      const filePath = req.file.path;

      if (err) {
        res.status(500).json({
          msg: "Internal Server Error",
          success: false,
          status: 500,
          error: err,
        });

        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          res.status(500).json({
            msg: "Internal Server Error",
            success: false,
            status: 500,
            error: err,
          });
        });
      }

      // console.log(req.body);
      const document = await ProductRepo.add(req.body, filePath);
      if (document) {
        res
          .status(201)
          .json({ message: "product created successfully", document });
      } else {
        res.status(400).json({ msg: "Something went wrong", success: false });
      }
    });
  },
  async index(req, res) {
    const getData = await ProductRepo.index();
    if (getData) {
      res.status(200).json(getData);
    } else {
      res.status(404).json({ msg: "No Data Found", success: false });
    }
  },

  async edit(req, res) {
    const getData = await ProductRepo.edit(req.params.id);
    if (getData) {
      res.status(200).json(getData);
    } else {
      res.status(404).json({ msg: "No Data Found", success: false });
    }
  },

  async update(req, res) {
    handleMultipartData(req, res, async (err) => {
      const filePath = req.file.path;

      if (err) {
        res.status(500).json({
          msg: "Internal Server Error",
          success: false,
          status: 500,
          error: err,
        });

        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          res.status(500).json({
            msg: "Internal Server Error",
            success: false,
            status: 500,
            error: err,
          });
        });
      }

      // console.log(req.body);
      const document = await ProductRepo.update(req.body, filePath);
      if (document) {
        res
          .status(201)
          .json({ message: "product updated successfully", document });
      } else {
        res.status(400).json({ msg: "Something went wrong", success: false });
      }
    });
  },
  async delete(req, res) {
    const deleteData = await ProductRepo.delete(req.params.id);

    if (deleteData === null) {
      res.status(404).json({ msg: "No Data Found", success: false });
    } else {
      res
        .status(202)
        .json({ msg: "Product Deleted Succesfully", success: true });
    }
  },
};

module.exports = productController;
