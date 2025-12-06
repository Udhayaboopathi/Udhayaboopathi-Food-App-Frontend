/**
 * Admin Panel Page
 * Admin dashboard for managing the platform
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  People as PeopleIcon,
  ShoppingCart as OrdersIcon,
  BarChart as StatsIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminRestaurants from "@/components/admin/AdminRestaurants";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPanel() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user?.role !== "admin") {
      router.push("/");
      return;
    }

    setLoading(false);
  }, [isAuthenticated, user, router]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Panel
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage restaurants, users, and platform settings
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, val) => setCurrentTab(val)}>
          <Tab icon={<StatsIcon />} label="Dashboard" />
          <Tab icon={<RestaurantIcon />} label="Restaurants" />
          <Tab icon={<PeopleIcon />} label="Users" />
          <Tab icon={<OrdersIcon />} label="Orders" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {currentTab === 0 && <AdminDashboard />}

      {currentTab === 1 && <AdminRestaurants />}

      {currentTab === 2 && <AdminUsers />}

      {currentTab === 3 && <AdminOrders />}
    </Container>
  );
}
