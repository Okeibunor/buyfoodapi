/**
 * Handle create product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import ProductCategory from "App/Models/ProductCategory";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class GetProductCategory {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async get_product_category({}) {
    try {
      const product_categories = await ProductCategory.all();

      return CreateOperationResponse({
        results: product_categories,
        label: `Get Product Category`,
        status: "Success",
        statusCode: 200,
        message: `Product category successfully fetched`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Get Product Category`,
        statusCode: 400,
        message: `Unable to process fetch product category`,
      });
    }
  }
  async get_single_product_category({ category_id }) {
    try {
      const product_category = await ProductCategory.findBy("id", category_id);

      return CreateOperationResponse({
        results: product_category,
        label: `Get Product Category`,
        status: "Success",
        statusCode: 200,
        message: `Product category successfully fetched`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Get Product Category`,
        statusCode: 400,
        message: `Unable to process fetch product category`,
      });
    }
  }
}
