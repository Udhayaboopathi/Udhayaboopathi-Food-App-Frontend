/**
 * Review Section Component
 * Display and submit reviews for restaurants
 */
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  TextField,
  Card,
  CardContent,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
} from "@mui/material";
import { Add as AddIcon, Star as StarIcon } from "@mui/icons-material";
import { useAuthStore } from "@/lib/authStore";
import apiClient from "@/lib/api";
import { useRouter } from "next/navigation";

interface ReviewSectionProps {
  restaurantId: number;
}

export default function ReviewSection({ restaurantId }: ReviewSectionProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    fetchReviews();
  }, [restaurantId]);

  const fetchReviews = async () => {
    try {
      const response = await apiClient.get(
        `/restaurants/${restaurantId}/reviews`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!newReview.comment.trim()) {
      return;
    }

    try {
      await apiClient.post("/reviews", {
        user_id: user?.id,
        restaurant_id: restaurantId,
        rating: newReview.rating,
        comment: newReview.comment,
      });

      setDialogOpen(false);
      setNewReview({ rating: 5, comment: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Customer Reviews
          </Typography>
          {reviews.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating value={averageRating} precision={0.1} readOnly />
              <Typography variant="body1" fontWeight={600}>
                {averageRating.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </Typography>
            </Box>
          )}
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Write Review
        </Button>
      </Box>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <StarIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No reviews yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Be the first to share your experience!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {review.user_name?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {review.user_name || "Anonymous"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Review Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Rating
            </Typography>
            <Rating
              value={newReview.rating}
              onChange={(_, value) =>
                setNewReview({ ...newReview, rating: value || 5 })
              }
              size="large"
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Review"
              placeholder="Share your experience with this restaurant..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            disabled={!newReview.comment.trim()}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
