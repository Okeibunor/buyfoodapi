/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/signup", "User/AuthenticationController.registration");
  Route.post("/signin", "User/AuthenticationController.signin");
}).prefix("/api/v1/auth");
