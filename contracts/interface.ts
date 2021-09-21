import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import { TransactionEntity } from "./enum";

export interface ISignUp {
    username: string
    email: string
    first_name: string
    last_name: string
    password: string
    gender: string
    contact_number: string
    address?: string
  }
export interface ISignIn {
    username?: string
    email?: string
    password: string
    auth: AuthContract
  }
export interface IWalletCreation {
    user_id: number
  }
export interface IWalletCredit {
    user_id: number,
    amount: number
  }
export interface IWalletFunding {
    amount: number,
    reference: string
  }
export interface IInitializePayment {
    amount: number,
    reference: string
    user_id: number
    email: string
    entity: TransactionEntity
  }