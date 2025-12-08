/**
 * Search and Filter Component
 * Global search with advanced filters
 */
"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Drawer,
  Typography,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  cuisines: string[];
  priceRange: number[];
  rating: number;
  deliveryTime: number;
  dietary: string[];
  sortBy: string;
}

const cuisineTypes = [
  "Indian",
  "Chinese",
  "Italian",
  "Thai",
  "Mexican",
  "Japanese",
  "American",
  "Mediterranean",
  "BBQ",
];

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Non-Veg",
  "Gluten-Free",
  "Halal",
  "Jain",
];

export default function SearchFilters({
  onSearch,
  onFilterChange,
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    cuisines: [],
    priceRange: [0, 500],
    rating: 0,
    deliveryTime: 60,
    dietary: [],
    sortBy: "relevance",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleCuisineToggle = (cuisine: string) => {
    const newCuisines = filters.cuisines.includes(cuisine)
      ? filters.cuisines.filter((c) => c !== cuisine)
      : [...filters.cuisines, cuisine];
    const newFilters = { ...filters, cuisines: newCuisines };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDietaryToggle = (option: string) => {
    const newDietary = filters.dietary.includes(option)
      ? filters.dietary.filter((d) => d !== option)
      : [...filters.dietary, option];
    const newFilters = { ...filters, dietary: newDietary };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const newFilters = { ...filters, priceRange: newValue as number[] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: number) => {
    const newFilters = { ...filters, rating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterOptions = {
      cuisines: [],
      priceRange: [0, 500],
      rating: 0,
      deliveryTime: 60,
      dietary: [],
      sortBy: "relevance",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount =
    filters.cuisines.length +
    filters.dietary.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0);

  return (
    <Box>
      {/* Search Bar */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search restaurants, cuisines, or dishes..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearchQuery("");
                    onSearch("");
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          onClick={() => setFilterDrawerOpen(true)}
          sx={{
            minWidth: 120,
            borderRadius: 3,
            position: "relative",
          }}
        >
          Filters
          {activeFilterCount > 0 && (
            <Chip
              label={activeFilterCount}
              size="small"
              color="primary"
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                height: 20,
                minWidth: 20,
              }}
            />
          )}
        </Button>
      </Box>

      {/* Active Filters */}
      {(filters.cuisines.length > 0 || filters.dietary.length > 0) && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          {filters.cuisines.map((cuisine) => (
            <Chip
              key={cuisine}
              label={cuisine}
              onDelete={() => handleCuisineToggle(cuisine)}
              color="primary"
              variant="outlined"
            />
          ))}
          {filters.dietary.map((diet) => (
            <Chip
              key={diet}
              label={diet}
              onDelete={() => handleDietaryToggle(diet)}
              color="secondary"
              variant="outlined"
            />
          ))}
        </Box>
      )}

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
            p: 3,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Filters
          </Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Cuisines */}
        <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
            Cuisines
          </FormLabel>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {cuisineTypes.map((cuisine) => (
              <Chip
                key={cuisine}
                label={cuisine}
                onClick={() => handleCuisineToggle(cuisine)}
                color={
                  filters.cuisines.includes(cuisine) ? "primary" : "default"
                }
                variant={
                  filters.cuisines.includes(cuisine) ? "filled" : "outlined"
                }
              />
            ))}
          </Box>
        </FormControl>

        <Divider sx={{ mb: 3 }} />

        {/* Dietary Preferences */}
        <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
            Dietary Preferences
          </FormLabel>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {dietaryOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                onClick={() => handleDietaryToggle(option)}
                color={
                  filters.dietary.includes(option) ? "secondary" : "default"
                }
                variant={
                  filters.dietary.includes(option) ? "filled" : "outlined"
                }
              />
            ))}
          </Box>
        </FormControl>

        <Divider sx={{ mb: 3 }} />

        {/* Price Range */}
        <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
            Price Range
          </FormLabel>
          <Box sx={{ px: 1 }}>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              step={50}
              marks={[
                { value: 0, label: "₹0" },
                { value: 250, label: "₹250" },
                { value: 500, label: "₹500+" },
              ]}
            />
          </Box>
        </FormControl>

        <Divider sx={{ mb: 3 }} />

        {/* Rating */}
        <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
            Minimum Rating
          </FormLabel>
          <Box sx={{ display: "flex", gap: 1 }}>
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <Chip
                key={rating}
                label={`${rating}★+`}
                onClick={() => handleRatingChange(rating)}
                color={filters.rating === rating ? "primary" : "default"}
                variant={filters.rating === rating ? "filled" : "outlined"}
              />
            ))}
          </Box>
        </FormControl>

        <Divider sx={{ mb: 3 }} />

        {/* Sort By */}
        <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
            Sort By
          </FormLabel>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {[
              { value: "relevance", label: "Relevance" },
              { value: "rating", label: "Rating" },
              { value: "price-low", label: "Price: Low to High" },
              { value: "price-high", label: "Price: High to Low" },
              { value: "name", label: "Name (A-Z)" },
            ].map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                onClick={() => handleSortChange(option.value)}
                color={filters.sortBy === option.value ? "primary" : "default"}
                variant={
                  filters.sortBy === option.value ? "filled" : "outlined"
                }
              />
            ))}
          </Box>
        </FormControl>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={clearFilters}
            sx={{ borderRadius: 2 }}
          >
            Clear All
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setFilterDrawerOpen(false)}
            sx={{ borderRadius: 2 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
