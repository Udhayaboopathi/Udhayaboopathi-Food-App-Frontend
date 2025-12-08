/**
 * Loyalty Points Component
 * Display points balance, rewards catalog, and redemption
 */
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  LinearProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Stars,
  CardGiftcard,
  LocalOffer,
  EmojiEvents,
  Check,
} from "@mui/icons-material";
import { apiClient } from "@/lib/api";

interface LoyaltyReward {
  id: number;
  name: string;
  description: string;
  points_required: number;
  type: "discount" | "freebie" | "cashback";
  value: number;
  icon: string;
}

interface LoyaltyPointsProps {
  userId?: number;
  variant?: "compact" | "full";
}

const mockRewards: LoyaltyReward[] = [
  {
    id: 1,
    name: "₹50 Off",
    description: "Get ₹50 off on orders above ₹299",
    points_required: 100,
    type: "discount",
    value: 50,
    icon: "💰",
  },
  {
    id: 2,
    name: "Free Delivery",
    description: "Free delivery on your next order",
    points_required: 150,
    type: "discount",
    value: 49,
    icon: "🚀",
  },
  {
    id: 3,
    name: "₹100 Off",
    description: "Get ₹100 off on orders above ₹499",
    points_required: 200,
    type: "discount",
    value: 100,
    icon: "🎁",
  },
  {
    id: 4,
    name: "Free Dessert",
    description: "Get a free dessert worth ₹149",
    points_required: 250,
    type: "freebie",
    value: 149,
    icon: "🍰",
  },
  {
    id: 5,
    name: "₹200 Off",
    description: "Get ₹200 off on orders above ₹799",
    points_required: 400,
    type: "discount",
    value: 200,
    icon: "💎",
  },
  {
    id: 6,
    name: "VIP Status",
    description: "Unlock VIP benefits for 30 days",
    points_required: 500,
    type: "freebie",
    value: 0,
    icon: "👑",
  },
];

export default function LoyaltyPoints({
  userId,
  variant = "compact",
}: LoyaltyPointsProps) {
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState("Bronze");
  const [nextTierPoints, setNextTierPoints] = useState(500);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);

  useEffect(() => {
    fetchLoyaltyData();
  }, [userId]);

  const fetchLoyaltyData = async () => {
    try {
      // Mock data - replace with actual API call
      setPoints(235);
      setTier(getTierFromPoints(235));
      setNextTierPoints(500);
    } catch (error) {
      console.error("Error fetching loyalty data:", error);
    }
  };

  const getTierFromPoints = (pts: number) => {
    if (pts >= 1000) return "Platinum";
    if (pts >= 500) return "Gold";
    if (pts >= 200) return "Silver";
    return "Bronze";
  };

  const getTierColor = (tierName: string) => {
    switch (tierName) {
      case "Platinum":
        return "#E5E4E2";
      case "Gold":
        return "#FFD700";
      case "Silver":
        return "#C0C0C0";
      default:
        return "#CD7F32";
    }
  };

  const handleRedeemReward = async (reward: LoyaltyReward) => {
    if (points < reward.points_required) {
      return;
    }

    try {
      // Mock redemption - replace with actual API call
      await apiClient.post("/loyalty/redeem", {
        reward_id: reward.id,
        points: reward.points_required,
      });

      setPoints(points - reward.points_required);
      setRedeemedRewards([...redeemedRewards, reward.id]);

      // Close dialog after successful redemption
      setTimeout(() => {
        setDialogOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Error redeeming reward:", error);
    }
  };

  const progress = (points / nextTierPoints) * 100;

  if (variant === "compact") {
    return (
      <>
        <Card
          sx={{
            background: `linear-gradient(135deg, ${getTierColor(
              tier
            )}20, ${getTierColor(tier)}40)`,
            borderRadius: 2,
            cursor: "pointer",
          }}
          onClick={() => setDialogOpen(true)}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Stars sx={{ fontSize: 40, color: getTierColor(tier) }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Loyalty Points
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {points} Points
              </Typography>
              <Chip label={tier} size="small" sx={{ mt: 0.5 }} />
            </Box>
            <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
              Redeem
            </Button>
          </CardContent>
        </Card>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmojiEvents sx={{ color: getTierColor(tier) }} />
              <Typography variant="h6" fontWeight={700}>
                Your Rewards
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            {/* Points Summary */}
            <Card sx={{ mb: 3, bgcolor: "primary.50" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight={700} color="primary">
                      {points}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Available Points
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Chip
                      label={`${tier} Tier`}
                      sx={{
                        bgcolor: getTierColor(tier),
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      {nextTierPoints - points} points to next tier
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>

            <Typography variant="h6" fontWeight={600} gutterBottom>
              Available Rewards
            </Typography>

            <Grid container spacing={2}>
              {mockRewards.map((reward) => {
                const canRedeem = points >= reward.points_required;
                const isRedeemed = redeemedRewards.includes(reward.id);

                return (
                  <Grid item xs={12} sm={6} key={reward.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        opacity: canRedeem ? 1 : 0.6,
                        position: "relative",
                        borderRadius: 2,
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2,
                          }}
                        >
                          <Typography variant="h3">{reward.icon}</Typography>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {reward.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {reward.description}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mt: 2,
                              }}
                            >
                              <Chip
                                icon={<Stars />}
                                label={`${reward.points_required} points`}
                                size="small"
                                color={canRedeem ? "primary" : "default"}
                              />
                              <Button
                                size="small"
                                variant={canRedeem ? "contained" : "outlined"}
                                disabled={!canRedeem || isRedeemed}
                                onClick={() => handleRedeemReward(reward)}
                                sx={{ borderRadius: 1.5 }}
                              >
                                {isRedeemed ? "Redeemed" : "Redeem"}
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* How to Earn */}
            <Typography variant="h6" fontWeight={600} gutterBottom>
              How to Earn Points
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Check color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Complete orders"
                  secondary="Earn 10 points for every ₹100 spent"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Check color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Leave reviews"
                  secondary="Earn 20 points for each review"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Check color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Refer friends"
                  secondary="Earn 100 points when they place first order"
                />
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Full variant for dedicated loyalty page
  return <Box>Full Loyalty Page (To be implemented)</Box>;
}
