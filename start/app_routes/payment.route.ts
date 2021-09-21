/*
|--------------------------------------------------------------------------
| Payment Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/generate-reference", "Payment/PaymentManagementsController.generate_reference");
  Route.post("/verify-payment", "Payment/ProcessPaymentsController.verify_payment");
})
  .middleware("auth")
  .prefix("/api/v1/transaction");
