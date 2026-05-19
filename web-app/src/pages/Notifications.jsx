import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
} from "@mui/material";

import Navbar from "../components/Navbar";
import api from "../api/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/customers/notifications");

      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error retrieving notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Notifications Inbox
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Paper elevation={3}>
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification._id} divider>
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  />

                  <Chip
                    label={notification.type}
                    color={
                      notification.type === "DISCOUNT"
                        ? "success"
                        : "primary"
                    }
                  />
                </ListItem>
              ))}

              {notifications.length === 0 && (
                <ListItem>
                  <ListItemText primary="No notifications available" />
                </ListItem>
              )}
            </List>
          </Paper>
        )}
      </Container>
    </>
  );
}

export default Notifications;