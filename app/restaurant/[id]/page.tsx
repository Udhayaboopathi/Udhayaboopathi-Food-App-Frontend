/**
 * Restaurant Detail Page
 * View restaurant menu and add items to cart
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  Rating,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import { useParams } from "next/navigation";
import MenuCard from "@/components/MenuCard";
import apiClient from "@/lib/api";

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurantId = params.id;

  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantData();
    }
  }, [restaurantId]);

  const fetchRestaurantData = async () => {
    setLoading(true);
    try {
      const [restaurantRes, menuRes] = await Promise.all([
        apiClient.get(`/restaurants/${restaurantId}`),
        apiClient.get(`/menu/restaurant/${restaurantId}`),
      ]);

      // Convert CSV string data to proper types
      const restaurantData = restaurantRes.data;
      const processedRestaurant = {
        ...restaurantData,
        rating:
          typeof restaurantData.rating === "string"
            ? parseFloat(restaurantData.rating)
            : restaurantData.rating,
        delivery_time:
          typeof restaurantData.delivery_time === "string"
            ? parseInt(restaurantData.delivery_time)
            : restaurantData.delivery_time,
      };

      // Process menu items
      const processedMenu = menuRes.data.map((item: any) => ({
        ...item,
        id: parseInt(item.id),
        price: parseFloat(item.price),
        restaurant_id: parseInt(item.restaurant_id),
        is_veg: item.is_veg === "true" || item.is_veg === true,
        is_available:
          item.is_available === "true" || item.is_available === true,
      }));

      setRestaurant(processedRestaurant);
      setMenuItems(processedMenu);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!restaurant) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">Restaurant not found</Typography>
      </Container>
    );
  }

  const categories = [
    "all",
    ...new Set(menuItems.map((item: any) => item.category)),
  ];
  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item: any) => item.category === selectedCategory);

  return (
    <Container
      maxWidth="xl"
      sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
    >
      {/* Restaurant Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" } }}
        >
          {restaurant.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            <Rating
              value={restaurant.rating}
              precision={0.1}
              readOnly
              size="small"
              sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
            />
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {restaurant.rating.toFixed(1)}
            </Typography>
          </Box>

          <Chip
            label={restaurant.cuisine}
            color="primary"
            size="small"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          />
          <Chip
            icon={
              <AccessTimeIcon
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              />
            }
            label={`${restaurant.delivery_time} min`}
            variant="outlined"
            size="small"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          />
        </Box>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          {restaurant.address}, {restaurant.city}
        </Typography>
      </Box>

      {/* Category Tabs */}
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", mb: { xs: 2, md: 3 } }}
      >
        <Tabs
          value={selectedCategory}
          onChange={(e: any, newValue: any) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category) => (
            <Tab
              key={category}
              label={category === "all" ? "All Items" : category}
              value={category}
            />
          ))}
        </Tabs>
      </Box>

      {/* Menu Items */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {filteredItems.map((item: any) => (
          <Grid item xs={12} sm={12} md={6} key={item.id}>
            <MenuCard {...item} restaurant_name={restaurant.name} />
          </Grid>
        ))}
      </Grid>

      {filteredItems.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No items in this category
          </Typography>
        </Box>
      )}
    </Container>
  );
}
