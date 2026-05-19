import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import Navbar from "../components/Navbar";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.firstName}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">
                Customer Information
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography>
                  <strong>First Name:</strong> {user?.firstName}
                </Typography>

                <Typography>
                  <strong>Surname:</strong> {user?.surname}
                </Typography>

                <Typography>
                  <strong>Email:</strong> {user?.email}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">
                Platform Features
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography>• Cab Bookings</Typography>
                <Typography>• Payments</Typography>
                <Typography>• Favourite Locations</Typography>
                <Typography>• Weather Forecasts</Typography>
                <Typography>• Notifications Inbox</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;