/**
 * Handle Paystack Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import Transaction from "App/Models/Transaction";
import User from "App/Models/User";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";
import { TransactionEntity, TransactionStatus } from "Contracts/enum";
import { IWalletFunding } from "Contracts/interface";
import WalletService from "../Core/WalletManagement";
import PaystackService from "./Paystack";
 
 export default class PaymentService {


   static async initiate_payment(data: IWalletFunding, user: User) {
   
     
    const { amount, reference } = data;
    // console.log(user);

    const payload = {
      email: user.email,
      amount,
      user_id: user.id,
      entity: TransactionEntity.WALLETFUNDING,
      reference
    };


    const process_initial_payment = await PaystackService.initialize_payment(payload);

    // console.log(" process_initial_payment >> ", process_initial_payment);

    return process_initial_payment;
  }

  static async verify_payment(reference: string, user: User) {
    // console.log(user);

    try {
      const process_verify_payment = await PaystackService.verify_payment(
        reference,
      );

      console.log("process_verify_payment >> ", process_verify_payment);
      

      if (process_verify_payment.status_code != 200) {
        return process_verify_payment;
      }

      const {
        channel,
        metadata,
        authorization,
        customer,
        amount,
        reference: payment_reference,
        currency,
        ip_address,
      } = process_verify_payment.results.data;


      const payment_exists = await Transaction.query()
        .whereNot("status", TransactionStatus.PENDING)
        .where("reference", reference)
        .andWhere("amount", amount / 100)
        .first();

      //   console.log("payment_exists >> ", payment_exists.toJSON());

      if (!payment_exists) {
        return CreateOperationResponse({
          error: {message: "Payment Does Not Exist", status: 'Failed'},
          results: null,
          label: `Verify Payment`,
          statusCode: 400,
          message: `Unable to find this payment`,
        });
      }

      const credit = await WalletService.credit({
        user_id: metadata.user_id,
        amount: amount / 100
      });

      if (credit.status_code != 200) {
        return credit;
      }

      payment_exists.payment_date = Date.now();
      payment_exists.status = TransactionStatus.SUCCESSFUL;
      payment_exists.amount = amount / 100;

      await payment_exists.save();
      return CreateOperationResponse({
        results: { ...credit.results, metadata },
        status: "Success",
        label: 'Payment Verified',
        statusCode: 200,
        message: `Successfully credited`,
      });
    } catch (error) {
      // console.log(error);
      return CreateOperationResponse({
        error: error,
        status: "Error",
        statusCode: 500,
        label: 'Payment Verified',
        results:null,
        message: `Error in processing verify payment`,
      });
    }
  }
 
   
 }

