// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateProductSubCategory from "App/Features/ProductSubCategory/CreateProductSubCategory";
import DeleteProductSubCategory from "App/Features/ProductSubCategory/DeleteProductSubCategory";
import GetProductSubCategory from "App/Features/ProductSubCategory/GetProductSubCategory";
import UpdateProductSubCategory from "App/Features/ProductSubCategory/UpdateProductSubCategory";
import CreateSubCategoryValidator from "App/Validators/CreateSubCategoryValidator";

export default class ProductSubCategoriesController {
  public async create_product_sub_category({ request, response }) {
    const get_sub_category_data = await request.validate(
      CreateSubCategoryValidator
    );
    let createProductSubCategoryResponse = await new CreateProductSubCategory({
      ...get_sub_category_data,
    }).create_product_sub_category({});

    return response
      .status(createProductSubCategoryResponse.status_code)
      .send(createProductSubCategoryResponse);
  }
  public async get_product_sub_category({ response }) {
    let getProductSubCategoryResponse = await new GetProductSubCategory(
      {}
    ).get_product_sub_category({});

    return response
      .status(getProductSubCategoryResponse.status_code)
      .send(getProductSubCategoryResponse);
  }
  public async get_single_product_sub_category({
    params: { sub_category_id },
    response,
  }) {
    let getSingleProductSubCategoryResponse = await new GetProductSubCategory(
      {}
    ).get_single_product_sub_category({ sub_category_id });

    return response
      .status(getSingleProductSubCategoryResponse.status_code)
      .send(getSingleProductSubCategoryResponse);
  }
  public async update_product_sub_category({
    params: { sub_category_id },
    request,
    response,
  }) {
    let updateProductSubCategoryResponse = await new UpdateProductSubCategory({
      ...request.post(),
    }).update_product_sub_category({ sub_category_id });

    return response
      .status(updateProductSubCategoryResponse.status_code)
      .send(updateProductSubCategoryResponse);
  }
  public async delete_product_sub_category({
    params: { sub_category_id },
    response,
  }) {
    let deleteProductSubCategoryResponse = await new DeleteProductSubCategory(
      {}
    ).delete_product_sub_category({ sub_category_id });

    return response
      .status(deleteProductSubCategoryResponse.status_code)
      .send(deleteProductSubCategoryResponse);
  }
}
