import React, { useState } from "react";
import {
  Container,
  Card,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import MainCard from "../../components/MainCard";
import "./UserProfile.module.css";

const ProfileSettings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [generalInfo, setGeneralInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: "",
  });
  const [addressInfo, setAddressInfo] = useState({
    streetNumber: "",
    streetName: "",
    unitNumber: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [contactInfo, setContactInfo] = useState({
    email: "",
    contactNumber: "",
  });

  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const updateGeneralInfo = async () => {
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/update_general_info/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          p_new_fname: generalInfo.firstName,
          p_new_mname: generalInfo.middleName,
          p_new_lname: generalInfo.lastName,
          p_birthdate: generalInfo.birthdate,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("General information updated successfully!");
        setIsEditingGeneral(false);
      } else {
        alert('Error updating general information: ${data.error}');
      }
    } catch (error) {
      console.error("Error updating general information:", error);
    }
  };

  const updateAddressInfo = async () => {
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/update_address_info/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          p_st_no: addressInfo.streetNumber,
          p_st_name: addressInfo.streetName,
          p_unit_no: addressInfo.unitNumber,
          p_city: addressInfo.city,
          p_state: addressInfo.state,
          p_zip: addressInfo.zip,
          p_country: addressInfo.country,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Address information updated successfully!");
        setIsEditingAddress(false);
      } else {
        alert('Error updating address information: ${data.error}');
      }
    } catch (error) {
      console.error("Error updating address information:", error);
    }
  };

  const updateContactInfo = async () => {
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/update_contact_info/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contactInfo.email,
          contactNumber: contactInfo.contactNumber,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Contact information updated successfully!");
        setIsEditingContact(false);
      } else {
        alert('Error updating contact information: ${data.error}');
      }
    } catch (error) {
      console.error("Error updating contact information:", error);
    }
  };

  return (
    <MainCard>
      <Typography variant="h5" className="text-center">
        Profile Settings
      </Typography>
      <Grid className="text-center my-4">
        <Avatar
          alt="Default Profile Picture"
          src=""
          style={{ width: "100px", height: "100px", margin: "auto" }}
        />
        <Button variant="contained" component="label" className="mt-2">
          Change Picture
          <input hidden accept="image/*" type="file" />
        </Button>
      </Grid>
      <Card
        sx={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="General" />
          <Tab label="Address" />
          <Tab label="Contact" />
        </Tabs>

        {/* General Info Tab */}
        {tabIndex === 0 && (
          <Box p={3}>
            <Typography variant="h6">General Information</Typography>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={generalInfo.firstName}
              onChange={(e) =>
                setGeneralInfo({ ...generalInfo, firstName: e.target.value })
              }
              disabled={!isEditingGeneral}
            />
            <TextField
              label="Middle Name"
              fullWidth
              margin="normal"
              value={generalInfo.middleName}
              onChange={(e) =>
                setGeneralInfo({ ...generalInfo, middleName: e.target.value })
              }
              disabled={!isEditingGeneral}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={generalInfo.lastName}
              onChange={(e) =>
                setGeneralInfo({ ...generalInfo, lastName: e.target.value })
              }
              disabled={!isEditingGeneral}
            />
            <TextField
              label="Birthdate"
              type="date"
              fullWidth
              margin="normal"
              value={generalInfo.birthdate}
              onChange={(e) =>
                setGeneralInfo({ ...generalInfo, birthdate: e.target.value })
              }
              disabled={!isEditingGeneral}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className="saveBtn mt-3"
              onClick={() => {
                if (isEditingGeneral) updateGeneralInfo();
                else setIsEditingGeneral(true);
              }}
            >
              {isEditingGeneral ? "Save" : "Update"}
            </Button>
          </Box>
        )}

        {/* Address Info Tab */}
        {tabIndex === 1 && (
          <Box p={3}>
            <Typography variant="h6">Address Information</Typography>
            <TextField
              label="Street Number"
              fullWidth
              margin="normal"
              value={addressInfo.streetNumber}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, streetNumber: e.target.value })
              }
              disabled={!isEditingAddress}
            />
            <TextField
              label="Street Name"
              fullWidth
              margin="normal"
              value={addressInfo.streetName}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, streetName: e.target.value })
              }
              disabled={!isEditingAddress}
            />
            <TextField
              label="Unit Number"
              fullWidth
              margin="normal"
              value={addressInfo.unitNumber}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, unitNumber: e.target.value })
              }
              disabled={!isEditingAddress}
            />
            <TextField
              label="City"
              fullWidth
              margin="normal"
              value={addressInfo.city}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, city: e.target.value })
              }
              disabled={!isEditingAddress}
            />
            <TextField
              label="State"
              fullWidth
              margin="normal"
              value={addressInfo.state}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, state: e.target.value })
              }
              disabled={!isEditingAddress}
            />
            <TextField
              label="Zip Code"
              fullWidth
              margin="normal"
              value={addressInfo.zip}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, zip: e.target.value })
              }
              disabled={!isEditingAddress}
            />
            <TextField
              label="Country"
              fullWidth
              margin="normal"
              value={addressInfo.country}
              onChange={(e) =>
                setAddressInfo({ ...addressInfo, country: e.target.value })
              }
              disabled={!isEditingAddress}
            />
            <Button
              variant="contained"
              color="primary"
              className="saveBtn mt-3"
              onClick={() => {
                if (isEditingAddress) updateAddressInfo();
                else setIsEditingAddress(true);
              }}
            >
              {isEditingAddress ? "Save" : "Update"}
            </Button>
          </Box>
        )}

        {/* Contact Info Tab */}
        {tabIndex === 2 && (
          <Box p={3}>
            <Typography variant="h6">Contact Information</Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={contactInfo.email}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, email: e.target.value })
              }
              disabled={!isEditingContact}
            />
            <TextField
              label="Contact Number"
              fullWidth
              margin="normal"
              value={contactInfo.contactNumber}
              onChange={(e) =>
                setContactInfo({
                  ...contactInfo,
                  contactNumber: e.target.value,
                })
              }
              disabled={!isEditingContact}
            />
            <Button
              variant="contained"
              color="primary"
              className="saveBtn mt-3"
              onClick={() => {
                if (isEditingContact) updateContactInfo();
                else setIsEditingContact(true);
              }}
            >
              {isEditingContact ? "Save" : "Update"}
            </Button>
          </Box>
        )}
      </Card>
    </MainCard>
  );
};

export default ProfileSettings;