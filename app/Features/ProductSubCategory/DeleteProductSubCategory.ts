/**
 * Handle delete product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import ProductSubCategory from "App/Models/ProductSubCategory";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class DeleteProductSubCategory {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async delete_product_sub_category({ sub_category_id }) {
    try {
      const product_sub_category = await ProductSubCategory.findBy(
        "id",
        sub_category_id
      );

      if (!product_sub_category) {
        return CreateOperationResponse({
          results: null,
          label: `Product sub category does not exist`,
          statusCode: 400,
          message: `Product sub category does not exist`,
        });
      }

      await product_sub_category!.delete();

      return CreateOperationResponse({
        results: {},
        label: `Delete Product Sub Category`,
        status: "Success",
        statusCode: 200,
        message: `Product sub category successfully deleted`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Delete Product Sub Category`,
        statusCode: 400,
        message: `Unable to process delete product sub category`,
      });
    }
  }
}
