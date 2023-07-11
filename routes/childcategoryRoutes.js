const express                 = require("express");
const childcategoryController = require("../controllers/childcategoryController");
const childcategoryRouter     = express.Router();

childcategoryRouter.post("/api/childcategory",    childcategoryController.store);
childcategoryRouter.get("/api/childcategory",     childcategoryController.index);
childcategoryRouter.get("/api/childcategory/:id", childcategoryController.edit);
childcategoryRouter.patch("/api/childcategory/",  childcategoryController.update);

module.exports = childcategoryRouter;
