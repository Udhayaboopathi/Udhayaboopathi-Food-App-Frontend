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
  const [imageError, setImageError] = React.useState(false);

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

  const showImage = image && !imageError;

  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {showImage && (
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: 200,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            src={image}
            alt={name}
            onError={() => setImageError(true)}
          />
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 1,
              p: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                border: `2px solid ${is_veg ? "#4CAF50" : "#F44336"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0.5,
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
          </Box>
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto", p: 2 }}>
          {!showImage && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  border: `2px solid ${is_veg ? "#4CAF50" : "#F44336"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 0.5,
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
            </Box>
          )}

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: "1rem",
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {name}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                fontSize: "0.875rem",
                lineHeight: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          )}

          <Chip
            label={category}
            size="small"
            sx={{
              mb: 1.5,
              bgcolor: "rgba(38, 70, 83, 0.08)",
              color: "text.secondary",
              fontWeight: 500,
              fontSize: "0.75rem",
              border: "none",
            }}
          />

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: "1.25rem",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8A5C 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ₹{price.toFixed(2)}
          </Typography>
        </CardContent>

        <Box sx={{ p: 2, pt: 0 }}>
          {quantity === 0 ? (
            <Button
              variant="contained"
              fullWidth
              onClick={handleAdd}
              startIcon={<AddIcon />}
              sx={{
                py: 1,
                fontSize: "0.95rem",
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(255,107,53,0.25)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(255,107,53,0.35)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                bgcolor: "rgba(255,107,53,0.08)",
                borderRadius: 2,
                p: 1,
              }}
            >
              <IconButton
                onClick={handleDecrement}
                size="small"
                sx={{
                  bgcolor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    bgcolor: "white",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <RemoveIcon sx={{ color: "primary.main" }} />
              </IconButton>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  minWidth: 40,
                  textAlign: "center",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                {quantity}
              </Typography>
              <IconButton
                onClick={handleIncrement}
                size="small"
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  boxShadow: "0 2px 8px rgba(255,107,53,0.3)",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "scale(1.1)",
                  },
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
