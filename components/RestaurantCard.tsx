/**
 * Restaurant Card Component
 * Displays restaurant information in a card format
 */
"use client";

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
} from "@mui/material";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";

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
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: { xs: "none", sm: "translateY(-4px)" },
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          thumbnail ||
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"
        }
        alt={name}
        sx={{
          objectFit: "cover",
          height: { xs: 160, sm: 180, md: 200 },
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          noWrap
          sx={{ fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" } }}
        >
          {name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
            mb: 1,
          }}
        >
          <Rating
            value={numericRating}
            precision={0.1}
            size="small"
            readOnly
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            {numericRating.toFixed(1)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
          <Chip
            label={cuisine}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={`${numericDeliveryTime} min`}
            size="small"
            variant="outlined"
          />
        </Box>

        <Typography variant="caption" color="text.secondary">
          {city}
        </Typography>
      </CardContent>
    </Card>
  );
}
