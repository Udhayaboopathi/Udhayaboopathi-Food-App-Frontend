/**
 * Menu Card Component
 * Displays menu item with add to cart functionality
 */
"use client";

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useCartStore, CartItem } from "@/lib/cartStore";

interface MenuCardProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  is_veg: boolean;
  restaurant_id: number;
  restaurant_name?: string;
}

export default function MenuCard({
  id,
  name,
  description,
  price,
  category,
  image,
  is_veg,
  restaurant_id,
  restaurant_name,
}: MenuCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();

  const cartItem = items.find((item: CartItem) => item.id === id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      quantity: 1,
      restaurant_id,
      restaurant_name,
      image,
      is_veg,
    };
    addItem(item);
  };

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(id, quantity - 1);
  };

  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {image && (
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: 140 },
            height: { xs: 160, sm: "auto" },
            objectFit: "cover",
          }}
          image={image}
          alt={name}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                border: `2px solid ${is_veg ? "#4CAF50" : "#F44336"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: is_veg ? "#4CAF50" : "#F44336",
                }}
              />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              {name}
            </Typography>
          </Box>

          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {description}
            </Typography>
          )}

          <Chip label={category} size="small" sx={{ mb: 1 }} />

          <Typography variant="h6" color="primary" fontWeight={700}>
            ${price.toFixed(2)}
          </Typography>
        </CardContent>

        <Box sx={{ p: 2, pt: 0 }}>
          {quantity === 0 ? (
            <Button
              variant="contained"
              fullWidth
              onClick={handleAdd}
              startIcon={<AddIcon />}
            >
              Add to Cart
            </Button>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                onClick={handleDecrement}
                color="primary"
                size="small"
                sx={{
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ minWidth: 30, textAlign: "center" }}
              >
                {quantity}
              </Typography>
              <IconButton
                onClick={handleIncrement}
                color="primary"
                size="small"
                sx={{
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
