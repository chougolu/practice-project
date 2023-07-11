const multer             = require("multer");
const path               = require("path");
const ChildcategoryModel = require("../models/ChildcategoryModel");
const Joi                = require("joi");
const fs                 = require("fs");
const childcategoryRepo  = require("../databaseRepos/childcategoryRepo");

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

const childcategoryController = {
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

      childcategorySchema = Joi.object({
        category_id: Joi.string().required(),
        subcategory_id: Joi.string().required(),
        name: Joi.string().required(),
        desc: Joi.string().required(),
        // image: Joi.string().required()
      });

      const { error } = childcategorySchema.validate(req.body);

      if (error) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          res.status(500).json({ error: err });
        });

        // rootfolder/uploads/filename.png
        return res.status(400).json({ error: error.details[0].message });
      }

      const childcategoryData = await childcategoryRepo.addchildCategory(
        req.body,
        filePath
      );

      if (childcategoryData) {
        
        res.status(201).json({
          message: "childcategory created successfully",
          childcategoryData,
        });
      } else {
        res.status(400).json({ msg: "Something went wrong", success: false });
      }
    });
  },
  async index(req, res) {
    const childcategoryData = await childcategoryRepo.getchildCategory();

    if (childcategoryData.length <= 0) {
      res
        .status(404)
        .json({ msg: " Data Not Found ", success: false, status: 404 });
    } else {
      res
        .status(200)
        .json({ data: childcategoryData, success: true, status: 200 });
    }
  },
  // ------------------------------------------------------/

  async edit(req, res) {
    const id = req.params.id;

    const childcategoryData = await childcategoryRepo.editchildCategory(id);
    // console.log(categoryData.length)
    if (childcategoryData.length <= 0) {
      res
        .status(404)
        .json({ msg: " Data Not Found ", success: false, status: 404 });
    } else {
      res
        .status(200)
        .json({ data: childcategoryData, success: true, status: 200 });
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

      childcategorySchema = Joi.object({
        id: Joi.string().required(),
        category_id: Joi.string(),
        subcategory_id: Joi.string(),
        name: Joi.string().required(),
        desc: Joi.string().required(),
        status: Joi.boolean(),
        // image: Joi.string().required()
      });

      const { error } = childcategorySchema.validate(req.body);

      if (error) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          res.status(500).json({ error: err });
        });
        // rootfolder/uploads/filename.png
        return res.status(400).json({ error: error.details[0].message });
      }

    
      
        //   res.json(updateData);

        const updateData = await childcategoryRepo.updatechildCategory(req.body,filePath)

        if (updateData !== null) {
          res
            .status(200)
            .json({ msg: "childcategory updated Succesfully", success: true });
        } else {
          res.status(404).json({ msg: "No Data Found", success: false });
        }
     
    });
  },
};
module.exports = childcategoryController;
