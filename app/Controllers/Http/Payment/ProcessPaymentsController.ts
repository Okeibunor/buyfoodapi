// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PaymentService from "App/Features/Payment/PaymentManagement";
import VerifyPaymentValidator from "App/Validators/VerifyPaymentValidator";

export default class ProcessPaymentsController {
    public async verify_payment({ request, auth, response }) {
        const props = await request.validate(VerifyPaymentValidator);
        let createResponse = await PaymentService.verify_payment(props.reference, auth.user);
    
        return response
          .status(createResponse?.status_code)
          .send(createResponse);
      }
}
