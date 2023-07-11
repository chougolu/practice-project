const express                  = require("express");
const productController        = require("../controllers/productController");
const productVariantController = require("../controllers/productVariantController");
const productMediaController   = require("../controllers/productMediaController");
const productStockController   = require("../controllers/productStockController");
const productRouter            = express.Router();

// -----------------------------  Product Routes----------------------------------//

productRouter.post("/api/products",           productController.add);
productRouter.get("/api/products/",           productController.index);
productRouter.get("/api/products/:id",        productController.edit);
productRouter.patch("/api/products/",         productController.update);
productRouter.delete("/api/products/:id",     productController.delete);

// -----------------------------Product Variants Routes----------------------------------//

productRouter.post("/api/product-variants",    productVariantController.add);
productRouter.get("/api/product-variants/",    productVariantController.index);
productRouter.get("/api/product-variants/:id", productVariantController.edit);
productRouter.patch("/api/product-variants/",  productVariantController.update);

// -----------------------------Product Media Routes----------------------------------//

productRouter.post("/api/product-media",       productMediaController.add);
productRouter.get("/api/product-media/",       productMediaController.index);
productRouter.get("/api/product-media/:id",    productMediaController.edit);
productRouter.patch("/api/product-media/",     productMediaController.update);
productRouter.delete("/api/product-media/:id", productMediaController.delete);

// -----------------------------Product Stock Routes----------------------------------//

productRouter.post("/api/product-stock",       productStockController.add);
productRouter.get("/api/product-stock/",       productStockController.index);
productRouter.get("/api/product-stock/:id",    productStockController.edit);
productRouter.patch("/api/product-stock/",     productStockController.update);

module.exports = productRouter;
