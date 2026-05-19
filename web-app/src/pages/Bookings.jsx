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

function Bookings() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [estimatedFare, setEstimatedFare] = useState(null);

  const [formData, setFormData] = useState({
    startingLocation: "",
    endingLocation: "",
    bookingDateTime: "",
    passengers: 1,
    cabType: "Economic",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get(`/bookings/current/${user.id}`);
      setBookings(response.data.bookings);
    } catch (error) {
      console.error(error);
      setError("Could not load current bookings.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (
      e.target.name === "startingLocation" ||
      e.target.name === "endingLocation"
    ) {
      setEstimatedFare(null);
    }
  };

  const estimateFare = async () => {
    setError("");
    setSuccess("");

    if (!formData.startingLocation || !formData.endingLocation) {
      setError("Please enter both starting and ending locations first.");
      return;
    }

    try {
      const response = await api.post("/fares/estimate", {
        startingLocation: formData.startingLocation,
        endingLocation: formData.endingLocation,
      });

      setEstimatedFare(response.data.fare.estimatedFare);
      setSuccess(`Estimated fare: €${response.data.fare.estimatedFare}`);
    } catch (error) {
      console.error(error);
      setError("Could not estimate fare.");
    }
  };

  const createBooking = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const response = await api.post("/bookings", {
        userId: user.id,
        startingLocation: formData.startingLocation,
        endingLocation: formData.endingLocation,
        bookingDateTime: formData.bookingDateTime,
        passengers: Number(formData.passengers),
        cabType: formData.cabType,
      });

      const createdBooking = response.data.booking;

      localStorage.setItem("lastBookingId", createdBooking._id);
      localStorage.setItem("lastEstimatedFare", estimatedFare || 20);
      localStorage.setItem("lastCabType", createdBooking.cabType);
      localStorage.setItem(
        "lastBookingDateTime",
        createdBooking.bookingDateTime
      );
      localStorage.setItem("lastPassengers", createdBooking.passengers);

      await api.post("/events/cab-ready/schedule", {
        userId: user.id,
        bookingId: createdBooking._id,
        startingLocation: createdBooking.startingLocation,
        endingLocation: createdBooking.endingLocation,
        cabType: createdBooking.cabType,
      });

      setSuccess(
        "Booking created successfully. Cab ready notification scheduled."
      );

      setFormData({
        startingLocation: "",
        endingLocation: "",
        bookingDateTime: "",
        passengers: 1,
        cabType: "Economic",
      });

      setEstimatedFare(null);
      fetchBookings();
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Booking failed."
      );
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bookings
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Create Booking
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={createBooking}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Starting Location"
                  name="startingLocation"
                  value={formData.startingLocation}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Ending Location"
                  name="endingLocation"
                  value={formData.endingLocation}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  type="datetime-local"
                  name="bookingDateTime"
                  value={formData.bookingDateTime}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3}>
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

              {estimatedFare && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    Current estimated fare: €{estimatedFare}
                  </Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button variant="outlined" onClick={estimateFare} sx={{ mr: 2 }}>
                  Estimate Fare
                </Button>

                <Button type="submit" variant="contained">
                  Create Booking
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Current Bookings
          </Typography>

          <List>
            {bookings.map((booking) => (
              <ListItem key={booking._id} divider>
                <ListItemText
                  primary={`${booking.startingLocation} → ${booking.endingLocation}`}
                  secondary={`Booking ID: ${booking._id} | Cab: ${
                    booking.cabType
                  } | Passengers: ${booking.passengers} | Date: ${new Date(
                    booking.bookingDateTime
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))}

            {bookings.length === 0 && (
              <ListItem>
                <ListItemText primary="No current bookings" />
              </ListItem>
            )}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default Bookings;