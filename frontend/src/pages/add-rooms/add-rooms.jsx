import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import MainCard from "../../components/MainCard.jsx";

export default function AddRoomAndType() {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [newRoomType, setNewRoomType] = useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  const handleNewRoomTypeChange = (event) => {
    setNewRoomType(event.target.value);
  };

  const handleAddRoom = () => {
    alert(`Room Added: ${roomName} - Type: ${roomType}`);
  };

  const handleAddRoomType = () => {
    alert(`New Room Type Added: ${newRoomType}`);
  };

  return (
    <MainCard title="Add New Room and Room Type">
      <Grid container spacing={2} alignItems="center">
        {/* Room Name Input */}
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" gutterBottom>
            Room Name
          </Typography>
          <TextField
            value={roomName}
            onChange={handleRoomNameChange}
            fullWidth
            label="Enter Room Name"
            variant="outlined"
          />
        </Grid>
        {/* Room Type Dropdown */}
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" gutterBottom>
            Select Room Type
          </Typography>
          <FormControl fullWidth variant="outlined">
            <Select
              value={roomType}
              onChange={handleRoomTypeChange}
              displayEmpty
              inputProps={{
                "aria-label": "Room Type",
              }}
            >
              <MenuItem value="" disabled>
                Select Room Type
              </MenuItem>
              <MenuItem value="Conference Room">Conference Room</MenuItem>
              <MenuItem value="Meeting Room">Meeting Room</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Storage">Storage</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Add Room Button */}
        <Grid item xs={12} sm={3}>
          <br />
          <br />
          <Button
            variant="contained"
            onClick={handleAddRoom}
            fullWidth
            sx={{
              background: "linear-gradient(to right, #4facfe, #00f2fe)",
              color: "#fff",
              height: "50px", // Set the height to be the same for both buttons
              textTransform: "none",
            }}
          >
            Add Room
          </Button>
        </Grid>
        {/* New Room Type Input and Button */}
        <Grid item container xs={12} sm={8} spacing={2}>
          <Grid item xs={6} sm={8}>
            <Typography variant="body2" gutterBottom>
              New Room Type
            </Typography>
            <TextField
              value={newRoomType}
              onChange={handleNewRoomTypeChange}
              fullWidth
              label="Enter New Room Type"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <br />
            <Button
              variant="contained"
              onClick={handleAddRoomType}
              fullWidth
              sx={{
                background: "linear-gradient(to right, #4facfe, #00f2fe)",
                color: "#fff",
                height: "50px", // Set the height to be the same for both buttons
                textTransform: "none",
              }}
            >
              Add Room Type
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
}
