const Slider     = require("../models/Slider");

const sliderRepo = {

  async add(body, filePath) {
    try {
  
      const sliderModel = new Slider({
        slider_title  : body.slider_title,
        slider_desc   : body.slider_desc,
        slider_button : body.slider_button,
        slider_image  : filePath,
      });

      return (document = await sliderModel.save());
    } catch (error) {
      console.log(error);
    }
  },

  async get() {
    try {
      return (slider = await Slider.find());
    } catch (error) {
      console.log(error);
    }
  },

  async edit(id) {
    try {
      return (data = await Slider.find({
        _id: id,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  async update(body, filePath) {
    try {
      // console.log(body);
      // console.log(filePath);

      return (updateData = await Slider.findByIdAndUpdate(
        { _id: body.id },
        {
          slider_title  : body.slider_title,
          slider_desc   : body.slider_desc,
          slider_button : body.slider_button,
          slider_image  : filePath,
        },
        {
          new: true,
        }
      ));
    } catch (error) {
      console.log(error);
    }
  },
  
  async destroy(id) {
    try {
      return await Slider.findByIdAndDelete({ _id: id });
    } catch (error) {
      console.log(error);
    }
  },


};

module.exports = sliderRepo;
