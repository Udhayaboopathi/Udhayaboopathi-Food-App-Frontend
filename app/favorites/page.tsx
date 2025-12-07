/**
 * Favorites Page
 * Display user's favorite restaurants
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { FavoriteBorder as FavoriteBorderIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import RestaurantCard from "@/components/RestaurantCard";
import { useAuthStore } from "@/lib/authStore";
import apiClient from "@/lib/api";

export default function FavoritesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchFavorites();
  }, [isAuthenticated]);

  const fetchFavorites = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch user's favorites
      const favResponse = await apiClient.get(`/users/${user.id}/favorites`);
      const favData = favResponse.data;
      setFavorites(favData);

      // Fetch all restaurants
      const resResponse = await apiClient.get("/restaurants");
      const allRestaurants = resResponse.data;

      // Filter to only favorite restaurants
      const favoriteRestaurantIds = favData.map(
        (fav: any) => fav.restaurant_id
      );
      const favoriteRestaurants = allRestaurants
        .filter((restaurant: any) =>
          favoriteRestaurantIds.includes(parseInt(restaurant.id))
        )
        .map((restaurant: any) => ({
          ...restaurant,
          id: parseInt(restaurant.id),
          rating: parseFloat(restaurant.rating),
          delivery_time: restaurant.delivery_time.toString().includes("-")
            ? parseInt(restaurant.delivery_time.split("-")[0])
            : parseInt(restaurant.delivery_time),
        }));

      setRestaurants(favoriteRestaurants);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 1 }}>
        My Favorites
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Your saved restaurants for quick access
      </Typography>

      {restaurants.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 2,
          }}
        >
          <FavoriteBorderIcon
            sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No favorites yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start exploring and add your favorite restaurants!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push("/restaurants")}
          >
            Browse Restaurants
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
              <RestaurantCard {...restaurant} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
