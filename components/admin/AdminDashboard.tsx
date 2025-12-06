/**
 * Admin Dashboard Component
 * Overview statistics for the platform
 */
"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Card, CardContent } from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  People as PeopleIcon,
  ShoppingCart as OrderIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  LocalShipping as DeliveryIcon,
} from "@mui/icons-material";
import { apiClient } from "@/lib/api";

interface Stats {
  totalUsers: number;
  totalRestaurants: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  activeRestaurants: number;
  ownerUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalRestaurants: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    activeRestaurants: 0,
    ownerUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch users
      const usersResponse = await apiClient.get("/admin/users");
      const users = usersResponse.data;

      // Fetch restaurants
      const restaurantsResponse = await apiClient.get("/admin/restaurants");
      const restaurants = restaurantsResponse.data;

      // Fetch all orders
      const allOrders: any[] = [];
      for (const user of users) {
        try {
          const ordersResponse = await apiClient.get(`/orders/user/${user.id}`);
          allOrders.push(...ordersResponse.data);
        } catch (error) {
          // User might not have orders
        }
      }

      // Calculate stats
      const totalRevenue = allOrders
        .filter((o) => o.status === "delivered")
        .reduce((sum, o) => sum + o.total_amount, 0);

      setStats({
        totalUsers: users.length,
        totalRestaurants: restaurants.length,
        totalOrders: allOrders.length,
        totalRevenue,
        pendingOrders: allOrders.filter((o) => o.status === "pending").length,
        deliveredOrders: allOrders.filter((o) => o.status === "delivered")
          .length,
        activeRestaurants: restaurants.filter((r: any) => r.is_active).length,
        ownerUsers: users.filter((u: any) => u.role === "owner").length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    icon,
    color,
    subtitle,
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
  }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography color="text.secondary" variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography color="text.secondary" variant="caption">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: 2,
              p: 1.5,
              height: "fit-content",
              color: "white",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <Typography>Loading dashboard...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Platform Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<PeopleIcon />}
            color="#3f51b5"
            subtitle={`${stats.ownerUsers} owners`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Restaurants"
            value={stats.totalRestaurants}
            icon={<RestaurantIcon />}
            color="#f50057"
            subtitle={`${stats.activeRestaurants} active`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<OrderIcon />}
            color="#ff9800"
            subtitle={`${stats.pendingOrders} pending`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toFixed(2)}`}
            icon={<MoneyIcon />}
            color="#4caf50"
            subtitle="From delivered orders"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <DeliveryIcon sx={{ mr: 1, color: "#9c27b0" }} />
              <Typography variant="h6">Delivered Orders</Typography>
            </Box>
            <Typography variant="h3">{stats.deliveredOrders}</Typography>
            <Typography color="text.secondary">
              {stats.totalOrders > 0
                ? `${(
                    (stats.deliveredOrders / stats.totalOrders) *
                    100
                  ).toFixed(1)}% of total`
                : "No orders yet"}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TrendingUpIcon sx={{ mr: 1, color: "#00bcd4" }} />
              <Typography variant="h6">Pending Orders</Typography>
            </Box>
            <Typography variant="h3">{stats.pendingOrders}</Typography>
            <Typography color="text.secondary">Require attention</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <RestaurantIcon sx={{ mr: 1, color: "#ff5722" }} />
              <Typography variant="h6">Active Restaurants</Typography>
            </Box>
            <Typography variant="h3">{stats.activeRestaurants}</Typography>
            <Typography color="text.secondary">
              Currently accepting orders
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Stats Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Average Revenue per Order
                </Typography>
                <Typography variant="h5">
                  ₹
                  {stats.deliveredOrders > 0
                    ? (stats.totalRevenue / stats.deliveredOrders).toFixed(2)
                    : "0.00"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  Orders per Restaurant
                </Typography>
                <Typography variant="h5">
                  {stats.totalRestaurants > 0
                    ? (stats.totalOrders / stats.totalRestaurants).toFixed(1)
                    : "0"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
