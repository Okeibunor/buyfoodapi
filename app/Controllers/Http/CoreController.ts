// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// import WalletService from "App/Features/Core/WalletManagement";
import PaymentService from "App/Features/Payment/PaymentManagement";
import WalletFundingValidator from "App/Validators/WalletFundingValidator";

export default class CoreController {
    public async wallet_funding({ request, auth, response }) {
        const props = await request.validate(WalletFundingValidator);
        
        let createResponse = await PaymentService.initiate_payment(props, auth.user);
    
        return response
          .status(createResponse.status_code)
          .send(createResponse);
      }
}
