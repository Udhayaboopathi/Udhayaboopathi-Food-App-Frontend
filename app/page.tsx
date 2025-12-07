/**
 * Homepage - Landing Page
 * Hero section with featured restaurants
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Restaurant as RestaurantIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import RestaurantCard from "@/components/RestaurantCard";
import apiClient from "@/lib/api";

export default function HomePage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFeaturedRestaurants();
  }, []);

  const fetchFeaturedRestaurants = async () => {
    try {
      const response = await apiClient.get("/restaurants?limit=6");

      // Convert CSV string data to proper types
      const processedRestaurants = response.data
        .slice(0, 6)
        .map((restaurant: any) => ({
          ...restaurant,
          id: parseInt(restaurant.id),
          rating: parseFloat(restaurant.rating),
          // Extract first number from delivery_time range (e.g., "25-35" -> 25)
          delivery_time: restaurant.delivery_time.toString().includes("-")
            ? parseInt(restaurant.delivery_time.split("-")[0])
            : parseInt(restaurant.delivery_time),
        }));

      setRestaurants(processedRestaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/restaurants");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FF6B35 0%, #264653 100%)",
          color: "white",
          py: { xs: 6, sm: 8, md: 12 },
          px: { xs: 2, sm: 3 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" } }}
            >
              Your Hunger, Handled Instantly 🍔
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                px: { xs: 1, sm: 2 },
              }}
            >
              Order from your favorite restaurants and get it delivered fast
            </Typography>

            {/* Search Bar */}
            <Box sx={{ maxWidth: 600, mx: "auto", px: { xs: 2, sm: 0 } }}>
              <TextField
                fullWidth
                placeholder="Search restaurants or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: "text.secondary",
                          display: { xs: "none", sm: "block" },
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Button
                      variant="contained"
                      onClick={handleSearch}
                      sx={{ display: { xs: "none", sm: "block" } }}
                    >
                      Search
                    </Button>
                  ),
                  sx: {
                    bgcolor: "white",
                    borderRadius: { xs: 2, sm: 3 },
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleSearch}
                sx={{
                  mt: 2,
                  display: { xs: "block", sm: "none" },
                  bgcolor: "white",
                  color: "primary.main",
                }}
              >
                Search
              </Button>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/restaurants")}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.25, sm: 1.5 },
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                Explore Restaurants
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Featured Restaurants */}
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}
      >
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
          >
            Featured Restaurants
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Popular choices in your area
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {restaurants.map((restaurant: any) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <RestaurantCard {...restaurant} />
            </Grid>
          ))}
        </Grid>

        {restaurants.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <RestaurantIcon
              sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
              No restaurants available yet
            </Typography>
          </Box>
        )}
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "background.paper", py: { xs: 4, sm: 6, md: 8 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ textAlign: "center", px: { xs: 2, sm: 0 } }}>
                <Typography
                  variant="h2"
                  color="primary.main"
                  fontWeight={700}
                  sx={{ fontSize: { xs: "3rem", sm: "4rem" } }}
                >
                  ⚡
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Lightning Fast
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Get your food delivered in 30 minutes or less
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ textAlign: "center", px: { xs: 2, sm: 0 } }}>
                <Typography
                  variant="h2"
                  color="primary.main"
                  fontWeight={700}
                  sx={{ fontSize: { xs: "3rem", sm: "4rem" } }}
                >
                  🍽️
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Wide Selection
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Choose from hundreds of restaurants and cuisines
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ textAlign: "center", px: { xs: 2, sm: 0 } }}>
                <Typography
                  variant="h2"
                  color="primary.main"
                  fontWeight={700}
                  sx={{ fontSize: { xs: "3rem", sm: "4rem" } }}
                >
                  📱
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  Easy Tracking
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  Track your order in real-time from kitchen to doorstep
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
