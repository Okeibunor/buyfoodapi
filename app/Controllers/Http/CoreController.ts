// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// import WalletService from "App/Features/Core/WalletManagement";
import BeneficiaryService from "App/Features/Core/BeneficiaryManagement";
import WalletService from "App/Features/Core/WalletManagement";
import PaymentService from "App/Features/Payment/PaymentManagement";
import CreatebeneficiaryValidator from "App/Validators/CreatebeneficiaryValidator";
import WalletFundingValidator from "App/Validators/WalletFundingValidator";
import WalletTransferValidator from "App/Validators/WalletTransferValidator";
import WalletWithdrawalValidator from "App/Validators/WalletWithdrawalValidator";

export default class CoreController {
    public async wallet_funding({ request, auth, response }) {
        const props = await request.validate(WalletFundingValidator);
        
        let createResponse = await PaymentService.initiate_payment(props, auth.user);
    
        return response
          .status(createResponse.status_code)
          .send(createResponse);
      }
    public async wallet_transfer({ request, auth, response }) {
        const props = await request.validate(WalletTransferValidator);
        
        let createResponse = await WalletService.transfer_money(props, auth.user);
    
        return response
          .status(createResponse.status_code)
          .send(createResponse);
      }
    public async wallet_withdrawal({ request, auth, response }) {
        const props = await request.validate(WalletWithdrawalValidator);
        
        let createResponse = await WalletService.wallet_withdrawal(props, auth.user);
    
        return response
          .status(createResponse.status_code)
          .send(createResponse);
      }
    public async create_beneficiary({ request, auth, response }) {
        const props = await request.validate(CreatebeneficiaryValidator);
        
        let createResponse = await BeneficiaryService.create_beneficiary({...props, user_id:auth.user.id});
    
        return response
          .status(createResponse.status_code)
          .send(createResponse);
      }
    public async remove_beneficiary({ auth, response, params: {beneficiary_id} }) {
        let createResponse = await BeneficiaryService.remove_beneficiary(auth.user, beneficiary_id);
    
        return response
          .status(createResponse.status_code)
          .send(createResponse);
      }
    public async get_beneficiaries({ auth, response }) {
        let createResponse = await BeneficiaryService.get_beneficiaries(auth.user);
    
        return response
          .status(createResponse.status_code)
          .send(createResponse);
      }
    public async get_beneficiary({ auth, response, params: {beneficiary_id} }) {
        let createResponse = await BeneficiaryService.get_beneficiary(auth.user, beneficiary_id);
    
        return response
          .status(createResponse.status_code)
          .send(createResponse);
      }
}
