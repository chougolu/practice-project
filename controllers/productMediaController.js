const productMediaRepo = require("../databaseRepos/productMediaRepo");
const multer           = require("multer");
const path             = require("path");
const Joi              = require("joi");
const fs               = require("fs");

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

const productMediaController = {
  async add(req, res) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        res.status(500).json({
          msg: "Internal Server Error",
          success: false,
          status: 500,
          error: err,
        });
      }

      productmediaSchema = Joi.object({
        product_id: Joi.string().required(),
        image_desc: Joi.string().required(),
      });

      const { error } = productmediaSchema.validate(req.body);

      if (error) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          res.status(500).json({
            msg: "Internal Server Error",
            success: false,
            status: 500,
            error: err,
          });
        });
        // rootfolder/uploads/filename.png
        return res.status(400).json({ error: error.details[0].message });
      }
      const filePath = req.file.path;

      const document = await productMediaRepo.add(req.body, filePath);

      if (document) {
        res
          .status(201)
          .json({ message: "product media created successfully", document });
      } else {
        res.status(400).json({ msg: "Something went wrong", success: false });
      }
    });
  },
  async index(req, res) {
    const data = await productMediaRepo.index();

    if (data.length <= 0) {
      res.status(404).json({ msg: "No Data found", success: true });
    } else {
      res.status(200).json({ data: data, success: true, status: 200 });
    }
  },

  async edit(req, res) {
    const id = req.params.id;
    const data = await productMediaRepo.edit(id);
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
    handleMultipartData(req, res, async (err) => {
      if (err) {
        res.status(500).json({
          msg: "Internal Server Error",
          success: false,
          status: 500,
          error: err,
        });
      }

      const filePath = req.file.path;

      productSchema = Joi.object({
        id: Joi.string().required(),
        product_id: Joi.string().required(),
        image_desc: Joi.string().required(),
      });

      const { error } = productSchema.validate(req.body);

      if (error) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          res.status(500).json({
            msg: "Internal Server Error",
            success: false,
            status: 500,
            error: err,
          });
        });
        // rootfolder/uploads/filename.png
        return res.status(400).json({ error: error.details[0].message });
      }

      const updateData = await productMediaRepo.update(req.body, filePath);
      //   res.json(updateData);

      if (updateData !== null) {
        res.status(200).json({
          msg: "product media updated Succesfully",
          success: true,
          updateData,
        });
      } else {
        res.status(404).json({ msg: "No Data Found", success: false });
      }
    });
  },

  async delete(req, res) {
  const deleteData = await productMediaRepo.delete(req.params.id);

    if (deleteData === null) {
      res.status(404).json({ msg: "No Data Found", success: false });
    } else {
      res
        .status(202)
        .json({ msg: "Product-Media Deleted Succesfully", success: true });
    }
  },
};

module.exports = productMediaController;
