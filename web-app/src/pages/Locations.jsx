import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
  Chip,
  Stack,
} from "@mui/material";

import Navbar from "../components/Navbar";
import api from "../api/api";

function Locations() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [locations, setLocations] = useState([]);
  const [weatherResults, setWeatherResults] = useState({});

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
      const response = await api.get(`/locations/${user.id}`);
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

  const addLocation = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      await api.post("/locations", {
        userId: user.id,
        label: formData.label,
        address: formData.address,
      });

      setSuccess("Location added successfully.");

      setFormData({
        label: "",
        address: "",
      });

      fetchLocations();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Could not add location."
      );
    }
  };

  const getWeather = async (locationId) => {
    setError("");
    setSuccess("");

    try {
      const response = await api.get(
        `/locations/${locationId}/weather`
      );

      setWeatherResults({
        ...weatherResults,
        [locationId]: response.data.weather,
      });
    } catch (error) {
      console.error(error);
      setError("Could not load weather for this location.");
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

          <form onSubmit={addLocation}>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                label="Label"
                name="label"
                value={formData.label}
                onChange={handleChange}
              />

              <TextField
                required
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />

              <Button type="submit" variant="contained">
                Add
              </Button>
            </Stack>
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
                  secondary={
                    <>
                      <div>{location.address}</div>

                      {weatherResults[location._id] && (
                        <div style={{ marginTop: "8px" }}>
                          Weather:{" "}
                          {
                            weatherResults[location._id]
                              .condition
                          }
                          {" | "}
                          Temp:{" "}
                          {
                            weatherResults[location._id]
                              .temperatureCelsius
                          }
                          °C
                          {" | "}
                          Humidity:{" "}
                          {
                            weatherResults[location._id]
                              .humidity
                          }
                          %
                        </div>
                      )}
                    </>
                  }
                />

                <Button
                  variant="outlined"
                  sx={{ mr: 2 }}
                  onClick={() =>
                    getWeather(location._id)
                  }
                >
                  Get Weather
                </Button>

                <Chip
                  label="Favourite"
                  color="primary"
                />
              </ListItem>
            ))}

            {locations.length === 0 && (
              <ListItem>
                <ListItemText primary="No saved locations found." />
              </ListItem>
            )}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default Locations;