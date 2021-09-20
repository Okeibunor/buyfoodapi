/**
 * Handle create product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import ProductCategory from "App/Models/ProductCategory";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class CreateProductCategory {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async create_product_category({}) {
    const { name, status } = this.data;

    try {
      const new_user = await ProductCategory.create({
        name,
        status,
      });

      return CreateOperationResponse({
        results: new_user,
        label: `Create Product Category`,
        status: "Success",
        statusCode: 200,
        message: `Product category successfully created`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Create Product Category`,
        statusCode: 400,
        message: `Unable to process create product category`,
      });
    }
  }
}
