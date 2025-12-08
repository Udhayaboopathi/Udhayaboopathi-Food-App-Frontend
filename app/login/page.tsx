/**
 * Login Page
 * User authentication
 */
"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}
    >
      <Paper
        elevation={3}
        sx={{ p: { xs: 2.5, sm: 3.5, md: 4 }, borderRadius: 3 }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          align="center"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Login to continue ordering delicious food
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              href="/register"
              style={{ color: "#FF6B35", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        <Box
          sx={{ mt: 2, p: 2, bgcolor: "background.default", borderRadius: 2 }}
        >
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            fontWeight={600}
          >
            Test Credentials:
          </Typography>
          <Typography variant="caption" display="block">
            Customer: john.doe@example.com / password123
          </Typography>
          <Typography variant="caption" display="block">
            Admin: admin@foodapp.com / admin123
          </Typography>
          <Typography variant="caption" display="block">
            Owner: owner.pizza@example.com / owner123
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
