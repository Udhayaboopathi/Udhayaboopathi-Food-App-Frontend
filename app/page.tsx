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
      {/* Hero Section with Gradient */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #FF6B35 0%, #FF8A5C 50%, #264653 100%)",
          color: "white",
          py: { xs: 8, sm: 10, md: 14 },
          px: { xs: 2, sm: 3 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontSize: { xs: "2rem", sm: "3rem", md: "3.75rem" },
                fontWeight: { xs: 700, md: 800 },
                textShadow: "0 2px 20px rgba(0,0,0,0.2)",
                mb: { xs: 1.5, sm: 2 },
                lineHeight: 1.2,
              }}
            >
              Delicious Food,
              <br />
              Delivered Fast 🍔
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                mb: { xs: 3, sm: 4, md: 5 },
                opacity: 0.95,
                maxWidth: 600,
                mx: "auto",
                px: { xs: 2, sm: 0 },
                textShadow: "0 1px 10px rgba(0,0,0,0.15)",
              }}
            >
              Order from your favorite restaurants and enjoy fresh meals at your
              doorstep
            </Typography>

            {/* Modern Search Bar */}
            <Box
              sx={{
                maxWidth: 700,
                mx: "auto",
                px: { xs: 2, sm: 0 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1.5, sm: 2 },
                  flexDirection: { xs: "column", sm: "row" },
                  bgcolor: "white",
                  borderRadius: { xs: 3, sm: 4 },
                  p: { xs: 1.5, sm: 1 },
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search restaurants or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          color="action"
                          sx={{ fontSize: { xs: "1.4rem", sm: "1.5rem" } }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: "white",
                      borderRadius: { xs: 2, sm: 0 },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: { xs: "1px solid #e0e0e0", sm: "none" },
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: { xs: "primary.main", sm: "transparent" },
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: { xs: "primary.main", sm: "transparent" },
                        borderWidth: { xs: "2px", sm: "0" },
                      },
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      py: { xs: 0.5, sm: 0 },
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      minHeight: { xs: 50, sm: 56 },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSearch}
                  startIcon={
                    <SearchIcon sx={{ display: { xs: "none", sm: "block" } }} />
                  }
                  sx={{
                    minWidth: { xs: "100%", sm: 140 },
                    height: { xs: 50, sm: 56 },
                    fontSize: { xs: "1rem", sm: "1rem" },
                    fontWeight: 600,
                    borderRadius: { xs: 2, sm: 3 },
                    boxShadow: "none",
                    textTransform: "none",
                    "&:hover": {
                      boxShadow: "0 4px 16px rgba(255,107,53,0.4)",
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
            </Box>

            {/* Quick Action Buttons */}
            <Box
              sx={{
                mt: 5,
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
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
        sx={{ py: { xs: 6, sm: 8, md: 10 }, px: { xs: 2, sm: 3 } }}
      >
        <Box
          sx={{
            mb: { xs: 4, md: 6 },
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            gutterBottom
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              background: "linear-gradient(135deg, #FF6B35 0%, #264653 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Featured Restaurants
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Popular choices in your area
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {restaurants.map((restaurant: any) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <Box
                sx={{
                  height: "100%",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <RestaurantCard {...restaurant} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {restaurants.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 8, sm: 12 },
              px: 2,
            }}
          >
            <RestaurantIcon
              sx={{
                fontSize: { xs: 60, sm: 80 },
                color: "text.disabled",
                mb: 2,
                opacity: 0.5,
              }}
            />
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              No restaurants available yet
            </Typography>
          </Box>
        )}
      </Container>

      {/* Features Section */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 6, sm: 8, md: 12 },
          background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,107,53,0.3) 50%, transparent 100%)",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: "center" }}>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                background: "linear-gradient(135deg, #264653 0%, #FF6B35 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Why Choose Us?
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  background: "white",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 40px rgba(255,107,53,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 70, sm: 80 },
                    height: { xs: 70, sm: 80 },
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #FFE8E0 0%, #FFD4C4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3rem" },
                    }}
                  >
                    ⚡
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                  sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, mb: 2 }}
                >
                  Lightning Fast
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    lineHeight: 1.7,
                  }}
                >
                  Get your food delivered in 30 minutes or less with our
                  optimized delivery network
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  background: "white",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 40px rgba(255,107,53,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 70, sm: 80 },
                    height: { xs: 70, sm: 80 },
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #FFE8E0 0%, #FFD4C4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3rem" },
                    }}
                  >
                    🍽️
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                  sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, mb: 2 }}
                >
                  Wide Selection
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    lineHeight: 1.7,
                  }}
                >
                  Choose from hundreds of restaurants and cuisines to satisfy
                  every craving
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 3, sm: 4 },
                  borderRadius: 4,
                  background: "white",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 40px rgba(255,107,53,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 70, sm: 80 },
                    height: { xs: 70, sm: 80 },
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #FFE8E0 0%, #FFD4C4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3rem" },
                    }}
                  >
                    📱
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                  sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, mb: 2 }}
                >
                  Easy Tracking
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    lineHeight: 1.7,
                  }}
                >
                  Track your order in real-time from kitchen to doorstep with
                  live updates
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
