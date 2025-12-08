/**
 * Orders Page
 * View order history and track current orders
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Button,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  LocalShipping as ShippingIcon,
  Restaurant as RestaurantIcon,
  Visibility,
  Refresh,
  Star,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { useCartStore } from "@/lib/cartStore";
import apiClient from "@/lib/api";
import ReviewDialog from "@/components/ReviewDialog";
import { useToast } from "@/components/ToastProvider";

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showError } = useToast();
  const { addMultipleItems } = useCartStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchOrders();
  }, [isAuthenticated, router]);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.get(
        `/orders/user/${
          (window as any).useAuthStore?.getState?.()?.user?.id || "user_001"
        }`
      );
      // Sort by creation date, newest first
      const sortedOrders = response.data.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setOrders(sortedOrders);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to load orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "confirmed":
        return "info";
      case "preparing":
        return "primary";
      case "out_for_delivery":
        return "secondary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircleIcon />;
      case "out_for_delivery":
        return <ShippingIcon />;
      default:
        return <RestaurantIcon />;
    }
  };

  const handleReorder = (order: any) => {
    if (!order.items || order.items.length === 0) {
      showError("No items found in this order");
      return;
    }

    // Convert order items to cart items
    const cartItems = order.items.map((item: any) => ({
      id: item.menu_item_id,
      name: item.menu_item?.name || "Item",
      price: item.price_at_purchase,
      quantity: item.quantity,
      restaurant_id: order.restaurant_id,
      restaurant_name: order.restaurant_name || "Restaurant",
      image: item.menu_item?.image,
      is_veg: item.menu_item?.is_veg || false,
    }));

    addMultipleItems(cartItems);
    showSuccess(
      `${cartItems.length} ${
        cartItems.length === 1 ? "item" : "items"
      } added to cart!`,
      "Order Added"
    );
    router.push("/cart");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        My Orders
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {orders.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No orders yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start ordering from your favorite restaurants!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        Order #{order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Typography>
                    </Box>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={order.status.replace(/_/g, " ").toUpperCase()}
                      color={getStatusColor(order.status) as any}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Delivery Address
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {order.delivery_address}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Typography variant="body2" color="text.secondary">
                        Payment Method
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {order.payment_method.toUpperCase()}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography variant="h6" color="primary" fontWeight={700}>
                        ₹{order.total_amount.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>

                  {order.items && order.items.length > 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        gutterBottom
                      >
                        Order Items
                      </Typography>
                      {order.items.map((item: any, index: number) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 0.5,
                          }}
                        >
                          <Typography variant="body2">
                            {item.quantity}x {item.menu_item?.name || "Item"}
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            ₹
                            {(item.price_at_purchase * item.quantity).toFixed(
                              2
                            )}
                          </Typography>
                        </Box>
                      ))}
                    </>
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    {(order.status === "placed" ||
                      order.status === "preparing" ||
                      order.status === "out_for_delivery") && (
                      <Button
                        variant="contained"
                        startIcon={<Visibility />}
                        onClick={() => router.push(`/track/${order.id}`)}
                        sx={{ borderRadius: 2 }}
                      >
                        Track Order
                      </Button>
                    )}
                    {order.status === "delivered" && (
                      <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={() => handleReorder(order)}
                        sx={{ borderRadius: 2 }}
                      >
                        Reorder
                      </Button>
                    )}
                    {order.status === "delivered" && (
                      <Button
                        variant="contained"
                        startIcon={<Star />}
                        onClick={() => {
                          setSelectedOrder(order);
                          setReviewDialogOpen(true);
                        }}
                        sx={{ borderRadius: 2 }}
                        color="secondary"
                      >
                        Rate Order
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Review Dialog */}
      {selectedOrder && (
        <ReviewDialog
          open={reviewDialogOpen}
          onClose={() => {
            setReviewDialogOpen(false);
            setSelectedOrder(null);
          }}
          orderId={selectedOrder.id}
          restaurantId={selectedOrder.restaurant_id}
          restaurantName={selectedOrder.restaurant_name || "Restaurant"}
          items={
            selectedOrder.items?.map((item: any) => ({
              id: item.menu_item_id,
              name: item.menu_item?.name || "Item",
            })) || []
          }
        />
      )}
    </Container>
  );
}
