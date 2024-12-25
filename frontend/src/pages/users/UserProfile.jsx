// import styles from './UserProfile.module.css';
// import Swal from 'sweetalert2';

// import Grid from '@mui/material/Grid'

// function Button() {
//     return (
//         <>
//             <button
//             className={styles.button}
//             onClick={() =>
//                 Swal.fire({
//                     title: 'I am working!',
//                     text: 'This should cover the entire page.',
//                     customClass: {
//                         container: styles.swalContainer,  
//                     } 
//                 })
//             }
//         >
//             Profile
//         </button>

//         <Grid></Grid>
//         </>
         

         
//     ); 
// }

// export default Button;


import React, { useState } from "react";
import {
  Container,
  Card,
  Grid,
  Stack,
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

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // State for general info
  const [generalInfo, setGeneralInfo] = useState({
    firstName: "John",
    middleName: "D.",
    lastName: "Doe",
    birthdate: "1990-01-01",
  });

  const [isEditingGeneral, setIsEditingGeneral] = useState(false); 

  // State for password
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // State for contact info
  const [contactInfo, setContactInfo] = useState({
    email: "john.doe@example.com",
    contactNumber: "1234567890",
  });

  const [isEditingContact, setIsEditingContact] = useState(false);

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
        <Button
          variant="contained"
          component="label"
          className="mt-2"
        >
          Change Picture
          <input hidden accept="image/*" type="file" />
        </Button>
      </Grid>
      <Card sx={{
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",  
    borderRadius: "8px", 
  }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="General" />
          <Tab label="Contact" />
          <Tab label="Change Password" /> 
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
              sx={{ width: 50 }}
              onClick={() => setIsEditingGeneral(!isEditingGeneral)}
            >
              {isEditingGeneral ? "Save" : "Update"}
            </Button>  
            {isEditingGeneral && (
                <Button
                variant="contained"
                color="secondary"
                className="cancelBtn"
                sx={{ ml: 1, mt: 2, width: 50 }}
                onClick={() => setIsEditingGeneral(false)}
                >
                Cancel
                </Button>
            )}
              
          </Box>
        )}

        {/* Contact Info Tab */}
        {tabIndex === 1 && (
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
              className="mt-3"
              onClick={() => setIsEditingContact(!isEditingContact)}
            >
              {isEditingContact ? "Save" : "Edit"}
            </Button>
          </Box>
        )}

        {/* Change Password Tab */}
        {tabIndex === 2 && (
          <Box p={3}>
            <Typography variant="h6">Change Password</Typography>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              margin="normal"
              value={passwordInfo.currentPassword}
              onChange={(e) =>
                setPasswordInfo({
                  ...passwordInfo,
                  currentPassword: e.target.value,
                })
              }
              disabled={!isEditingPassword}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={passwordInfo.newPassword}
              onChange={(e) =>
                setPasswordInfo({ ...passwordInfo, newPassword: e.target.value })
              }
              disabled={!isEditingPassword}
            />
            <Button
              variant="contained"
              color="primary"
              className="mt-3"
              onClick={() => setIsEditingPassword(!isEditingPassword)}
            >
              {isEditingPassword ? "Save" : "Edit"}
            </Button>
          </Box>
        )}

      </Card>
    </MainCard>
  );
};

export default ProfileSettings;

