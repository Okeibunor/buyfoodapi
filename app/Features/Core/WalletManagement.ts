/**
 * Handle wallet management Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

 import Wallet from "App/Models/Wallet";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";
import { IWalletCreation } from "Contracts/interface";
 
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
 }
 