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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import RestaurantCard from "@/components/RestaurantCard";
import apiClient from "@/lib/api";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, [searchQuery, cityFilter, cuisineFilter]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (cityFilter) params.append("city", cityFilter);
      if (cuisineFilter) params.append("cuisine", cuisineFilter);

      const response = await apiClient.get(`/restaurants?${params.toString()}`);

      // Convert CSV string data to proper types
      const processedRestaurants = response.data.map((restaurant: any) => {
        console.log("Restaurant data:", restaurant);
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

      setRestaurants(processedRestaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
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
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
      >
        All Restaurants
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                value={cityFilter}
                label="City"
                onChange={(e: any) => setCityFilter(e.target.value)}
              >
                <MenuItem value="">All Cities</MenuItem>
                <MenuItem value="New York">New York</MenuItem>
                <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                <MenuItem value="Chicago">Chicago</MenuItem>
                <MenuItem value="San Francisco">San Francisco</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Cuisine</InputLabel>
              <Select
                value={cuisineFilter}
                label="Cuisine"
                onChange={(e: any) => setCuisineFilter(e.target.value)}
              >
                <MenuItem value="">All Cuisines</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="American">American</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Results */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {restaurants.map((restaurant: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
              <RestaurantCard {...restaurant} />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && restaurants.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No restaurants found
          </Typography>
        </Box>
      )}
    </Container>
  );
}
