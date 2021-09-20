/**
 * Handle update product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import ProductSubCategory from "App/Models/ProductSubCategory";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class UpdateProductSubCategory {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async update_product_sub_category({ sub_category_id }) {
    const { name, status } = this.data;

    try {
      const product_sub_category = await ProductSubCategory.findBy(
        "id",
        sub_category_id
      );

      if (!product_sub_category) {
        return CreateOperationResponse({
          results: null,
          label: `Product category sub does not exist`,
          statusCode: 400,
          message: `Product category sub does not exist`,
        });
      }

      product_sub_category!.name = name;
      product_sub_category!.status = status;

      const upd_product_sub_category = await product_sub_category!.save();

      return CreateOperationResponse({
        results: upd_product_sub_category,
        label: `Update Product Sub Category`,
        status: "Success",
        statusCode: 200,
        message: `Product sub category successfully updated`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Update Product Sub Category`,
        statusCode: 400,
        message: `Unable to process update product sub category`,
      });
    }
  }
}
