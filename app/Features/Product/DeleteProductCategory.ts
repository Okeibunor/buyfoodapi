/**
 * Handle delete product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import Product from "App/Models/Product";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class DeleteProduct {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async delete_product({ product_id }) {
    try {
      const product = await Product.findBy("id", product_id);

      if (!product) {
        return CreateOperationResponse({
          results: null,
          label: `Product does not exist`,
          statusCode: 400,
          message: `Product does not exist`,
        });
      }

      await product!.delete();

      return CreateOperationResponse({
        results: {},
        label: `Delete Product`,
        status: "Success",
        statusCode: 200,
        message: `Product successfully deleted`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Delete Product`,
        statusCode: 400,
        message: `Unable to process delete product`,
      });
    }
  }
}
