import React, { useState } from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack } from "@mui/system";
import Swal from "sweetalert2";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { pdf, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import style from '../Styles.module.css';
// import { downloadPDF } from "../../../utils/PDFUtility";

import logo from '../../../assets/images/penistock_logo.png'


export default function AddEmployeeForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    lname: "",
    mname: "",
    fname: "",
    birth_date: "",
    phone: "",
    hired_date: "",
    pos_id: "",
  });
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      email: "",
      lname: "",
      mname: "",
      fname: "",
      birth_date: "",
      phone: "",
      hired_date: "",
      pos_id: "",
    });
    setGeneratedPassword("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/add_employee/`, formData);
  
      if (response.status === 200) {
        const tempPassword = response.data.temp_password;
  
        // Automatically generate and download the PDF with the correct data
        downloadPDF({ ...formData }, tempPassword);
  
        Swal.fire({
          title: "Success!",
          text: response.data.message || `Temporary Password: ${tempPassword}`,
          icon: "success",
          customClass: {
            container: style.swalContainer,
          },
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) { 
            handleClose();
          }
        }); 
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message || "Failed to add employee. Please try again.",
          icon: "error",
          customClass: {
            container: style.swalContainer,
          },
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add employee. Please check your network connection and try again.",
        icon: "error",
        customClass: {
          container: style.swalContainer,
        },
      });
    } finally {
      setLoading(false);
    }
  }; 
  
  // Define the styles
  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    header: {
      alignItems: "center",
      marginBottom: 20,
    },
    logo: {
      width: 50,
      height: 50,
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 12,
      marginBottom: 7,
      fontWeight: "bold"
    },
    text: {
      fontSize: 10,
      marginBottom: 5,
    },
    table: {
      marginTop: 20,
      width: "100%",
      borderWidth: 1,
      borderColor: "#000",
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#f0f0f0",
      borderBottomWidth: 1,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCellHeader: {
      fontSize: 10,
      fontWeight: "bold",
      flex: 1,
      textAlign: "center",
      padding: 5,
      borderRightWidth: 1,
      borderColor: "#000",
    },
    tableCell: {
      fontSize: 10,
      flex: 1,
      textAlign: "center",
      padding: 5,
      borderRightWidth: 1,
      borderColor: "#000",
    },
    lastCell: {
      borderRightWidth: 0,
    },
  });
  
  // Function to generate and download the PDF
  const downloadPDF = async (formData, tempPassword) => {
    const { email, fname, lname } = formData;
    const currentDate = new Date().toISOString().split("T")[0];
    const fileName = `${fname} ${lname} ${currentDate}.pdf`;
  
    const PDFDocument = (
      <Document>
        <Page style={styles.page}>
          <View style={[styles.header, { flexDirection: "row", alignItems: "center", marginBottom: 10 }]}>
            <Image src={logo} style={styles.logo} />
            <Text style={{ marginLeft: 5, marginTop: -10, fontSize: 14, fontWeight: "bold" }}>PeniStock</Text>
          </View>
          <Text style={styles.subtitle}>Employee Credentials</Text>
          <Text style={styles.text}>Date: {currentDate}</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCellHeader}>Email</Text>
              <Text style={[styles.tableCellHeader, styles.lastCell]}>Password</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{email}</Text>
              <Text style={[styles.tableCell, styles.lastCell]}>{tempPassword}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  
    const blob = await pdf(PDFDocument).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
        <Button
          variant="contained"
          sx={{ borderRadius: "8px" }}
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={handleOpen}
        >
          Add Employee
        </Button>
      </Stack>

      {/* Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "35%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h5" mb={2}>
            Add New Employee
          </Typography>

          <form>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <TextField fullWidth label="Last Name" name="lname" value={formData.lname} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Middle Name" name="mname" value={formData.mname} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="First Name" name="fname" value={formData.fname} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Birth Date" name="birth_date" value={formData.birth_date} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} type="email" variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Contact Number" name="phone" value={formData.phone} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Hire Date" name="hired_date" value={formData.hired_date} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} />
              <TextField fullWidth label="Position ID" name="pos_id" value={formData.pos_id} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
            </div>

            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </Button>
              <Button sx={{ marginLeft: "10px" }} variant="contained" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
