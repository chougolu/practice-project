const mongoose     = require("mongoose");

const sliderSchema = mongoose.Schema(
  {
    slider_title: {
      type: String,
      required: true,
    },
    slider_desc: {
      type: String,
      required: true,
    },
    slider_button: {
      type: String,
      required: true,
    },
    slider_image: {
      type: String,
      required: true,
    },
  },
  { timestampes: true }
);

const Slider   = mongoose.model("Slider", sliderSchema);

module.exports = Slider;
