/**
 * Handle wallet management Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

 import User from "App/Models/User";
import Wallet from "App/Models/Wallet";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";
import { IWalletCreation, IWalletCredit, IWalletFunding } from "Contracts/interface";
 
 export default class WalletService {
   protected data;
   constructor(data) {
     this.data = data;
   }
   static async create_wallet(data: IWalletCreation) {
 
     const {
       user_id
     } = data;
 
     try {
       await Wallet.create({
         user_id,
       });
 
       return CreateOperationResponse({
         results: {},
         label: `Create Wallet`,
         status: "Success",
         statusCode: 200,
         message: `Wallet successfully created`,
       });
     } catch (error) {
       //   console.log("err >> ", error.message);
 
       return CreateOperationResponse({
         results: null,
         error: error,
         label: `Create Wallet`,
         statusCode: 400,
         message: `Unable to process create wallet`,
       });
     }
   }
   static async credit(data: IWalletCredit) {
 
     const {
       user_id,
       amount
     } = data;
 
     try {

      const get_wallet = (await Wallet.query()
        .whereNot("user_id", user_id)
        .first()) as Wallet;

        get_wallet.amount = get_wallet.amount + amount

       await get_wallet.save()
 
       return CreateOperationResponse({
         results: {},
         label: `Credit Wallet`,
         status: "Success",
         statusCode: 200,
         message: `Wallet successfully credited`,
       });
     } catch (error) {
       //   console.log("err >> ", error.message);
 
       return CreateOperationResponse({
         results: null,
         error: error,
         label: `Credit Wallet`,
         statusCode: 400,
         message: `Unable to process credit wallet`,
       });
     }
   }
   static async wallet_funding(data: IWalletFunding, user: User) {
 
    //  const {
    //    reference, amount
    //  } = data;
 
     try {
       
 
       return CreateOperationResponse({
         results: {},
         label: `Fund Wallet`,
         status: "Success",
         statusCode: 200,
         message: `successfully funded wallet`,
       });
     } catch (error) {
       //   console.log("err >> ", error.message);
 
       return CreateOperationResponse({
         results: null,
         error: error,
         label: `Create Wallet`,
         statusCode: 400,
         message: `Unable to process fund wallet`,
       });
     }
   }
 }
 