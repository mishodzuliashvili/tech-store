import "server-only";

import paypal from "@paypal/checkout-server-sdk";

const configureEnvironment = function () {
  return process.env.NODE_ENV === "production"
    ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID!,
        process.env.PAYPAL_CLIENT_SECRET!
      )
    : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID!,
        process.env.PAYPAL_CLIENT_SECRET!
      );
};

export const newPaypalClient = function () {
  return new paypal.core.PayPalHttpClient(configureEnvironment());
};
