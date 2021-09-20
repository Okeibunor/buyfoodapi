// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateProduct from "App/Features/Product/CreateProduct";
import DeleteProduct from "App/Features/Product/DeleteProductCategory";
import GetProduct from "App/Features/Product/GetProductCategory";
import UpdateProduct from "App/Features/Product/UpdateProductCategory";
import CreateProductValidator from "App/Validators/CreateProductValidator";

export default class ProductsController {
  public async create_product({ request, auth, response }) {
    const get_product_data = await request.validate(CreateProductValidator);
    let createProductResponse = await new CreateProduct({
      ...get_product_data,
    }).create_product({ auth });

    return response
      .status(createProductResponse.status_code)
      .send(createProductResponse);
  }
  public async get_product({ response }) {
    let getProductResponse = await new GetProduct({}).get_product({});

    return response
      .status(getProductResponse.status_code)
      .send(getProductResponse);
  }
  public async get_single_product({ params: { product_id }, response }) {
    let getSingleProductResponse = await new GetProduct({}).get_single_product({
      product_id,
    });

    return response
      .status(getSingleProductResponse.status_code)
      .send(getSingleProductResponse);
  }
  public async update_product({ params: { product_id }, request, response }) {
    let updateProductResponse = await new UpdateProduct({
      ...request.post(),
    }).update_product({ product_id });

    return response
      .status(updateProductResponse.status_code)
      .send(updateProductResponse);
  }
  public async delete_product({ params: { product_id }, response }) {
    let deleteProductResponse = await new DeleteProduct({}).delete_product({
      product_id,
    });

    return response
      .status(deleteProductResponse.status_code)
      .send(deleteProductResponse);
  }
}
