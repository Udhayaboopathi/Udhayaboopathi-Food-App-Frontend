/**
 * Owner Dashboard Page
 * Restaurant owner management interface
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
  Button,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  MenuBook as MenuBookIcon,
  ShoppingCart as OrdersIcon,
  BarChart as StatsIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { apiClient } from "@/lib/api";
import OwnerRestaurant from "@/components/owner/OwnerRestaurant";
import OwnerMenu from "@/components/owner/OwnerMenu";
import OwnerOrders from "@/components/owner/OwnerOrders";
import OwnerStats from "@/components/owner/OwnerStats";

export default function OwnerDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user?.role !== "owner") {
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
          Restaurant Owner Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your restaurant, menu, and orders
        </Typography>
      </Box>

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, val) => setCurrentTab(val)}>
          <Tab icon={<StatsIcon />} label="Statistics" />
          <Tab icon={<RestaurantIcon />} label="Restaurant" />
          <Tab icon={<MenuBookIcon />} label="Menu" />
          <Tab icon={<OrdersIcon />} label="Orders" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {currentTab === 0 && <OwnerStats />}
      {currentTab === 1 && <OwnerRestaurant />}
      {currentTab === 2 && <OwnerMenu />}
      {currentTab === 3 && <OwnerOrders />}
    </Container>
  );
}
