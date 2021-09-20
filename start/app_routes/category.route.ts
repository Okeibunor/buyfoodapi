/*
|--------------------------------------------------------------------------
| Caregory Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post(
    "/create-product-category",
    "Category/ProductcategoriesController.create_product_category"
  );
  Route.get(
    "/product-category",
    "Category/ProductcategoriesController.get_product_category"
  );
  Route.get(
    "/product-category/:category_id",
    "Category/ProductcategoriesController.get_single_product_category"
  );
  Route.put(
    "/update-product-category/:category_id",
    "Category/ProductcategoriesController.update_product_category"
  );
  Route.delete(
    "/delete-product-category/:category_id",
    "Category/ProductcategoriesController.delete_product_category"
  );
  Route.post(
    "/create-product-sub-category",
    "Category/ProductsubcategoriesController.create_product_sub_category"
  );
  Route.get(
    "/product-sub-category",
    "Category/ProductsubcategoriesController.get_product_sub_category"
  );
  Route.get(
    "/product-sub-category/:sub_category_id",
    "Category/ProductsubcategoriesController.get_single_product_sub_category"
  );
  Route.put(
    "/update-product-sub-category/:sub_category_id",
    "Category/ProductsubcategoriesController.update_product_sub_category"
  );
  Route.delete(
    "/delete-product-sub-category/:sub_category_id",
    "Category/ProductsubcategoriesController.delete_product_sub_category"
  );
})
  .middleware("auth")
  .prefix("/api/v1/category");
