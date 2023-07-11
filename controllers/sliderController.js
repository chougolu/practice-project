const multer       = require("multer");
const path         = require("path");
const Slider       = require("../models/Slider");
const sliderRepo   = require("../databaseRepos/sliderRepo");
const Joi          = require("joi");
const fs           = require("fs")
const storage      = multer.diskStorage({
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

const sliderController = {
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

      sliderSchema = Joi.object({
        slider_title: Joi.string().required(),
        slider_desc: Joi.string().required(),
        slider_button: Joi.string().required(),
      });

      const { error } = sliderSchema.validate(req.body);

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

      const slider   = await sliderRepo.add(req.body, filePath);

      if (slider) {
        res
          .status(201)
          .json({ message: "slider created successfully", slider });
      } else {
        res.status(400).json({ msg: "Something went wrong", success: false });
      }
    });
  },

  async index(req, res) {
    const data = await sliderRepo.get();

    if (data) {
      res.status(200).json({ data: data, success: true, status: 200 });
    } else {
      res.status(404).json({ msg: "No Data found", success: true });
    }
  },

  async edit(req, res) {
    const id = req.params.id;
    const data = await sliderRepo.edit(id);

    if (data.length <= 0) {
      res
        .status(404)
        .json({ msg: " Data Not Found ", success: false, status: 404 });
    } else {
      res.status(200).json({ data: data, success: true, status: 200 });
    }
  },

  async update(req,res) {
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

      sliderSchema = Joi.object({
        id: Joi.string().required(),
        slider_title: Joi.string().required(),
        slider_desc: Joi.string().required(),
        slider_button: Joi.string().required(),
      });

      const { error } = sliderSchema.validate(req.body);

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

      const updateData = await sliderRepo.update(req.body, filePath);
      //   res.json(updateData);

      if (updateData !== null) {
        res.status(200).json({
          msg: "Slider updated Succesfully",
          success: true,
          updateData,
        });
      } else {
        res.status(404).json({ msg: "No Data Found", success: false });
      }
    });
  },


  async destroy(req,res){
    const id = req.params.id;
   //  console.log(id)
    const deletedDoc = await sliderRepo.destroy(id);

    if (deletedDoc === null) {
     res.status(404).json({ msg: "No Data Found", success: false });
   } else {
     res
       .status(202)
       .json({ msg: "Data Deleted Succesfully", success: true });
   }

 }
};

module.exports = sliderController;
