const multer       = require("multer");
const path         = require("path");
const Joi          = require("joi");
const fs           = require("fs");
const categoryRepo = require("../databaseRepos/categoryRepo");

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

const categoryController = {
  // saving category

  async store(req, res) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        res.status(500).json({
          msg: "Internal Server Error",
          success: false,
          status: 500,
          error: err,
        });
      }

      categorySchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        desc: Joi.string().required(),
      });

      const { error } = categorySchema.validate(req.body);

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

      const categories = await categoryRepo.addCategory(req.body, filePath);

      if (categories) {
        res
          .status(201)
          .json({ message: "category created successfully", categories });
      } else {
        res.status(400).json({ msg: "Something went wrong", success: false });
      }
    });
  },

  async index(req, res) {
    const data = await categoryRepo.getCategory();

    if (data.length <= 0) {
      res.status(404).json({ msg: "No Data found", success: true });
    } else {
      res.status(200).json({ data: data, success: true, status: 200 });
    }
  },

  async edit(req, res) {
    const id = req.params.id;
    const categoryData = await categoryRepo.editCategory(id);
    // console.log(categoryData.length)
    if (categoryData.length <= 0) {
      res
        .status(404)
        .json({ msg: " Data Not Found ", success: false, status: 404 });
    } else {
      res.status(200).json({ data: categoryData, success: true, status: 200 });
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

      categorySchema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(3).max(30).required(),
        desc: Joi.string().required(),
        status: Joi.boolean(),
      });

      const { error } = categorySchema.validate(req.body);

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

      const updateData = await categoryRepo.updateCategory(req.body, filePath);
      //   res.json(updateData);

      if (updateData !== null) {
        res.status(200).json({
          msg: "Category updated Succesfully",
          success: true,
          updateData,
        });
      } else {
        res.status(404).json({ msg: "No Data Found", success: false });
      }
    });
  },
};

module.exports = categoryController;
