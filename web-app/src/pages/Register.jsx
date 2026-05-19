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

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/customers/register", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />

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
            Register
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;