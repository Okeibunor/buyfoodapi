// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PaystackService from "App/Features/Payment/Paystack";

export default class PaymentManagementsController {

    public async generate_reference({ response }) {
        let createResponse = await PaystackService.generate_reference();
    
        return response
          .status(createResponse?.status_code)
          .send(createResponse);
      }
}
