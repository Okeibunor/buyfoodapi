/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/signup", "Investor/AuthenticationController.registration");
  Route.post("/signin", "Investor/AuthenticationController.signin");
}).prefix("/api/v1/auth");
