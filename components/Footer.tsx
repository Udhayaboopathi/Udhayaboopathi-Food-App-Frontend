/**
 * Footer Component
 * Site footer with links and information
 */
"use client";

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "secondary.main",
        color: "white",
        py: { xs: 4, sm: 5, md: 6 },
        px: { xs: 2, sm: 3 },
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              EatUpNow
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Your hunger, handled instantly. Fast food delivery from your
              favorite restaurants.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink
                component={Link}
                href="/restaurants"
                color="inherit"
                underline="hover"
              >
                Restaurants
              </MuiLink>
              <MuiLink
                component={Link}
                href="/orders"
                color="inherit"
                underline="hover"
              >
                My Orders
              </MuiLink>
              <MuiLink
                component={Link}
                href="/about"
                color="inherit"
                underline="hover"
              >
                About Us
              </MuiLink>
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink href="#" color="inherit" underline="hover">
                Help Center
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Contact Us
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Privacy Policy
              </MuiLink>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Follow Us
            </Typography>
            <Box>
              <IconButton sx={{ color: "white" }} aria-label="facebook">
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "white" }} aria-label="twitter">
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: "white" }} aria-label="instagram">
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "white" }} aria-label="linkedin">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} EatUpNow. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
