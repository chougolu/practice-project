const express                   = require('express')
const app                       = express()
require("./config/config")
const port                      = process.env.PORT
const sliderRouter              = require("./routes/sliderRoutes");
const categoryRouter            = require('./routes/categoryRoutes');
const path                      = require("path");
const subcategoryRouter         = require('./routes/subcategoryRoutes');
const childcategoryRouter       = require('./routes/childcategoryRoutes');
const productRouter             = require('./routes/productRoutes');


global.appRoot = path.resolve(__dirname);

app.use(express.urlencoded({extended:false}));
app.use(express.json());


// Routers 
app.use(sliderRouter);
app.use(categoryRouter);
app.use(subcategoryRouter);
app.use(childcategoryRouter);
app.use(productRouter);




// server 
app.listen(port,"192.168.29.80", () => {
  console.log(`app listening on port ${port}`)
})