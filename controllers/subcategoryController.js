const multer          = require("multer");
const path            = require("path");
const subcategoryRepo = require("../databaseRepos/subcategoryRepo");
const Joi             = require("joi");
const fs              = require("fs");

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

const subcategoryController = {
  async store(req, res) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        res.status(500).json({
          msg: "Internal Server Error",
          success: false,
          status: 500,
          error: err,
        });
        // console.log(error);
      }

      const filePath = req.file.path;

      // Validation

      categorySchema = Joi.object({
        category_id: Joi.string().required(),
        name: Joi.string().min(3).max(30).required(),
        desc: Joi.string().required(),
        // image: Joi.string().required()
      });

      const { error } = categorySchema.validate(req.body);

      if (error) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          res.status(500).json({ error: err });
        });

        // rootfolder/uploads/filename.png
        return res.status(400).json({ error: error.details[0].message });
      }

      const data = req.body;
      const subcategoryData = await subcategoryRepo.addsubCategory(
        data,
        filePath
      );
      if (subcategoryData) {
        res.status(201).json({
          message: "subcategory created successfully",
          subcategoryData,
        });
      } else {
        res.status(400).json({ msg: "Something went wrong", success: false });
      }
    });
  },
  async index(req, res) {
    var subcategoryData = await subcategoryRepo.getsubCategory();
    if (subcategoryData.length <= 0) {
      res
        .status(404)
        .json({ msg: " Data Not Found ", success: false, status: 404 });
    } else {
      res
        .status(200)
        .json({ data: subcategoryData, success: true, status: 200 });
    }

    // console.log(catdata)
  },
  // ------------------------------------------------------/

  async edit(req, res) {
    const id = req.params.id;
    const subcategoryData = await subcategoryRepo.editsubCategory(id);
    // console.log(categoryData.length)
    if (subcategoryData.length <= 0) {
      res
        .status(404)
        .json({ msg: " Data Not Found ", success: false, status: 404 });
    } else {
      res
        .status(200)
        .json({ data: subcategoryData, success: true, status: 200 });
    }
  },

  async update(req, res) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        res.json(err);
      }
      // console.log(req.file);
      const filePath = req.file.path;
      // console.log(req.body);
      // Validation

      categorySchema = Joi.object({
        id: Joi.string().required(),
        category_id: Joi.string(),
        name: Joi.string().required(),
        desc: Joi.string().required(),
        status: Joi.boolean(),
        // image: Joi.string().required()
      });

      const { error } = categorySchema.validate(req.body);

      if (error) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          res.status(500).json({ error: err });
        });
        // rootfolder/uploads/filename.png
        return res.status(400).json({ error: error.details[0].message });
      }

      const updateData = await subcategoryRepo.updatesubCategory(
        req.body,
        filePath
      );
      //   res.json(updateData);

      if (updateData !== null) {
        res
          .status(200)
          .json({ msg: "subcategory updated Succesfully", success: true });
      } else {
        res.status(404).json({ msg: "No Data Found", success: false });
      }
    });
  },
};
module.exports = subcategoryController;
