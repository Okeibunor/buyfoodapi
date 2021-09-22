// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PaymentService from "App/Features/Payment/PaymentManagement";
import PaystackService from "App/Features/Payment/Paystack";

export default class PaymentManagementsController {

    public async generate_reference({ response }) {
        let createResponse = await PaystackService.generate_reference();
    
        return response
          .status(createResponse?.status_code)
          .send(createResponse);
      }
    public async fetch_transactions({ response, auth }) {
        let createResponse = await PaymentService.fetch_transactions(auth.user);
    
        return response
          .status(createResponse?.status_code)
          .send(createResponse);
      }
    public async fetch_single_transaction({ response, auth, params: {transaction_id} }) {
        let createResponse = await PaymentService.fetch_single_transaction(transaction_id, auth.user);
    
        return response
          .status(createResponse?.status_code)
          .send(createResponse);
      }
}
