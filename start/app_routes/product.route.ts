/*
|--------------------------------------------------------------------------
| Caregory Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/create-product", "ProductsController.create_product");
  Route.get("/products", "ProductsController.get_product");
  Route.get("/product/:product_id", "ProductsController.get_single_product");
  Route.put("/update-product/:product_id", "ProductsController.update_product");
  Route.delete(
    "/delete-product/:product_id",
    "ProductsController.delete_product"
  );
})
  .middleware("auth")
  .prefix("/api/v1/product");
