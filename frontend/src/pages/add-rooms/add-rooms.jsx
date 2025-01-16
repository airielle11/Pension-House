import React, { useState, useEffect } from "react";
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
import axios from "axios"; // Import axios for backend API requests
import Swal from "sweetalert2"; // Import SweetAlert

export default function AddRoomAndType() {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [newRoomType, setNewRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([]); // State to store room types

  const handleRoomNameChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) { // Allow only integer values
      setRoomName(value);
    }
  };

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  const handleNewRoomTypeChange = (event) => {
    setNewRoomType(event.target.value);
  };

  // Fetch room types from the backend
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-room-types/");
        if (response.data.status === "success") {
          setRoomTypes(response.data.data);
        } else {
          Swal.fire("Error", "Failed to fetch room types", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Error fetching room types. Please try again.", "error");
      }
    };

    fetchRoomTypes();
  }, []); // Runs only once when the component mounts

  // Connect to backend for adding a new room
  const handleAddRoom = async () => {
    try {
      const response = await axios.post("http://localhost:8000/add-new-room/", {
        room_number: roomName,
        room_type_id: roomType,
      });
      Swal.fire("Success", response.data.message || "Room added successfully!", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to add the room. Try again.",
        "error"
      );
    }
  };

  // Connect to backend for adding a new room type
  const handleAddRoomType = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/add-new-room-type/",
        {
          room_type_name: newRoomType,
        }
      );
      Swal.fire("Success", response.data.message || "Room type added successfully!", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to add the room type. Try again.",
        "error"
      );
    }
  };

  return (
    <MainCard title="Add New Room and Room Type">
      <Grid container spacing={2} alignItems="center">
        {/* Room Name Input */}
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" gutterBottom>
            Room Number
          </Typography>
          <TextField
            value={roomName}
            onChange={handleRoomNameChange}
            fullWidth
            label="Enter Room Number"
            variant="outlined"
            inputProps={{
              inputMode: "numeric",
              pattern: "\\d*",
            }}
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
              {roomTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.room_type}
                </MenuItem>
              ))}
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
              Add New Room Type
            </Typography>
            <TextField
              value={newRoomType}
              onChange={handleNewRoomTypeChange}
              fullWidth
              label="Add New Room Type"
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
