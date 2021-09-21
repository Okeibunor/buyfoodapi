/*
|--------------------------------------------------------------------------
| Core Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/wallet-funding", "CoreController.wallet_funding");
})
  .middleware("auth")
  .prefix("/api/v1/core");
