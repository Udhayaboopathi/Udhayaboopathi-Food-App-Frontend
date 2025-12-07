/**
 * User Profile Page
 * View and edit user profile information
 */
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  AccountBalanceWallet as WalletIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import ImageCropUpload from "@/components/ImageCropUpload";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [currentTab, setCurrentTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Profile data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Addresses
  const [addresses, setAddresses] = useState<any[]>([]);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    latitude: "",
    longitude: "",
  });

  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    type: "card",
    card_number: "",
    card_holder: "",
    expiry_month: "",
    expiry_year: "",
  });

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      fetchAddresses();
      fetchPaymentMethods();
    }
  }, [user, isAuthenticated, router]);

  const fetchAddresses = async () => {
    try {
      const response = await apiClient.get(`/users/${user!.id}/addresses`);
      setAddresses(response.data);
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await apiClient.get(
        `/users/${user!.id}/payment-methods`
      );
      setPaymentMethods(response.data);
    } catch (err) {
      console.error("Failed to fetch payment methods:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiClient.put(`/users/${user?.id}/profile`, formData);
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    try {
      const response = await apiClient.post(`/users/${user!.id}/addresses`, {
        ...newAddress,
        user_id: user!.id,
      });
      setAddresses([...addresses, response.data]);
      setAddressDialogOpen(false);
      setNewAddress({
        label: "Home",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        latitude: "",
        longitude: "",
      });
      setSuccess("Address added successfully!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to add address");
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await apiClient.delete(`/addresses/${addressId}`);
      setAddresses(addresses.filter((a) => a.id !== addressId));
      setSuccess("Address deleted successfully!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete address");
    }
  };

  const handleAddPayment = async () => {
    try {
      const paymentData = {
        user_id: user!.id,
        type: newPayment.type,
        card_number: newPayment.card_number,
        card_holder: newPayment.card_holder,
        expiry_month: newPayment.expiry_month,
        expiry_year: newPayment.expiry_year,
        last4: newPayment.card_number.slice(-4),
      };
      const response = await apiClient.post(
        `/users/${user!.id}/payment-methods`,
        paymentData
      );
      setPaymentMethods([...paymentMethods, response.data]);
      setPaymentDialogOpen(false);
      setNewPayment({
        type: "card",
        card_number: "",
        card_holder: "",
        expiry_month: "",
        expiry_year: "",
      });
      setSuccess("Payment method added successfully!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to add payment method");
    }
  };

  const handleDeletePayment = async (paymentId: string) => {
    try {
      await apiClient.delete(`/payment-methods/${paymentId}`);
      setPaymentMethods(paymentMethods.filter((p) => p.id !== paymentId));
      setSuccess("Payment method deleted successfully!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete payment method");
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      await apiClient.put(`/users/${user?.id}/password`, {
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword,
      });
      setPasswordSuccess("Password changed successfully!");
      setTimeout(() => {
        setPasswordDialogOpen(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }, 2000);
    } catch (err: any) {
      setPasswordError(
        err.response?.data?.detail || "Failed to change password"
      );
    }
  };

  if (!mounted) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={profileImage || undefined}
            sx={{ width: 100, height: 100, bgcolor: "primary.main" }}
          >
            {!profileImage && <PersonIcon sx={{ fontSize: 54 }} />}
          </Avatar>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "primary.main",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid white",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <ImageCropUpload
              uploadType="profile"
              aspectRatio={1}
              onImageUploaded={(url) => setProfileImage(url)}
              currentImage={profileImage}
              buttonText=""
              buttonVariant="text"
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            My Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account information
          </Typography>
        </Box>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleProfileUpdate}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                  helperText="Email cannot be changed"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Delivery Address"
                  name="address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => router.push("/")}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Account Type
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {user?.role?.toUpperCase() || "USER"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Account Status
              </Typography>
              <Typography variant="body1" fontWeight={600} color="success.main">
                {user?.is_active ? "Active" : "Inactive"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Security
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manage your password and account security
          </Typography>
          <Button
            variant="outlined"
            startIcon={<LockIcon />}
            onClick={() => setPasswordDialogOpen(true)}
          >
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Password Change Dialog */}
      <Dialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {passwordSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {passwordSuccess}
            </Alert>
          )}
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
