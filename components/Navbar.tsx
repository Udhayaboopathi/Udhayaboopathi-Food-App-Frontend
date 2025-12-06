/**
 * Navbar Component
 * Main navigation bar with cart, user menu, and search
 */
"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Restaurant as RestaurantIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { useCartStore } from "@/lib/cartStore";

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    router.push("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuClick = (path: string) => {
    setMobileOpen(false);
    router.push(path);
  };

  const mobileMenu = (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={700} color="primary.main">
          EatUpNow 🍔
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => handleMobileMenuClick("/food")}>
          <ListItemText primary="Food" />
        </ListItem>
        <ListItem button onClick={() => handleMobileMenuClick("/restaurants")}>
          <ListItemText primary="Restaurants" />
        </ListItem>
        {user?.role === "admin" && (
          <ListItem button onClick={() => handleMobileMenuClick("/admin")}>
            <ListItemText primary="Admin Panel" />
          </ListItem>
        )}
        {user?.role === "owner" && (
          <ListItem button onClick={() => handleMobileMenuClick("/owner")}>
            <ListItemText primary="Owner Dashboard" />
          </ListItem>
        )}
        {user?.role === "delivery" && (
          <ListItem button onClick={() => handleMobileMenuClick("/delivery")}>
            <ListItemText primary="Delivery Panel" />
          </ListItem>
        )}
      </List>
      <Divider />
      {isAuthenticated ? (
        <List>
          <ListItem button onClick={() => handleMobileMenuClick("/orders")}>
            <ListItemText primary="My Orders" />
          </ListItem>
          <ListItem button onClick={() => handleMobileMenuClick("/profile")}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem button onClick={() => handleMobileMenuClick("/login")}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => handleMobileMenuClick("/register")}>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      )}
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky" elevation={2} sx={{ backgroundColor: "white" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { xs: "block", md: "none" },
                color: "primary.main",
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                textDecoration: "none",
                mr: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                color="primary.main"
                sx={{ display: "flex", alignItems: "center" }}
              >
                🍔 EatUpNow
              </Typography>
            </Box>

            {/* Mobile Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                textDecoration: "none",
                flexGrow: 1,
              }}
            >
              <Typography variant="h6" fontWeight={700} color="primary.main">
                🍔 EatUpNow
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 4 }}
            >
              <Button
                component={Link}
                href="/food"
                sx={{ color: "text.primary", mx: 1 }}
              >
                Food
              </Button>
              <Button
                component={Link}
                href="/restaurants"
                sx={{ color: "text.primary", mx: 1 }}
              >
                Restaurants
              </Button>
              {user?.role === "admin" && (
                <Button
                  component={Link}
                  href="/admin"
                  sx={{ color: "text.primary", mx: 1 }}
                >
                  Admin Panel
                </Button>
              )}
              {user?.role === "owner" && (
                <Button
                  component={Link}
                  href="/owner"
                  sx={{ color: "text.primary", mx: 1 }}
                >
                  Owner Dashboard
                </Button>
              )}
              {user?.role === "delivery" && (
                <Button
                  component={Link}
                  href="/delivery"
                  sx={{ color: "text.primary", mx: 1 }}
                >
                  Delivery Panel
                </Button>
              )}
            </Box>

            {/* Cart Icon */}
            <IconButton
              component={Link}
              href="/cart"
              sx={{ mr: 2, color: "primary.main" }}
            >
              <Badge badgeContent={mounted ? getItemCount() : 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* User Menu - Desktop Only */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isAuthenticated ? (
                <>
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "secondary.main" }}>
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        router.push("/orders");
                        handleClose();
                      }}
                    >
                      My Orders
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push("/profile");
                        handleClose();
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    href="/login"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    Login
                  </Button>
                  <Button component={Link} href="/register" variant="contained">
                    Sign Up
                  </Button>
                </>
              )}
            </Box>

            {/* Mobile User Icon */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              {isAuthenticated && (
                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ bgcolor: "secondary.main", width: 32, height: 32 }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              )}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {isAuthenticated
                  ? [
                      <MenuItem
                        key="orders"
                        onClick={() => {
                          router.push("/orders");
                          handleClose();
                        }}
                      >
                        My Orders
                      </MenuItem>,
                      <MenuItem
                        key="profile"
                        onClick={() => {
                          router.push("/profile");
                          handleClose();
                        }}
                      >
                        Profile
                      </MenuItem>,
                      <MenuItem key="logout" onClick={handleLogout}>
                        Logout
                      </MenuItem>,
                    ]
                  : [
                      <MenuItem
                        key="login"
                        onClick={() => {
                          router.push("/login");
                          handleClose();
                        }}
                      >
                        Login
                      </MenuItem>,
                      <MenuItem
                        key="register"
                        onClick={() => {
                          router.push("/register");
                          handleClose();
                        }}
                      >
                        Sign Up
                      </MenuItem>,
                    ]}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {mobileMenu}
    </>
  );
}
