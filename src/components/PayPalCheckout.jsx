/** @format */
import * as React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Alert, CircularProgress } from "@mui/material";

export default function PayPalCheckout({
  amount,
  currency = "USD",
  onSuccess,
}) {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  if (!amount || amount <= 0) {
    return <Alert severity='warning'>Invalid amount for payment.</Alert>;
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: currency,
        intent: "capture",
      }}>
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect", color: "gold" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Service Payment",
                amount: {
                  value: amount.toFixed(2),
                  currency_code: currency,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          setLoading(true);
          try {
            const details = await actions.order.capture();
            console.log("Payment captured:", details);
            if (onSuccess) onSuccess(details);
          } catch (err) {
            console.error("Capture error:", err);
            setError(err.message || "Payment failed. Please try again.");
          } finally {
            setLoading(false);
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          setError("Something went wrong with PayPal. Please try again.");
        }}
        onCancel={() => {
          setError("Payment was cancelled.");
        }}
      />
    </PayPalScriptProvider>
  );
}
