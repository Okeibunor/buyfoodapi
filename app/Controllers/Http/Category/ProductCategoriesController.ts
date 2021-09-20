// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateProductCategory from "App/Features/ProductCategory/CreateProductCategory";
import DeleteProductCategory from "App/Features/ProductCategory/DeleteProductCategory";
import GetProductCategory from "App/Features/ProductCategory/GetProductCategory";
import UpdateProductCategory from "App/Features/ProductCategory/UpdateProductCategory";
import CreateCategoryValidator from "App/Validators/CreateCategoryValidator";

export default class ProductCategoriesController {
  public async create_product_category({ request, response }) {
    const get_category_data = await request.validate(CreateCategoryValidator);
    let createProductCategoryResponse = await new CreateProductCategory({
      ...get_category_data,
    }).create_product_category({});

    return response
      .status(createProductCategoryResponse.status_code)
      .send(createProductCategoryResponse);
  }
  public async get_product_category({ response }) {
    let getProductCategoryResponse = await new GetProductCategory(
      {}
    ).get_product_category({});

    return response
      .status(getProductCategoryResponse.status_code)
      .send(getProductCategoryResponse);
  }
  public async get_single_product_category({
    params: { category_id },
    response,
  }) {
    let getSingleProductCategoryResponse = await new GetProductCategory(
      {}
    ).get_single_product_category({ category_id });

    return response
      .status(getSingleProductCategoryResponse.status_code)
      .send(getSingleProductCategoryResponse);
  }
  public async update_product_category({
    params: { category_id },
    request,
    response,
  }) {
    let updateProductCategoryResponse = await new UpdateProductCategory({
      ...request.post(),
    }).update_product_category({ category_id });

    return response
      .status(updateProductCategoryResponse.status_code)
      .send(updateProductCategoryResponse);
  }
  public async delete_product_category({ params: { category_id }, response }) {
    let deleteProductCategoryResponse = await new DeleteProductCategory(
      {}
    ).delete_product_category({ category_id });

    return response
      .status(deleteProductCategoryResponse.status_code)
      .send(deleteProductCategoryResponse);
  }
}
