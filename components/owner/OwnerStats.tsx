/**
 * Owner Stats Component
 * Display restaurant statistics
 */
"use client";

import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  ShoppingCart as OrdersIcon,
  MenuBook as MenuIcon,
  AttachMoney as RevenueIcon,
} from "@mui/icons-material";
import { apiClient } from "@/lib/api";

interface Stats {
  total_orders: number;
  pending_orders: number;
  total_menu_items: number;
  total_revenue: number;
  restaurant_id: number;
}

export default function OwnerStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await apiClient.get("/owner/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return <Typography>Loading statistics...</Typography>;
  }

  const statCards = [
    {
      title: "Total Orders",
      value: stats.total_orders,
      icon: <OrdersIcon sx={{ fontSize: 40 }} />,
      color: "#1976d2",
    },
    {
      title: "Pending Orders",
      value: stats.pending_orders,
      icon: <OrdersIcon sx={{ fontSize: 40 }} />,
      color: "#ed6c02",
    },
    {
      title: "Menu Items",
      value: stats.total_menu_items,
      icon: <MenuIcon sx={{ fontSize: 40 }} />,
      color: "#2e7d32",
    },
    {
      title: "Total Revenue",
      value: `$${stats.total_revenue.toFixed(2)}`,
      icon: <RevenueIcon sx={{ fontSize: 40 }} />,
      color: "#9c27b0",
    },
  ];

  return (
    <Grid container spacing={3}>
      {statCards.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4">{stat.value}</Typography>
                </Box>
                <Box sx={{ color: stat.color }}>{stat.icon}</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
