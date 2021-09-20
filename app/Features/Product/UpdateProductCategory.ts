/**
 * Handle update product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import Product from "App/Models/Product";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class UpdateProduct {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async update_product({ product_id }) {
    const { title, description, price } = this.data;

    try {
      const product = await Product.findBy("id", product_id);

      if (!product) {
        return CreateOperationResponse({
          results: null,
          label: `Product category does not exist`,
          statusCode: 400,
          message: `Product category does not exist`,
        });
      }

      product!.title = title;
      product!.description = description;
      product!.price = price;

      const new_user = await product!.save();

      return CreateOperationResponse({
        results: new_user,
        label: `Update Product`,
        status: "Success",
        statusCode: 200,
        message: `Product successfully updated`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Update Product`,
        statusCode: 400,
        message: `Unable to process update product`,
      });
    }
  }
}
