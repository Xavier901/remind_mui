/** @format */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await signIn(identifier, password);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.error?.message ||
          "Login failed. Check your credentials.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth='sm' sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <LockIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
          <Typography variant='h5' fontWeight={700}>
            Admin Login
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Sign in to manage your content
          </Typography>
        </Box>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            label='Email or Username'
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            fullWidth
            required
            margin='normal'
            autoFocus
          />
          <TextField
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin='normal'
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            size='large'
            disabled={submitting}
            sx={{ mt: 3, py: 1.5, fontWeight: 600 }}>
            {submitting ?
              <CircularProgress size={24} color='inherit' />
            : "Sign In"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
