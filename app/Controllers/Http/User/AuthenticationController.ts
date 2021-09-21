// import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import SignInFeature from "App/Features/Authentication/SignInFeature";
import SignUpFeature from "App/Features/Authentication/SignUpFeature";
import RegisterValidator from "App/Validators/RegisterValidator";
import SignInValidator from "App/Validators/SignInValidator";

export default class AuthenticationController {
  public async registration({ request, response }) {
    const props = await request.validate(RegisterValidator);
    let signUpResponse = await SignUpFeature.sign_up(props);

    return response.status(signUpResponse.status_code).send(signUpResponse);
  }
  public async signin({ request, response, auth }) {
    const props = await request.validate(SignInValidator);
    let signInResponse = await  SignInFeature.sign_in({ ...props, auth });

    return response.status(signInResponse.status_code).send(signInResponse);
  }
}
