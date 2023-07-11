const express               = require("express");
const subcategoryController = require("../controllers/subcategoryController");
const subcategoryRouter     = express.Router();

subcategoryRouter.post("/api/subcategory",    subcategoryController.store);
subcategoryRouter.get("/api/subcategory",     subcategoryController.index);
subcategoryRouter.get("/api/subcategory/:id", subcategoryController.edit);
subcategoryRouter.patch("/api/subcategory/",  subcategoryController.update);

module.exports = subcategoryRouter;