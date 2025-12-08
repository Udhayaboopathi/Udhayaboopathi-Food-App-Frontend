/**
 * Review Dialog Component
 * Rate and review restaurants and dishes after delivery
 */
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
  Typography,
  Divider,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { apiClient } from "@/lib/api";

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  orderId: number;
  restaurantId: number;
  restaurantName: string;
  items: Array<{
    id: number;
    name: string;
  }>;
}

export default function ReviewDialog({
  open,
  onClose,
  orderId,
  restaurantId,
  restaurantName,
  items,
}: ReviewDialogProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [foodRating, setFoodRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const quickTags = [
    "Great Food",
    "Fast Delivery",
    "Good Packaging",
    "Fresh Ingredients",
    "Value for Money",
    "Would Order Again",
    "Exceeded Expectations",
    "On Time",
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (overallRating === 0) {
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post("/reviews", {
        order_id: orderId,
        restaurant_id: restaurantId,
        overall_rating: overallRating,
        food_rating: foodRating,
        delivery_rating: deliveryRating,
        comment,
        tags: selectedTags,
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset form
        setOverallRating(0);
        setFoodRating(0);
        setDeliveryRating(0);
        setComment("");
        setSelectedTags([]);
        setSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight={700}>
          Rate Your Order
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurantName}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Thank you for your review!
          </Alert>
        )}

        {/* Overall Rating */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
            Overall Experience *
          </Typography>
          <Rating
            value={overallRating}
            onChange={(_, value) => setOverallRating(value || 0)}
            size="large"
            precision={0.5}
            icon={<Star fontSize="inherit" />}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Food Quality Rating */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Food Quality
            </Typography>
            <Rating
              value={foodRating}
              onChange={(_, value) => setFoodRating(value || 0)}
              size="small"
              precision={0.5}
            />
          </Box>
        </Box>

        {/* Delivery Rating */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Delivery Experience
            </Typography>
            <Rating
              value={deliveryRating}
              onChange={(_, value) => setDeliveryRating(value || 0)}
              size="small"
              precision={0.5}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Quick Tags */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
            Quick Tags (Optional)
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {quickTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagToggle(tag)}
                color={selectedTags.includes(tag) ? "primary" : "default"}
                variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                size="small"
              />
            ))}
          </Stack>
        </Box>

        {/* Comment */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Share your experience (Optional)"
          placeholder="What did you like or dislike?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
        />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          Your review will help others make better choices
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={overallRating === 0 || submitting}
          sx={{ borderRadius: 2 }}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
