/**
 * Admin Restaurants Component
 * Manage all restaurants
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { apiClient } from "@/lib/api";

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
  owner_id: number | null;
  owner_name?: string | null;
  owner_email?: string | null;
}

export default function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    cuisine: "",
    rating: 0,
    thumbnail: "",
    delivery_time: 30,
    is_active: true,
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await apiClient.get("/admin/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (restaurant?: Restaurant) => {
    if (restaurant) {
      setEditingRestaurant(restaurant);
      setFormData({
        name: restaurant.name,
        city: restaurant.city,
        address: restaurant.address,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        thumbnail: restaurant.thumbnail,
        delivery_time: restaurant.delivery_time,
        is_active: restaurant.is_active,
      });
    } else {
      setEditingRestaurant(null);
      setFormData({
        name: "",
        city: "",
        address: "",
        cuisine: "",
        rating: 0,
        thumbnail: "",
        delivery_time: 30,
        is_active: true,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingRestaurant(null);
  };

  const handleSave = async () => {
    try {
      if (editingRestaurant) {
        await apiClient.put(`/restaurants/${editingRestaurant.id}`, formData);
      } else {
        await apiClient.post("/restaurants", formData);
      }
      fetchRestaurants();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this restaurant?")) return;

    try {
      await apiClient.delete(`/restaurants/${id}`);
      fetchRestaurants();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  if (loading) {
    return <Typography>Loading restaurants...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">All Restaurants</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Restaurant
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Cuisine</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Delivery Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.city}</TableCell>
                <TableCell>{restaurant.cuisine}</TableCell>
                <TableCell>{restaurant.rating.toFixed(1)}</TableCell>
                <TableCell>{restaurant.delivery_time} min</TableCell>
                <TableCell>
                  <Chip
                    label={restaurant.is_active ? "Active" : "Inactive"}
                    color={restaurant.is_active ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {restaurant.owner_name ? (
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {restaurant.owner_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {restaurant.owner_email}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      None
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(restaurant)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(restaurant.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingRestaurant ? "Edit Restaurant" : "Add Restaurant"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Restaurant Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Cuisine Type"
                value={formData.cuisine}
                onChange={(e) =>
                  setFormData({ ...formData, cuisine: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Rating"
                type="number"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: parseFloat(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Delivery Time (min)"
                type="number"
                value={formData.delivery_time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    delivery_time: parseInt(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_active: e.target.checked,
                      })
                    }
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
