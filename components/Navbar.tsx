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
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { useCartStore } from "@/lib/cartStore";
import NotificationsPanel from "./NotificationsPanel";
import apiClient from "@/lib/api";

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated && user) {
      fetchUnreadCount();
    }
  }, [isAuthenticated, user]);

  const fetchUnreadCount = async () => {
    if (!user) return;
    try {
      const response = await apiClient.get(`/users/${user.id}/notifications`);
      const unread = response.data.filter((n: any) => !n.is_read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

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
          <ListItem button onClick={() => handleMobileMenuClick("/favorites")}>
            <ListItemText primary="Favorites" />
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
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: { xs: 56, sm: 64, md: 70 }, px: { xs: 1, sm: 2 } }}
          >
            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: { xs: 1, sm: 2 },
                display: { xs: "block", md: "none" },
                color: "primary.main",
                p: { xs: 1, sm: 1.5 },
                "&:hover": {
                  bgcolor: "rgba(255, 107, 53, 0.08)",
                },
              }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>

            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: { xs: "flex", md: "flex" },
                alignItems: "center",
                textDecoration: "none",
                mr: { xs: "auto", md: 2 },
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "1.1rem", sm: "1.5rem" },
                  background:
                    "linear-gradient(135deg, #FF6B35 0%, #264653 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
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
                sx={{
                  color: "text.primary",
                  mx: 1,
                  fontWeight: 600,
                  fontSize: "1rem",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 3,
                    bgcolor: "primary.main",
                    borderRadius: "2px 2px 0 0",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "80%",
                  },
                }}
              >
                Food
              </Button>
              <Button
                component={Link}
                href="/restaurants"
                sx={{
                  color: "text.primary",
                  mx: 1,
                  fontWeight: 600,
                  fontSize: "1rem",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 3,
                    bgcolor: "primary.main",
                    borderRadius: "2px 2px 0 0",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "80%",
                  },
                }}
              >
                Restaurants
              </Button>
              {user?.role === "admin" && (
                <Button
                  component={Link}
                  href="/admin"
                  sx={{
                    color: "text.primary",
                    mx: 1,
                    fontWeight: 600,
                    fontSize: "1rem",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 3,
                      bgcolor: "primary.main",
                      borderRadius: "2px 2px 0 0",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "80%",
                    },
                  }}
                >
                  Admin Panel
                </Button>
              )}
              {user?.role === "owner" && (
                <Button
                  component={Link}
                  href="/owner"
                  sx={{
                    color: "text.primary",
                    mx: 1,
                    fontWeight: 600,
                    fontSize: "1rem",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 3,
                      bgcolor: "primary.main",
                      borderRadius: "2px 2px 0 0",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "80%",
                    },
                  }}
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

            {/* Cart and Notifications Icons */}
            {isAuthenticated && (
              <IconButton
                onClick={() => setNotificationsOpen(true)}
                sx={{
                  mr: 1,
                  color: "primary.main",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(255, 107, 53, 0.08)",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Badge
                  badgeContent={unreadCount}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.7rem",
                      height: 18,
                      minWidth: 18,
                      fontWeight: 700,
                    },
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}

            <IconButton
              component={Link}
              href="/cart"
              sx={{
                mr: 2,
                color: "primary.main",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "rgba(255, 107, 53, 0.08)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <Badge
                badgeContent={mounted ? getItemCount() : 0}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.7rem",
                    height: 18,
                    minWidth: 18,
                    fontWeight: 700,
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* User Menu - Desktop Only */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isAuthenticated ? (
                <>
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={user?.profile_image || undefined}
                      sx={{ bgcolor: "secondary.main" }}
                    >
                      {!user?.profile_image &&
                        user?.name?.charAt(0).toUpperCase()}
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
                        router.push("/favorites");
                        handleClose();
                      }}
                    >
                      Favorites
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
                    src={user?.profile_image || undefined}
                    sx={{ bgcolor: "secondary.main", width: 32, height: 32 }}
                  >
                    {!user?.profile_image &&
                      user?.name?.charAt(0).toUpperCase()}
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
                        key="favorites"
                        onClick={() => {
                          router.push("/favorites");
                          handleClose();
                        }}
                      >
                        Favorites
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
      <NotificationsPanel
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
          fetchUnreadCount();
        }}
      />
    </>
  );
}
