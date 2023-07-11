const express            = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter     = new express.Router();

categoryRouter.post("/api/category",    categoryController.store);
categoryRouter.get("/api/category",     categoryController.index);
categoryRouter.get("/api/category/:id", categoryController.edit);
categoryRouter.patch("/api/category/",  categoryController.update);

module.exports = categoryRouter;
