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
  Box,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useAuthStore } from "@/lib/authStore";
import { apiClient } from "@/lib/api";
import MenuCard from "@/components/MenuCard";
import SearchFilters, { FilterOptions } from "@/components/SearchFilters";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  is_veg?: boolean;
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
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    cuisines: [],
    priceRange: [0, 500],
    rating: 0,
    deliveryTime: 60,
    dietary: [],
    sortBy: "relevance",
  });

  useEffect(() => {
    fetchAllMenuItems();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, allMenuItems]);

  const fetchAllMenuItems = async () => {
    try {
      setLoading(true);
      // Fetch all menu items directly
      const menuResponse = await apiClient.get("/menu");
      const allItems = menuResponse.data;

      // Fetch restaurants to map names
      const restaurantsResponse = await apiClient.get("/restaurants");
      const restaurants = restaurantsResponse.data;

      // Create restaurant lookup map
      const restaurantMap = restaurants.reduce((acc: any, r: any) => {
        acc[r.id] = { id: r.id, name: r.name, cuisine_type: r.cuisine };
        return acc;
      }, {});

      // Map restaurant data to menu items
      const itemsWithRestaurant = allItems.map((item: any) => ({
        ...item,
        id: parseInt(item.id),
        price: parseFloat(item.price),
        restaurant_id: parseInt(item.restaurant_id),
        image_url: item.image,
        is_veg: item.is_veg === "true" || item.is_veg === true,
        is_available:
          item.is_available === "true" || item.is_available === true,
        restaurant: restaurantMap[item.restaurant_id] || {
          id: item.restaurant_id,
          name: "Unknown",
          cuisine_type: "",
        },
      }));

      setAllMenuItems(itemsWithRestaurant);
      setMenuItems(itemsWithRestaurant);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allMenuItems];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.restaurant?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Cuisine filter (based on restaurant cuisine or item category)
    if (filters.cuisines.length > 0) {
      filtered = filtered.filter((item) =>
        filters.cuisines.some(
          (cuisine) =>
            item.restaurant?.cuisine_type
              ?.toLowerCase()
              .includes(cuisine.toLowerCase()) ||
            item.category.toLowerCase().includes(cuisine.toLowerCase())
        )
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (item) =>
        item.price >= filters.priceRange[0] &&
        item.price <= filters.priceRange[1]
    );

    // Dietary filter
    if (filters.dietary.length > 0) {
      filtered = filtered.filter((item) => {
        if (filters.dietary.includes("Vegetarian") && item.is_veg) return true;
        if (filters.dietary.includes("Non-Veg") && !item.is_veg) return true;
        // Other dietary options can be added based on item properties
        return false;
      });
    }

    // Only show available items
    filtered = filtered.filter((item) => item.is_available);

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default: // relevance
          return a.name.localeCompare(b.name);
      }
    });

    setMenuItems(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
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
      image: item.image_url,
      is_veg: item.is_veg || false,
    });
  };

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
    <Container
      maxWidth="xl"
      sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
    >
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight={700}
          sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" } }}
        >
          All Food Items
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Browse delicious dishes from all our restaurants
        </Typography>
      </Box>

      {/* Search and Filters */}
      <SearchFilters
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      {/* Results Count */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: { xs: 1.5, sm: 2 },
          fontSize: { xs: "0.875rem", sm: "0.95rem" },
        }}
      >
        {menuItems.length} {menuItems.length === 1 ? "item" : "items"} found
      </Typography>

      {/* Menu Items Grid */}
      {menuItems.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No items found matching your filters
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your filters or search query
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <MenuCard
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                category={item.category}
                image={item.image_url}
                is_veg={item.is_veg}
                restaurant_id={item.restaurant_id}
                restaurant_name={item.restaurant?.name || ""}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
