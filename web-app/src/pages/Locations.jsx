import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Alert,
  Chip,
} from "@mui/material";

import Navbar from "../components/Navbar";
import api from "../api/api";

function Locations() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [locations, setLocations] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    label: "",
    address: "",
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await api.get(`/locations/user/${user.id}`);
      setLocations(response.data.locations);
    } catch (error) {
      console.error(error);
      setError("Could not load locations.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createLocation = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    try {
      await api.post("/locations", {
        userId: user.id,
        label: formData.label,
        address: formData.address,
      });

      setSuccess("Favourite location added successfully.");

      setFormData({
        label: "",
        address: "",
      });

      fetchLocations();
    } catch (error) {
      console.error(error);
      setError("Could not create location.");
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Favourite Locations
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add Favourite Location
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

          <form onSubmit={createLocation}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Label"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ height: "56px" }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Saved Locations
          </Typography>

          <List>
            {locations.map((location) => (
              <ListItem key={location._id} divider>
                <ListItemText
                  primary={location.label}
                  secondary={location.address}
                />

                <Chip
                  label="Favourite"
                  color="primary"
                />
              </ListItem>
            ))}

            {locations.length === 0 && (
              <ListItem>
                <ListItemText primary="No favourite locations saved" />
              </ListItem>
            )}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default Locations;