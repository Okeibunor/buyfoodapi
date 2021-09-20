/**
 * Handle create product category Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import Product from "App/Models/Product";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";

export default class GetProduct {
  protected data;
  constructor(data) {
    this.data = data;
  }
  async get_product({}) {
    try {
      let products = await Product.query()
        .preload("user")
        .preload("product_category")
        .preload("product_sub_category");

      return CreateOperationResponse({
        results: products,
        label: `Get Product`,
        status: "Success",
        statusCode: 200,
        message: `Product successfully fetched`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Get Product`,
        statusCode: 400,
        message: `Unable to process fetch product`,
      });
    }
  }
  async get_single_product({ product_id }) {
    try {
      // const product = await Product.findBy("id", product_id);
      const product = await Product.query()
        .where("id", product_id)
        .preload("user")
        .preload("product_category")
        .preload("product_sub_category");

      return CreateOperationResponse({
        results: product,
        label: `Get Product`,
        status: "Success",
        statusCode: 200,
        message: `Product successfully fetched`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Get Product`,
        statusCode: 400,
        message: `Unable to process fetch product`,
      });
    }
  }
}
