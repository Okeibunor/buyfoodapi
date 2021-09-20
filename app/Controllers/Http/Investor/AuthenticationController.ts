// import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import SignInFeature from "App/Features/Authentication/SignInFeature";
import SignUpFeature from "App/Features/Authentication/SignUpFeature";
import RegisterValidator from "App/Validators/RegisterValidator";
import SignInValidator from "App/Validators/SignInValidator";

export default class AuthenticationController {
  public async registration({ request, response }) {
    const get_sign_up_data = await request.validate(RegisterValidator);
    let signUpResponse = await new SignUpFeature({
      ...get_sign_up_data,
    }).sign_up({});

    return response.status(signUpResponse.status_code).send(signUpResponse);
  }
  public async signin({ request, response, auth }) {
    const get_sign_in_data = await request.validate(SignInValidator);
    let signInResponse = await new SignInFeature({
      ...get_sign_in_data,
    }).sign_in({ auth });

    return response.status(signInResponse.status_code).send(signInResponse);
  }
}
