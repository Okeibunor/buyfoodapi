/**
 * Handle delete product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import ProductCategory from "App/Models/ProductCategory";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class DeleteProductCategory {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async delete_product_category({ category_id }) {
    try {
      const product_category = await ProductCategory.findBy("id", category_id);

      if (!product_category) {
        return CreateOperationResponse({
          results: null,
          label: `Product category does not exist`,
          statusCode: 400,
          message: `Product category does not exist`,
        });
      }

      await product_category!.delete();

      return CreateOperationResponse({
        results: {},
        label: `Delete Product Category`,
        status: "Success",
        statusCode: 200,
        message: `Product category successfully deleted`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Delete Product Category`,
        statusCode: 400,
        message: `Unable to process delete product category`,
      });
    }
  }
}
