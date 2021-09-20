/**
 * Handle create product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import ProductSubCategory from "App/Models/ProductSubCategory";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class GetProductSubCategory {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async get_product_sub_category({}) {
    try {
      const product_sub_categories = await ProductSubCategory.all();

      return CreateOperationResponse({
        results: product_sub_categories,
        label: `Get Product Sub Category`,
        status: "Success",
        statusCode: 200,
        message: `Product sub category successfully fetched`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Get Product Sub Category`,
        statusCode: 400,
        message: `Unable to process fetch product sub category`,
      });
    }
  }
  async get_single_product_sub_category({ sub_category_id }) {
    try {
      const product_sub_category = await ProductSubCategory.findBy(
        "id",
        sub_category_id
      );

      return CreateOperationResponse({
        results: product_sub_category,
        label: `Get Product Sub Category`,
        status: "Success",
        statusCode: 200,
        message: `Product sub category successfully fetched`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Get Product Sub Category`,
        statusCode: 400,
        message: `Unable to process fetch product sub category`,
      });
    }
  }
}
