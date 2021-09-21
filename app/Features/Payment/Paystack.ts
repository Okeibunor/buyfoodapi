/**
 * Handle Paystack Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import Transaction from "App/Models/Transaction";
import { generatePaystackString } from "App/Utilities/CodeGenerator";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";
import axios from "axios";
import paystackConfig from "Config/paystack";
import { TransactionStatus } from "Contracts/enum";
import { IInitializePayment } from "Contracts/interface";

export default class PaystackService {
  protected data;
  constructor(data) {
    this.data = data;
  }
  static async generate_reference() {
    try {
      const reference = `T${generatePaystackString(14)}`;

      const exists = await Transaction.findBy("reference", reference);

      if (!exists) {
        return { reference, status_code: 200 };
      }
      await this.generate_reference();
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Generate reference`,
        statusCode: 400,
        message: `Unable to process generate reference`,
      });
    }
  }
  static async initialize_payment(data: IInitializePayment) {
    try {
      const {
        user_id,
        amount,
        reference,
        email,
        entity
      } = data;


      let payload = {
        key: paystackConfig["public"],
        user_id,
        amount: amount * 100,
        email,
        reference,
        currency: "NGN",
        metadata: {
          user_id,
          email,
          entity,
          amount,
        },
        channels: [
          "card",
          "bank",
          "ussd",
          "qr",
          "mobile_money",
          "bank_transfer",
        ],
      };

      const initializePaymentResponse = await axios.post(
        paystackConfig["initializePaymentEndpoint"],
        payload,
        {
          headers: {
            Authorization: `Bearer ${paystackConfig["secret"]}`,
          },
        }
      );

      console.log("initializePaymentResponse >> ", initializePaymentResponse);

      const new_payment = new Transaction();
      new_payment.user_id = user_id;
      new_payment.reference = reference;
      new_payment.entity = entity;
      new_payment.status = TransactionStatus.PENDING;
      new_payment.amount = amount;

     await new_payment.save();

      return CreateOperationResponse({
        results: initializePaymentResponse.data,
        statusCode: 200,
        status: "success",
        label: `initiate Payment`,
        message: "Payment initialized",
      });
    } catch (error) {
      // console.log('error >> ', error);
      
      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Initiate Payment`,
        statusCode: 400,
        message: `Unable to initiate payment`,
      });
    }
  }

  static async verify_payment(reference: string) {
    try {

      console.log("hrtrh");
      
      const verifyPaymentResponse:any  = await axios.get(
        `${paystackConfig["verifyPaymentEndpoint"]}/${encodeURIComponent(
          reference
        )}`,
        {
          headers: {
            authorization: `Bearer ${paystackConfig["secret"]}`,
          },
        }
      );

      console.log("verifyPaymentResponse >> ",verifyPaymentResponse);


      const { data: payment_data } = verifyPaymentResponse.data;


      if (payment_data.status != "success") {
        return CreateOperationResponse({
          results: payment_data,
          error: payment_data.gateway_response,
          label: `paystack verify`,
          statusCode: 400,
          message: `Unable to verify paystack payment request`,
        });
      }

      return CreateOperationResponse({
        results: {
          data: verifyPaymentResponse.data.data,
          authorization: verifyPaymentResponse.authorization,
          customer: verifyPaymentResponse.customer,
        },
        statusCode: 200,
        status: "success",
        label: `paystack verify`,
        message: "Payment Verified",
      });
    } catch (error) {

      console.log("error >> ", error);
      
      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Verify Payment`,
        statusCode: 400,
        message: `Unable to verify payment`,
      });
    }
  }

  
}
