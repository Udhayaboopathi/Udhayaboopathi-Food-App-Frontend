/**
 * Checkout Page
 * Complete order placement
 */
"use client";

import React, { useState, useEffect } from "react";
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
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useAuthStore } from "@/lib/authStore";
import apiClient from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart, restaurantId } = useCartStore();
  const { user } = useAuthStore();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip_code: "",
    label: "Home",
  });

  useEffect(() => {
    if (user) {
      fetchAddresses();
      fetchPaymentMethods();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const response = await apiClient.get(`/users/${user!.id}/addresses`);
      setAddresses(response.data);
      if (response.data.length > 0) {
        setSelectedAddress(response.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await apiClient.get(
        `/users/${user!.id}/payment-methods`
      );
      setPaymentMethods(response.data);
      // Add cash option
      const cashOption = {
        id: "cash",
        type: "cash",
        display_text: "Cash on Delivery",
      };
      setPaymentMethods([cashOption, ...response.data]);
      setSelectedPayment(cashOption);
    } catch (err) {
      console.error("Failed to fetch payment methods:", err);
      // Set default cash option
      const cashOption = {
        id: "cash",
        type: "cash",
        display_text: "Cash on Delivery",
      };
      setPaymentMethods([cashOption]);
      setSelectedPayment(cashOption);
    }
  };

  const handleAddAddress = async () => {
    try {
      const response = await apiClient.post(`/users/${user!.id}/addresses`, {
        ...newAddress,
        user_id: user!.id,
      });
      setAddresses([...addresses, response.data]);
      setSelectedAddress(response.data);
      setAddressDialogOpen(false);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        zip_code: "",
        label: "Home",
      });
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  };

  const handleApplyCoupon = async () => {
    setCouponError("");
    if (!couponCode.trim()) return;

    try {
      const response = await apiClient.post(`/coupons/${couponCode}/validate`, {
        userId: user!.id,
        orderAmount: getTotal(),
      });
      setAppliedCoupon(response.data);
      setCouponError("");
    } catch (err: any) {
      setCouponError(
        err.response?.data?.detail || "Invalid or expired coupon code"
      );
      setAppliedCoupon(null);
    }
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discount_type === "percentage") {
      return (getTotal() * appliedCoupon.discount_value) / 100;
    }
    return appliedCoupon.discount_value;
  };

  const getFinalTotal = () => {
    const subtotal = getTotal();
    const deliveryFee = 2.99;
    const discount = calculateDiscount();
    return subtotal + deliveryFee - discount;
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError("Please select a delivery address");
      return;
    }

    if (!selectedPayment) {
      setError("Please select a payment method");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        user_id: user!.id,
        restaurant_id: restaurantId,
        delivery_address: `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip_code}`,
        address_id: selectedAddress.id,
        payment_method: selectedPayment.type,
        items: items.map((item: any) => ({
          menu_item_id: item.id,
          menu_item_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: getTotal(),
        delivery_fee: 2.99,
        discount: calculateDiscount(),
        total_amount: getFinalTotal(),
        coupon_code: appliedCoupon?.code || null,
      };

      const response = await apiClient.post("/orders", orderData);
      clearCart();
      router.push(`/orders`);
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
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Delivery Address */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Delivery Address
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setAddressDialogOpen(true)}
                  size="small"
                >
                  Add New
                </Button>
              </Box>

              {addresses.length === 0 ? (
                <Typography color="text.secondary">
                  No saved addresses. Add one to continue.
                </Typography>
              ) : (
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={selectedAddress?.id || ""}
                    onChange={(e) => {
                      const addr = addresses.find(
                        (a) => a.id === e.target.value
                      );
                      setSelectedAddress(addr);
                    }}
                  >
                    {addresses.map((address) => (
                      <FormControlLabel
                        key={address.id}
                        value={address.id}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography fontWeight={600}>
                              {address.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {address.street}, {address.city}, {address.state}{" "}
                              {address.zip_code}
                            </Typography>
                          </Box>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Payment Method
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={selectedPayment?.id || ""}
                  onChange={(e) => {
                    const payment = paymentMethods.find(
                      (p) => p.id === e.target.value
                    );
                    setSelectedPayment(payment);
                  }}
                >
                  {paymentMethods.map((payment) => (
                    <FormControlLabel
                      key={payment.id}
                      value={payment.id}
                      control={<Radio />}
                      label={
                        payment.type === "cash"
                          ? "Cash on Delivery"
                          : `${payment.type.toUpperCase()} ending in ${
                              payment.last4 || "****"
                            }`
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>

          {/* Coupon Code */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Promo Code
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  disabled={!!appliedCoupon}
                  size="small"
                />
                {appliedCoupon ? (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponCode("");
                    }}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                )}
              </Box>
              {couponError && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {couponError}
                </Typography>
              )}
              {appliedCoupon && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Coupon "{appliedCoupon.code}" applied! Save $
                  {calculateDiscount().toFixed(2)}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: { md: "sticky" }, top: { md: 80 } }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Order Summary
              </Typography>

              {items.map((item: any) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Subtotal</Typography>
                <Typography fontWeight={600}>
                  ${getTotal().toFixed(2)}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Delivery Fee</Typography>
                <Typography fontWeight={600}>$2.99</Typography>
              </Box>

              {appliedCoupon && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography color="success.main">Discount</Typography>
                  <Typography color="success.main" fontWeight={600}>
                    -${calculateDiscount().toFixed(2)}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight={700}>
                  Total
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary">
                  ${getFinalTotal().toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handlePlaceOrder}
                disabled={loading || !selectedAddress || !selectedPayment}
                sx={{ mt: 3 }}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Address Dialog */}
      <Dialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Label (e.g., Home, Work)"
              value={newAddress.label}
              onChange={(e) =>
                setNewAddress({ ...newAddress, label: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Street Address"
              value={newAddress.street}
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              fullWidth
              required
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ZIP Code"
                  value={newAddress.zip_code}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zip_code: e.target.value })
                  }
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddressDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddAddress}
            disabled={
              !newAddress.street ||
              !newAddress.city ||
              !newAddress.state ||
              !newAddress.zip_code
            }
          >
            Add Address
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
