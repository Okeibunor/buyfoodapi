import { AuthContract } from "@ioc:Adonis/Addons/Auth";

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