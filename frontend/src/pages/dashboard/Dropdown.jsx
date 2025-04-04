import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import MainCard from "../../components/MainCard";

const RoomSelector = ({ setShowDashboard }) => {
  const handleBackToDashboard = () => {
    setShowDashboard(false); // Navigate back to the dashboard
  };

  // State for textboxes
  const [roomNumber, setRoomNumber] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [requisitionType, setRequisitionType] = useState("");

  // Loading and feedback state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // State for room options
  const [rooms, setRooms] = useState([]);
  const [fetchingRooms, setFetchingRooms] = useState(true);

  // State for priority levels
  const [priorityLevels, setPriorityLevels] = useState([]);
  const [fetchingPriorities, setFetchingPriorities] = useState(true);

  // Fetch Rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/get-rooms/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data.rooms || []);
        setFetchingRooms(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setMessage("Failed to load room data.");
        setFetchingRooms(false);
      }
    };

    fetchRooms();
  }, []);

  // Fetch Priority Levels
  useEffect(() => {
    const fetchPriorityLevels = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/get-priority-levels/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch priority levels");
        }
        const data = await response.json();
        setPriorityLevels(data.priority_levels || []);
        setFetchingPriorities(false);
      } catch (error) {
        console.error("Error fetching priority levels:", error);
        setMessage("Failed to load priority level data.");
        setFetchingPriorities(false);
      }
    };

    fetchPriorityLevels();
  }, []);

  // Handle Generate IRF
  const handleGenerateIRF = async () => {
    if (!roomNumber || !priorityLevel || !requisitionType) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Map "Item" to 1 and "Job" to 2 for requisition type
      const requisitionTypeMap = {
        Item: 1,
        Job: 2,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-requisition/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room_id: parseInt(roomNumber, 10),
            priority_id: parseInt(priorityLevel, 10),
            requisition_type: requisitionTypeMap[requisitionType], // Map to numeric value
          }),
        }
      );

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (response.ok) {
          setMessage("Requisition created successfully!");
        } else {
          setMessage(result.error || "Failed to create requisition.");
        }
      } else {
        const text = await response.text();
        setMessage(`Unexpected response: ${text}`);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard
      sx={{
        width: "1200px",
        maxWidth: "1200px",
        padding: "24px",
        margin: "0 auto",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
            Create Requisition Service
          </Typography>
        </Grid>

        {/* Room Number Dropdown */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Room ID</InputLabel>
            <Select
              value={roomNumber || ""}
              onChange={(e) => setRoomNumber(e.target.value)}
              label="Room ID"
            >
              {fetchingRooms ? (
                <MenuItem disabled>
                  <em>Loading...</em>
                </MenuItem>
              ) : rooms.length > 0 ? (
                rooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.room}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <em>No rooms available</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Priority Level Dropdown */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Priority Level</InputLabel>
            <Select
              value={priorityLevel || ""}
              onChange={(e) => setPriorityLevel(e.target.value)}
              label="Priority Level"
            >
              {fetchingPriorities ? (
                <MenuItem disabled>
                  <em>Loading...</em>
                </MenuItem>
              ) : priorityLevels.length > 0 ? (
                priorityLevels.map((priority) => (
                  <MenuItem key={priority.id} value={priority.id}>
                    {priority.priority_name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <em>No priorities available</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Requisition Type Dropdown */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Requisition Type</InputLabel>
            <Select
              value={requisitionType || ""}
              onChange={(e) => setRequisitionType(e.target.value)}
              label="Requisition Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Item">Item</MenuItem>
              <MenuItem value="Job">Job</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateIRF}
              disabled={loading}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Initial Request"}
            </Button>
            <Button onClick={handleBackToDashboard} variant="outlined">
              Back to Dashboard
            </Button>
          </Box>
        </Grid>

        {/* Feedback Message */}
        {message && (
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{
                color: message.includes("success") ? "green" : "red",
                textAlign: "center",
                mt: 2,
              }}
            >
              {message}
            </Typography>
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

export default RoomSelector;
