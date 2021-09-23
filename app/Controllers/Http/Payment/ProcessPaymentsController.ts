// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PaymentService from "App/Features/Payment/PaymentManagement";
import PaystackService from "App/Features/Payment/Paystack";
import VerifyPaymentValidator from "App/Validators/VerifyPaymentValidator";

export default class ProcessPaymentsController {
  public async verify_payment({ request, response }) {
    // public async verify_payment({ request, auth, response }) {
    const props = await request.validate(VerifyPaymentValidator);
    let createResponse = await PaymentService.verify_payment(props.reference);
    // let createResponse = await PaymentService.verify_payment(props.reference, auth.user);

    return response
      .status(createResponse?.status_code)
      .send(createResponse);
  }
  public async fetch_bank_list({ response }) {
    let createResponse = await PaystackService.fetch_bank_list();

    return response
      .status(createResponse?.status_code)
      .send(createResponse);
  }
}
