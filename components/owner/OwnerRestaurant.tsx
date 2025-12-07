/**
 * Owner Restaurant Component
 * Manage restaurant details
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CardMedia,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { apiClient } from "@/lib/api";
import ImageCropUpload from "@/components/ImageCropUpload";

interface Restaurant {
  id: number;
  name: string;
  city: string;
  address: string;
  cuisine: string;
  rating: number;
  thumbnail: string;
  delivery_time: number;
  is_active: boolean;
}

export default function OwnerRestaurant() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const response = await apiClient.get("/owner/restaurant");
      setRestaurant(response.data);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to load restaurant",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!restaurant) return;

    setSaving(true);
    setMessage(null);

    try {
      const response = await apiClient.put("/owner/restaurant", {
        name: restaurant.name,
        city: restaurant.city,
        address: restaurant.address,
        cuisine: restaurant.cuisine,
        thumbnail: restaurant.thumbnail,
        delivery_time: restaurant.delivery_time,
        is_active: restaurant.is_active,
      });

      setRestaurant(response.data);
      setMessage({ type: "success", text: "Restaurant updated successfully!" });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to update restaurant",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Typography>Loading restaurant details...</Typography>;
  }

  if (!restaurant) {
    return (
      <Alert severity="warning">
        No restaurant assigned. Please contact support.
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Restaurant Information
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Restaurant Name"
              value={restaurant.name}
              onChange={(e) =>
                setRestaurant({ ...restaurant, name: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cuisine Type"
              value={restaurant.cuisine}
              onChange={(e) =>
                setRestaurant({ ...restaurant, cuisine: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              value={restaurant.city}
              onChange={(e) =>
                setRestaurant({ ...restaurant, city: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Delivery Time (minutes)"
              type="number"
              value={restaurant.delivery_time}
              onChange={(e) =>
                setRestaurant({
                  ...restaurant,
                  delivery_time: parseInt(e.target.value),
                })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={restaurant.address}
              onChange={(e) =>
                setRestaurant({ ...restaurant, address: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Restaurant Image
            </Typography>
            {restaurant.thumbnail && (
              <CardMedia
                component="img"
                image={restaurant.thumbnail}
                alt={restaurant.name}
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  height: 200,
                  objectFit: "cover",
                  mb: 2,
                  borderRadius: 1,
                }}
              />
            )}
            <ImageCropUpload
              uploadType="restaurant"
              aspectRatio={16 / 9}
              onImageUploaded={(url) =>
                setRestaurant({ ...restaurant, thumbnail: url })
              }
              currentImage={restaurant.thumbnail}
              buttonText="Upload Restaurant Image"
              buttonVariant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
