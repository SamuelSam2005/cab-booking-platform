import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Cab Booking Platform
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/bookings">Bookings</Button>
          <Button color="inherit" component={Link} to="/payments">Payments</Button>
          <Button color="inherit" component={Link} to="/locations">Locations</Button>
          <Button color="inherit" component={Link} to="/notifications">Inbox</Button>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;