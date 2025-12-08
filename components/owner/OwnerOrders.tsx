/**
 * Owner Orders Component
 * View and manage restaurant orders
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider,
} from "@mui/material";
import { apiClient } from "@/lib/api";

interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  total_amount: number;
  status: string;
  delivery_address: string;
  payment_method: string;
  created_at: string;
  items?: any[];
}

const statusColors: any = {
  pending: "warning",
  confirmed: "info",
  preparing: "primary",
  ready: "success",
  delivered: "success",
  cancelled: "error",
};

const statusOptions = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export default function OwnerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get("/owner/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await apiClient.put(`/owner/orders/${orderId}/status`, null, {
        params: { new_status: newStatus },
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  if (loading) {
    return <Typography>Loading orders...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Orders</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={filterStatus}
            label="Filter by Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All Orders</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="preparing">Preparing</MenuItem>
            <MenuItem value="ready">Ready</MenuItem>
            <MenuItem value="out_for_delivery">Out for Delivery</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary">No orders found</Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {filteredOrders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Order #{order.id}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(order.created_at).toLocaleString()}
                      </Typography>
                    </Box>
                    <Chip
                      label={order.status.replace("_", " ").toUpperCase()}
                      color={statusColors[order.status] || "default"}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Delivery Address
                      </Typography>
                      <Typography>{order.delivery_address}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Payment Method
                      </Typography>
                      <Typography>
                        {order.payment_method.toUpperCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ₹{order.total_amount.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 2 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Update Status</InputLabel>
                      <Select
                        value={order.status}
                        label="Update Status"
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        {statusOptions.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status.replace("_", " ").toUpperCase()}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
