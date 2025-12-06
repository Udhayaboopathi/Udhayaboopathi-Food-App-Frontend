/**
 * Checkout Page
 * Complete order placement
 */
"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useAuthStore } from "@/lib/authStore";
import apiClient from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart, restaurantId } = useCartStore();
  const { user } = useAuthStore();

  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      setError("Please enter a delivery address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        restaurant_id: restaurantId,
        delivery_address: deliveryAddress,
        payment_method: paymentMethod,
        items: items.map((item: any) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await apiClient.post("/orders", orderData);
      clearCart();
      router.push(`/order/${response.data.id}`);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Delivery Address
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={deliveryAddress}
            onChange={(e: any) => setDeliveryAddress(e.target.value)}
            placeholder="Enter your complete delivery address"
            required
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Payment Method
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={paymentMethod}
              onChange={(e: any) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on Delivery"
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Credit/Debit Card (Mock)"
              />
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label="UPI (Mock)"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Order Summary
          </Typography>

          {items.map((item: any) => (
            <Box
              key={item.id}
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>
                {item.name} x {item.quantity}
              </Typography>
              <Typography fontWeight={600}>
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Subtotal</Typography>
            <Typography fontWeight={600}>${getTotal().toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography>Delivery Fee</Typography>
            <Typography fontWeight={600}>$2.99</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={700}>
              Total
            </Typography>
            <Typography variant="h6" fontWeight={700} color="primary">
              ${(getTotal() + 2.99).toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </Button>
    </Container>
  );
}
