/**
 * Handle SignIn Activities
 *
 * @param {Object}
 *
 * @returns {Object}
 */

import Hash from "@ioc:Adonis/Core/Hash";

import User from "App/Models/User";
import CreateOperationResponse from "App/Utilities/CreateOperationResponse";
import { ISignIn } from "Contracts/interface";

export default class SignInFeature {
  protected data;
  constructor(data) {
    this.data = data;
  }
  static async sign_in(data: ISignIn) {
    // console.log("auth >> ", auth);

    const { email, password, auth } = data;

    // console.log("kk >> ", email, username, password);

    try {
      if (!email) {
        return CreateOperationResponse({
          results: null,
          label: `Sign in`,
          statusCode: 400,
          message: `Email is required`,
        });
      }
      let get_user_prom = User.query();

      if (email) {
        get_user_prom.where("email", email);
      }
      // if (!email) {
      //   get_user_prom.where("username", username);
      // }

      const get_user = await get_user_prom.first();

      if (!get_user) {
        return CreateOperationResponse({
          results: null,
          label: `Sign in`,
          statusCode: 400,
          message: `User does not exist`,
        });
      }

      const passwords_match = await Hash.verify(get_user.password, password);

      if (!passwords_match) {
        return CreateOperationResponse({
          results: null,
          label: `Hash Comparison/Password Match`,
          statusCode: 400,
          message: `Invalid login credentials. Please try again`,
        });
      }

      const token = await auth.use("api").generate(get_user);

      return CreateOperationResponse({
        results: {
          token,
          user: get_user,
        },
        label: `Sign In`,
        status: "Success",
        statusCode: 200,
        message: `User successfully signed in`,
      });
    } catch (error) {
      //   console.log("err >> ", error.message);

      return CreateOperationResponse({
        results: null,
        error: error,
        label: `Sign in`,
        statusCode: 400,
        message: `Unable to process user sign in`,
      });
    }
  }
}
