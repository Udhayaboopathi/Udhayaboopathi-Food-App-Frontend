/**
 * Restaurants Listing Page
 * Browse and filter restaurants
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import RestaurantCard from "@/components/RestaurantCard";
import SearchFilters, { FilterOptions } from "@/components/SearchFilters";
import apiClient from "@/lib/api";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [allRestaurants, setAllRestaurants] = useState<any[]>([]);
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
    fetchRestaurants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, allRestaurants]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/restaurants");

      // Convert CSV string data to proper types
      const processedRestaurants = response.data.map((restaurant: any) => {
        return {
          ...restaurant,
          id: parseInt(restaurant.id),
          rating: parseFloat(restaurant.rating),
          // Extract first number from delivery_time range (e.g., "25-35" -> 25)
          delivery_time: restaurant.delivery_time.toString().includes("-")
            ? parseInt(restaurant.delivery_time.split("-")[0])
            : parseInt(restaurant.delivery_time),
        };
      });

      setAllRestaurants(processedRestaurants);
      setRestaurants(processedRestaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allRestaurants];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (r: any) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Cuisine filter
    if (filters.cuisines.length > 0) {
      filtered = filtered.filter((r: any) =>
        filters.cuisines.some((cuisine) =>
          r.cuisine.toLowerCase().includes(cuisine.toLowerCase())
        )
      );
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((r: any) => r.rating >= filters.rating);
    }

    // Delivery time filter
    if (filters.deliveryTime < 60) {
      filtered = filtered.filter(
        (r: any) => r.delivery_time <= filters.deliveryTime
      );
    }

    // Sort
    filtered.sort((a: any, b: any) => {
      switch (filters.sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "delivery-time":
          return a.delivery_time - b.delivery_time;
        case "name":
          return a.name.localeCompare(b.name);
        default: // relevance
          return b.rating - a.rating;
      }
    });

    setRestaurants(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" }, mb: 3 }}
      >
        All Restaurants
      </Typography>

      {/* Search and Filters */}
      <SearchFilters
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      {/* Results */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: "0.875rem", sm: "0.95rem" },
            }}
          >
            {restaurants.length}{" "}
            {restaurants.length === 1 ? "restaurant" : "restaurants"} found
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {restaurants.map((restaurant: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
                <RestaurantCard {...restaurant} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {!loading && restaurants.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No restaurants found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your filters or search query
          </Typography>
        </Box>
      )}
    </Container>
  );
}
