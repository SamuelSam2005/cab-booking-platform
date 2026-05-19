import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Grid,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";

import Navbar from "../components/Navbar";
import api from "../api/api";

function Payments() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [payments, setPayments] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    bookingId: "",
    cabFare: 20,
    cabType: "Economic",
    bookingDateTime: "",
    passengers: 1,
    discount: 1,
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get(`/payments/user/${user.id}`);
      setPayments(response.data.payments);
    } catch {
      setError("Could not load payments.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createPayment = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await api.post("/payments", {
        userId: user.id,
        bookingId: formData.bookingId,
        cabFare: Number(formData.cabFare),
        cabType: formData.cabType,
        bookingDateTime: formData.bookingDateTime,
        passengers: Number(formData.passengers),
        discount: Number(formData.discount),
      });

      setSuccess("Payment completed successfully.");

      setFormData({
        bookingId: "",
        cabFare: 20,
        cabType: "Economic",
        bookingDateTime: "",
        passengers: 1,
        discount: 1,
      });

      fetchPayments();
    } catch (error) {
      setError(error.response?.data?.message || "Payment failed.");
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Payments
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Create Payment
          </Typography>

          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={createPayment}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Booking ID"
                  name="bookingId"
                  value={formData.bookingId}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Cab Fare"
                  name="cabFare"
                  value={formData.cabFare}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  select
                  label="Cab Type"
                  name="cabType"
                  value={formData.cabType}
                  onChange={handleChange}
                >
                  <MenuItem value="Economic">Economic</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Executive">Executive</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  type="datetime-local"
                  name="bookingDateTime"
                  value={formData.bookingDateTime}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Passengers"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  inputProps={{ min: 1, max: 8 }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Discount Multiplier"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Pay Booking
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Payment History
          </Typography>

          <List>
            {payments.map((payment) => (
              <ListItem key={payment._id} divider>
                <ListItemText
                  primary={`Booking: ${payment.bookingId}`}
                  secondary={`Total: €${payment.totalPrice} | Cab: ${payment.cabType} | Status: ${payment.status}`}
                />
              </ListItem>
            ))}

            {payments.length === 0 && (
              <ListItem>
                <ListItemText primary="No payments found" />
              </ListItem>
            )}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default Payments;