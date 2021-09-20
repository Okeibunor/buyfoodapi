/**
 * Handle create product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import Product from "App/Models/Product";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class CreateProduct {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async create_product({ auth }) {
    console.log("auth >> ", auth.user.id);

    const {
      product_category_id,
      product_sub_category_id,
      title,
      description,
      price,
    } = this.data;

    try {
      const new_product = await Product.create({
        product_category_id,
        product_sub_category_id,
        title,
        description,
        price,
        user_id: auth.user.id,
      });

      return CreateOperationResponse({
        results: new_product,
        label: `Create Product`,
        status: "Success",
        statusCode: 200,
        message: `Product successfully created`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Create Product`,
        statusCode: 400,
        message: `Unable to process create product`,
      });
    }
  }
}
