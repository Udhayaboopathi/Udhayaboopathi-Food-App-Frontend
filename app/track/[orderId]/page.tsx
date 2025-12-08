/**
 * Order Tracking Page
 * Real-time order status with driver location and ETA
 */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  CheckCircle,
  Restaurant,
  DeliveryDining,
  Home,
  Phone,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";
import { apiClient } from "@/lib/api";

interface OrderDetails {
  id: number;
  status: string;
  restaurant_name: string;
  restaurant_address: string;
  delivery_address: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total_amount: number;
  estimated_delivery_time: string;
  driver?: {
    name: string;
    phone: string;
    rating: number;
    vehicle: string;
  };
  created_at: string;
}

const orderSteps = [
  {
    label: "Order Placed",
    description: "Your order has been received",
    icon: <CheckCircle />,
    status: "placed",
  },
  {
    label: "Restaurant Preparing",
    description: "Your food is being prepared",
    icon: <Restaurant />,
    status: "preparing",
  },
  {
    label: "Out for Delivery",
    description: "Driver is on the way",
    icon: <DeliveryDining />,
    status: "out_for_delivery",
  },
  {
    label: "Delivered",
    description: "Order delivered successfully",
    icon: <Home />,
    status: "delivered",
  },
];

export default function TrackOrderPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.orderId as string;
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
      // Simulate real-time updates
      const interval = setInterval(fetchOrderDetails, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [orderId]);

  useEffect(() => {
    if (order) {
      const stepIndex = orderSteps.findIndex(
        (step) => step.status === order.status
      );
      setActiveStep(stepIndex >= 0 ? stepIndex : 0);
    }
  }, [order]);

  const fetchOrderDetails = async () => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <LinearProgress />
        <Typography sx={{ mt: 2, textAlign: "center" }}>
          Loading order details...
        </Typography>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Order not found
        </Typography>
        <Button variant="contained" onClick={() => router.push("/orders")}>
          View All Orders
        </Button>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
    >
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
        >
          Track Your Order
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Order #{order.id}
          </Typography>
          <Chip
            label={order.status.replace("_", " ").toUpperCase()}
            color={order.status === "delivered" ? "success" : "primary"}
            size="small"
          />
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Left Column - Order Progress */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Order Status
            </Typography>

            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              sx={{ mt: 3 }}
            >
              {orderSteps.map((step, index) => (
                <Step key={step.label} completed={index < activeStep}>
                  <StepLabel
                    icon={step.icon}
                    sx={{
                      "& .MuiStepLabel-iconContainer": {
                        color:
                          index <= activeStep
                            ? "primary.main"
                            : "action.disabled",
                      },
                    }}
                  >
                    <Typography fontWeight={index === activeStep ? 600 : 400}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                    {index === activeStep && order.estimated_delivery_time && (
                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          bgcolor: "primary.50",
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <AccessTime color="primary" fontSize="small" />
                        <Typography variant="body2" fontWeight={500}>
                          ETA: {order.estimated_delivery_time}
                        </Typography>
                      </Box>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {/* Driver Info */}
          {order.driver && order.status === "out_for_delivery" && (
            <Card sx={{ mt: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Your Delivery Partner
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
                >
                  <Avatar
                    sx={{ width: 60, height: 60, bgcolor: "primary.main" }}
                  >
                    {order.driver.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {order.driver.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        ⭐ {order.driver.rating} • {order.driver.vehicle}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<Phone />}
                    href={`tel:${order.driver.phone}`}
                    sx={{ borderRadius: 2 }}
                  >
                    Call
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Right Column - Order Details */}
        <Grid item xs={12} md={5}>
          {/* Restaurant Info */}
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Restaurant
            </Typography>
            <Box
              sx={{ display: "flex", gap: 1, alignItems: "flex-start", mt: 2 }}
            >
              <Restaurant color="action" />
              <Box>
                <Typography fontWeight={500}>
                  {order.restaurant_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.restaurant_address}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Delivery Address */}
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Delivery Address
            </Typography>
            <Box
              sx={{ display: "flex", gap: 1, alignItems: "flex-start", mt: 2 }}
            >
              <LocationOn color="action" />
              <Typography variant="body2" color="text.secondary">
                {order.delivery_address}
              </Typography>
            </Box>
          </Paper>

          {/* Order Items */}
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Order Summary
            </Typography>
            <List disablePadding sx={{ mt: 2 }}>
              {order.items.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ py: 1 }}>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">
                          {item.quantity}x {item.name}
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" fontWeight={700}>
                Total Amount
              </Typography>
              <Typography variant="subtitle1" fontWeight={700} color="primary">
                ₹{order.total_amount.toFixed(2)}
              </Typography>
            </Box>
          </Paper>

          {/* Help Button */}
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, borderRadius: 2 }}
            onClick={() => router.push("/help")}
          >
            Need Help?
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
