/**
 * Handle create product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import ProductSubCategory from "App/Models/ProductSubCategory";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class CreateProductSubCategory {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async create_product_sub_category({}) {
    const { name, status, product_category_id } = this.data;

    try {
      const new_product_sub_category = await ProductSubCategory.create({
        name,
        status,
        product_category_id,
      });

      return CreateOperationResponse({
        results: new_product_sub_category,
        label: `Create Product Sub Category`,
        status: "Success",
        statusCode: 200,
        message: `Product sub category successfully created`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Create Product Sub Category`,
        statusCode: 400,
        message: `Unable to process create product sub category`,
      });
    }
  }
}
