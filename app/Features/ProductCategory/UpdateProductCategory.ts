/**
 * Handle update product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import ProductCategory from "App/Models/ProductCategory";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class UpdateProductCategory {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async update_product_category({ category_id }) {
    const { name, status } = this.data;

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

      product_category!.name = name;
      product_category!.status = status;

      const new_user = await product_category!.save();

      return CreateOperationResponse({
        results: new_user,
        label: `Update Product Category`,
        status: "Success",
        statusCode: 200,
        message: `Product category successfully updated`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Update Product Category`,
        statusCode: 400,
        message: `Unable to process update product category`,
      });
    }
  }
}
