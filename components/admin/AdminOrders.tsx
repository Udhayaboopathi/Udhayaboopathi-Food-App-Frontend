/**
 * Admin Orders Component
 * View and manage all platform orders
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { apiClient } from "@/lib/api";

interface OrderItem {
  id: number;
  menu_item_id: number;
  quantity: number;
  price_at_purchase: number;
  name?: string;
}

interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  delivery_address: string;
  payment_method: string;
  order_items: OrderItem[];
  restaurant_name?: string;
  user_email?: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Fetch all users
      const usersResponse = await apiClient.get("/admin/users");
      const users = usersResponse.data;

      // Fetch all restaurants
      const restaurantsResponse = await apiClient.get("/admin/restaurants");
      const restaurants = restaurantsResponse.data;

      // Fetch orders for each user
      const allOrders: Order[] = [];
      for (const user of users) {
        try {
          const ordersResponse = await apiClient.get(`/orders/user/${user.id}`);
          const userOrders = ordersResponse.data.map((order: Order) => {
            const restaurant = restaurants.find(
              (r: any) => r.id === order.restaurant_id
            );
            return {
              ...order,
              restaurant_name: restaurant?.name || "Unknown",
              user_email: user.email,
            };
          });
          allOrders.push(...userOrders);
        } catch (error) {
          // User might not have orders
        }
      }

      // Sort by created_at descending
      allOrders.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setOrders(allOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = async (order: Order) => {
    try {
      // Fetch menu item details to get names
      const itemsWithNames = await Promise.all(
        (order.order_items || []).map(async (item) => {
          try {
            const menuResponse = await apiClient.get(
              `/menu/${item.menu_item_id}`
            );
            return {
              ...item,
              name: menuResponse.data.name,
            };
          } catch (error) {
            return {
              ...item,
              name: "Unknown Item",
            };
          }
        })
      );

      setSelectedOrder({
        ...order,
        order_items: itemsWithNames,
      });
      setDialogOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setSelectedOrder({
        ...order,
        order_items: order.order_items || [],
      });
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await apiClient.put(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: any } = {
      pending: "warning",
      confirmed: "info",
      preparing: "primary",
      on_the_way: "secondary",
      delivered: "success",
      cancelled: "error",
    };
    return colors[status] || "default";
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  if (loading) {
    return <Typography>Loading orders...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">All Orders</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={statusFilter}
            label="Filter by Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All Orders</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="preparing">Preparing</MenuItem>
            <MenuItem value="on_the_way">On the Way</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4">{orders.length}</Typography>
            <Typography color="text.secondary">Total Orders</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4">
              {orders.filter((o) => o.status === "pending").length}
            </Typography>
            <Typography color="text.secondary">Pending</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4">
              {orders.filter((o) => o.status === "delivered").length}
            </Typography>
            <Typography color="text.secondary">Delivered</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4">
              ₹
              {orders
                .filter((o) => o.status === "delivered")
                .reduce((sum, o) => sum + o.total_amount, 0)
                .toFixed(2)}
            </Typography>
            <Typography color="text.secondary">Total Revenue</Typography>
          </Paper>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.user_email}</TableCell>
                <TableCell>{order.restaurant_name}</TableCell>
                <TableCell>₹{order.total_amount.toFixed(2)}</TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="preparing">Preparing</MenuItem>
                      <MenuItem value="on_the_way">On the Way</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Chip label={order.payment_method} size="small" />
                </TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleViewOrder(order)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">User Email</Typography>
                <Typography>{selectedOrder.user_email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Restaurant</Typography>
                <Typography>{selectedOrder.restaurant_name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Status</Typography>
                <Chip
                  label={selectedOrder.status}
                  color={getStatusColor(selectedOrder.status)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Payment Method</Typography>
                <Typography>{selectedOrder.payment_method}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Delivery Address</Typography>
                <Typography>{selectedOrder.delivery_address}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Order Date</Typography>
                <Typography>
                  {new Date(selectedOrder.created_at).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Total Amount</Typography>
                <Typography variant="h6">
                  ₹{selectedOrder.total_amount.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Order Items
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.order_items &&
                      selectedOrder.order_items.length > 0 ? (
                        selectedOrder.order_items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name || "Loading..."}</TableCell>
                            <TableCell>
                              ₹{item.price_at_purchase.toFixed(2)}
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              ₹
                              {(item.price_at_purchase * item.quantity).toFixed(
                                2
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            No items found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
