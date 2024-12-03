import React, { useState } from "react";
import { TextField, Button, Grid, Typography, MenuItem, FormControl, Select } from "@mui/material";
import MainCard from "../../components/MainCard.jsx";

// ==============================|| Add Room and Room Type ||============================== //

export default function AddRoomAndType() {
  const [roomName, setRoomName] = useState(""); // Tracks room name input
  const [roomType, setRoomType] = useState(""); // Tracks room type selection
  const [newRoomType, setNewRoomType] = useState(""); // Tracks new room type input

  // Handle new room name change
  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  // Handle room type change (existing room types)
  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  // Handle new room type change (to add a new type)
  const handleNewRoomTypeChange = (event) => {
    setNewRoomType(event.target.value);
  };

  // Handle form submission for adding a new room
  const handleAddRoom = () => {
    alert(`Room Added: ${roomName} - Type: ${roomType}`);
    // Here you can add the logic to send the data to the backend or save it in your state
  };

  // Handle form submission for adding a new room type
  const handleAddRoomType = () => {
    alert(`New Room Type Added: ${newRoomType}`);
    // Here you can add the logic to send the new room type to your database or state
  };

  return (
    <MainCard title="Add New Room and Room Type">
      <Grid container spacing={3}>
        {/* Room Name Input */}
        <Grid item xs={9} md={5}>
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

        {/* Room Type Selection */}
        <Grid item xs={9} md={5}>
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
              {/* Add more predefined room types */}
            </Select>
          </FormControl>
        </Grid>

        {/* Add New Room Button */}
        <Grid item xs={9}>
          <Button
            variant="contained"
            onClick={handleAddRoom}
            style={{
              background: "linear-gradient(to right, #4facfe, #00f2fe)",
              color: "#fff",
              marginTop: "16px",
              width: "40%",
              textTransform: "none",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Add Room
          </Button>
        </Grid>

        {/* New Room Type Input */}
        <Grid item xs={9} md={5}>
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

        {/* Add New Room Type Button */}
        <Grid item xs={9}>
          <Button
            variant="contained"
            onClick={handleAddRoomType}
            style={{
              background: "linear-gradient(to right, #4facfe, #00f2fe)",
              color: "#fff",
              marginTop: "16px",
              width: "40%",
              textTransform: "none",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Add Room Type
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
