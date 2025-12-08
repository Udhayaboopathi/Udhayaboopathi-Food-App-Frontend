/**
 * Shopping Cart Page
 * Review cart and proceed to checkout
 */
"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useAuthStore } from "@/lib/authStore";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotal, clearCart } =
    useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Add some delicious items to get started
        </Typography>
        <Button variant="contained" onClick={() => router.push("/restaurants")}>
          Browse Restaurants
        </Button>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
      >
        Shopping Cart
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          {items.map((item: any) => (
            <Card key={item.id} sx={{ mb: { xs: 1.5, sm: 2 } }}>
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2 },
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                  }}
                >
                  <Box
                    sx={{ flexGrow: 1, minWidth: { xs: "100%", sm: "auto" } }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {item.restaurant_name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight={700}
                      sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                    >
                      ₹{item.price.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.5, sm: 1 },
                    }}
                  >
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      size="small"
                      color="primary"
                      sx={{ p: { xs: 0.5, sm: 1 } }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{
                        minWidth: { xs: 24, sm: 30 },
                        textAlign: "center",
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      size="small"
                      color="primary"
                      sx={{ p: { xs: 0.5, sm: 1 } }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <IconButton
                    onClick={() => removeItem(item.id)}
                    color="error"
                    sx={{ p: { xs: 0.5, sm: 1 } }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="outlined"
            color="error"
            onClick={clearCart}
            sx={{ mt: 2 }}
          >
            Clear Cart
          </Button>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{ position: { xs: "relative", md: "sticky" }, top: { md: 80 } }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Order Summary
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Item Total</Typography>
                <Typography fontWeight={600}>
                  ₹{getTotal().toFixed(2)}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Delivery Charges</Typography>
                <Typography fontWeight={600}>₹49.00</Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>GST (5%)</Typography>
                <Typography fontWeight={600}>
                  ₹{(getTotal() * 0.05).toFixed(2)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Grand Total
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary">
                  ₹{(getTotal() + 49 + getTotal() * 0.05).toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
