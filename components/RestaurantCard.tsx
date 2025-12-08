/**
 * Restaurant Card Component
 * Displays restaurant information in a card format
 */
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import apiClient from "@/lib/api";

interface RestaurantCardProps {
  id: number | string;
  name: string;
  cuisine: string;
  rating: number | string;
  delivery_time: number | string;
  thumbnail?: string;
  city: string;
}

export default function RestaurantCard({
  id,
  name,
  cuisine,
  rating,
  delivery_time,
  thumbnail,
  city,
}: RestaurantCardProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      checkFavoriteStatus();
    }
  }, [isAuthenticated, user]);

  const checkFavoriteStatus = async () => {
    if (!user) return;
    try {
      const response = await apiClient.get(`/users/${user.id}/favorites`);
      const favorites = response.data;
      setIsFavorite(favorites.some((fav: any) => fav.restaurant_id === id));
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // Prevent multiple rapid clicks
    if (isTogglingFavorite) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Optimistic UI update - change immediately
    const previousState = isFavorite;
    setIsFavorite(!isFavorite);
    setIsTogglingFavorite(true);

    try {
      if (previousState) {
        // Was favorite, now removing
        const response = await apiClient.get(`/users/${user?.id}/favorites`);
        const favorite = response.data.find(
          (fav: any) => fav.restaurant_id === id
        );
        if (favorite) {
          await apiClient.delete(`/favorites/${favorite.id}`);
        }
      } else {
        // Adding to favorites
        await apiClient.post(`/users/${user?.id}/favorites`, {
          restaurant_id: id,
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Revert on error
      setIsFavorite(previousState);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  // Convert rating and delivery_time to numbers (handles CSV strings)
  const numericRating =
    typeof rating === "string" ? parseFloat(rating) : rating;
  const numericDeliveryTime =
    typeof delivery_time === "string" ? parseInt(delivery_time) : delivery_time;

  const handleClick = () => {
    router.push(`/restaurant/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          "& .card-media": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      {/* Favorite Button */}
      <IconButton
        onClick={toggleFavorite}
        sx={{
          position: "absolute",
          top: { xs: 8, sm: 12 },
          right: { xs: 8, sm: 12 },
          bgcolor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          "&:hover": {
            bgcolor: "white",
            transform: "scale(1.1)",
          },
          zIndex: 1,
          transition: "all 0.2s ease",
        }}
      >
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: { xs: 180, sm: 200, md: 220 },
        }}
      >
        <CardMedia
          component="img"
          className="card-media"
          image={
            thumbnail ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"
          }
          alt={name}
          sx={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            transition: "transform 0.3s ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          noWrap
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
            mb: 1.5,
          }}
        >
          {name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <Rating
            value={numericRating}
            precision={0.1}
            size="small"
            readOnly
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              "& .MuiRating-iconFilled": {
                color: "#FFB800",
              },
            }}
          />
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              fontSize: { xs: "0.875rem", sm: "0.95rem" },
              color: "text.primary",
            }}
          >
            {numericRating.toFixed(1)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
          <Chip
            label={cuisine}
            size="small"
            sx={{
              bgcolor: "rgba(255, 107, 53, 0.1)",
              color: "primary.main",
              fontWeight: 600,
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              border: "none",
            }}
          />
          <Chip
            icon={
              <AccessTimeIcon sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} />
            }
            label={`${numericDeliveryTime} min`}
            size="small"
            sx={{
              bgcolor: "rgba(38, 70, 83, 0.08)",
              color: "text.secondary",
              fontWeight: 500,
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              border: "none",
            }}
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.8rem", sm: "0.85rem" },
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          📍 {city}
        </Typography>
      </CardContent>
    </Card>
  );
}
