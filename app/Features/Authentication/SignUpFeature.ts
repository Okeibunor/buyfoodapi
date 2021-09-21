/**
 * Handle SignUp Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import User from "App/Models/User";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";
import { ISignUp } from "Contracts/interface";

export default class SignUpFeature {
  protected data;
  constructor(data) {
    this.data = data;
  }
  static async sign_up(data: ISignUp) {
    const {
      first_name,
      last_name,
      email,
      contact_number,
      gender,
      username,
      password,
      address,
    } = data;

    try {
      const new_user = await User.create({
        first_name,
        last_name,
        email,
        contact_number,
        gender,
        username,
        password,
        address,
      });

      return CreateOperationResponse({
        results: new_user,
        label: `Sign up`,
        status: "Success",
        statusCode: 200,
        message: `User successfully registered`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Sign up`,
        statusCode: 400,
        message: `Unable to process user sign up`,
      });
    }
  }
}
