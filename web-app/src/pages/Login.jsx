import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "samuel@test.com",
    password: "Password123",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/customers/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
            Login
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }}>
          No account? <Link to="/register">Register here</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;