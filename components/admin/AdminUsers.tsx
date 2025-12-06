~(
  /**
   * Admin Users Component
   * Manage users and create restaurant owners
   */
  "use client"
);

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { apiClient } from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  restaurant_id: number | null;
  is_active: boolean;
}

interface Restaurant {
  id: number;
  name: string;
  owner_id: number | null;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editRestaurantId, setEditRestaurantId] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "ChangeMe@123",
    role: "owner",
    restaurant_id: "",
    address: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchRestaurants();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/admin/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await apiClient.get("/admin/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleOpenDialog = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "ChangeMe@123",
      role: "owner",
      restaurant_id: "",
      address: "",
    });
    setMessage(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateOwner = async () => {
    setMessage(null);

    try {
      // Step 1: Register the user
      const registerResponse = await apiClient.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address,
      });

      const userId = registerResponse.data.id;

      // Step 2: Update user role to owner via admin API
      await apiClient.put(`/admin/users/${userId}/role`, {
        role: "owner",
        restaurant_id: formData.restaurant_id
          ? parseInt(formData.restaurant_id)
          : null,
      });

      setMessage({
        type: "success",
        text: `Restaurant owner account created successfully! Email: ${formData.email}`,
      });

      // Refresh user list
      fetchUsers();

      // Clear form after success
      setTimeout(() => {
        handleCloseDialog();
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to create owner account",
      });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditRestaurantId(user.restaurant_id?.toString() || "");
    setEditDialogOpen(true);
  };

  const handleUpdateRestaurant = async () => {
    if (!editingUser) return;

    try {
      await apiClient.put(`/admin/users/${editingUser.id}/role`, {
        role: editingUser.role,
        restaurant_id: editRestaurantId ? parseInt(editRestaurantId) : null,
      });

      setMessage({
        type: "success",
        text: "User restaurant updated successfully!",
      });

      fetchUsers();
      setEditDialogOpen(false);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to update user",
      });
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (
      !confirm(
        `Are you sure you want to delete user: ${user.name} (${user.email})?`
      )
    ) {
      return;
    }

    try {
      await apiClient.delete(`/admin/users/${user.id}`);

      setMessage({
        type: "success",
        text: `User ${user.email} deleted successfully!`,
      });

      fetchUsers();

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.detail || "Failed to delete user",
      });
    }
  };
  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Create Owner Account
        </Button>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={
                        user.role === "admin"
                          ? "error"
                          : user.role === "owner"
                          ? "primary"
                          : "default"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {user.restaurant_id
                      ? restaurants.find((r) => r.id === user.restaurant_id)
                          ?.name || `ID: ${user.restaurant_id}`
                      : "None"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.is_active ? "Active" : "Inactive"}
                      color={user.is_active ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteUser(user)}
                      disabled={user.role === "admin"}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Use this panel to create restaurant owner accounts. After creation,
            owners can login and manage their assigned restaurant.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            <strong>Note:</strong> Default password is ChangeMe@123. Owners
            should change it after first login.
          </Typography>
        </CardContent>
      </Card>

      {/* Create Owner Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create Restaurant Owner</DialogTitle>
        <DialogContent>
          {message && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Owner Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                helperText="Default: ChangeMe@123 - Owner must change on first login"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Assign Restaurant (Optional)</InputLabel>
                <Select
                  value={formData.restaurant_id}
                  label="Assign Restaurant (Optional)"
                  onChange={(e) =>
                    setFormData({ ...formData, restaurant_id: e.target.value })
                  }
                >
                  <MenuItem value="">None - Assign Later</MenuItem>
                  {restaurants
                    .filter((restaurant) => !restaurant.owner_id)
                    .map((restaurant) => (
                      <MenuItem key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                Only unassigned restaurants are shown
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Alert severity="info">
                The owner will be able to login immediately and manage their
                assigned restaurant through the Owner Dashboard.
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateOwner} variant="contained">
            Create Owner
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Restaurant Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit User Restaurant</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="User Name"
                value={editingUser?.name || ""}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={editingUser?.email || ""}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                value={editingUser?.role || ""}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Assign Restaurant</InputLabel>
                <Select
                  value={editRestaurantId}
                  label="Assign Restaurant"
                  onChange={(e) => setEditRestaurantId(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  {restaurants
                    .filter(
                      (restaurant) =>
                        !restaurant.owner_id ||
                        restaurant.owner_id === editingUser?.id ||
                        restaurant.id === editingUser?.restaurant_id
                    )
                    .map((restaurant) => (
                      <MenuItem key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                        {restaurant.owner_id &&
                          restaurant.owner_id !== editingUser?.id &&
                          " (Owned)"}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Only restaurants without owners are available
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateRestaurant} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
