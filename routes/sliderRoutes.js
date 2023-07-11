const express          = require("express");
const sliderController = require("../controllers/sliderController");

const sliderRouter     = express.Router();


sliderRouter.get("/api/slider",(       sliderController.index));
sliderRouter.post("/api/slider",(      sliderController.store));
sliderRouter.get("/api/slider/:id",(   sliderController.edit));
sliderRouter.patch("/api/slider",(     sliderController.update));
sliderRouter.delete("/api/slider/:id",(sliderController.destroy));


module.exports = sliderRouter;