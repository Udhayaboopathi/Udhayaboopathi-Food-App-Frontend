/**
 * Food Page
 * Displays all menu items from all restaurants
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Restaurant as RestaurantIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useAuthStore } from "@/lib/authStore";
import { apiClient } from "@/lib/api";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  restaurant_id: number;
  restaurant?: {
    id: number;
    name: string;
    cuisine_type: string;
  };
}

export default function FoodPage() {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchAllMenuItems();
  }, []);

  const fetchAllMenuItems = async () => {
    try {
      setLoading(true);
      // Fetch all restaurants
      const restaurantsResponse = await apiClient.get("/restaurants");
      const restaurants = restaurantsResponse.data;

      // Fetch menu items for each restaurant
      const allMenuItems: MenuItem[] = [];
      for (const restaurant of restaurants) {
        const menuResponse = await apiClient.get(
          `/menu/restaurant/${restaurant.id}`
        );
        const items = menuResponse.data.map((item: MenuItem) => ({
          ...item,
          restaurant: {
            id: restaurant.id,
            name: restaurant.name,
            cuisine_type: restaurant.cuisine_type,
          },
        }));
        allMenuItems.push(...items);
      }

      setMenuItems(allMenuItems);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(allMenuItems.map((item) => item.category))
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurant_id: item.restaurant_id,
      restaurant_name: item.restaurant?.name || "",
    });
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurant?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory && item.is_available;
  });

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading menu items...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          All Food Items
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Browse delicious dishes from all our restaurants
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          label="Search food or restaurant"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 250 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredItems.length} items
      </Typography>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No items found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image_url || "/placeholder-food.jpg"}
                  alt={item.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {item.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    <RestaurantIcon fontSize="small" color="action" />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push(`/restaurants/${item.restaurant_id}`)
                      }
                    >
                      {item.restaurant?.name}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <Chip label={item.category} size="small" color="primary" />
                    {item.restaurant?.cuisine_type && (
                      <Chip
                        label={item.restaurant.cuisine_type}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography variant="h6" color="primary">
                    ${item.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
