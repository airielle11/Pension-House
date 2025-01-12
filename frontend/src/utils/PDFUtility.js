import { StyleSheet } from "@react-pdf/renderer";
import { pdf, Document, Page, Text, View, Image } from "@react-pdf/renderer"; // Ensure these are imported for React-PDF

import logo from '../../../assets/images/penistock_logo.png'

// Styles for the PDF document
export const styles = StyleSheet.create({
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
      fontWeight: "bold",
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
  
  // Utility function to generate and download the PDF
  export const downloadPDF = async (formData, tempPassword) => {
    const { email, fname, lname } = formData;
    const currentDate = new Date().toISOString().split("T")[0];
    const fileName = `${fname} ${lname} ${currentDate}.pdf`;
  
    const PDFDocument = (
      <Document>
        <Page style={styles.page}>
          <View
            style={[
              styles.header,
              { flexDirection: "row", alignItems: "center", marginBottom: 10 },
            ]}
          >
            <Image src={logo} style={styles.logo} />
            <Text
              style={{
                marginLeft: 5,
                marginTop: -10,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              PeniStock
            </Text>
          </View>
          <Text style={styles.subtitle}>Employee Credentials</Text>
          <Text style={styles.text}>Date: {currentDate}</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCellHeader}>Email</Text>
              <Text style={[styles.tableCellHeader, styles.lastCell]}>
                Password
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{email}</Text>
              <Text style={[styles.tableCell, styles.lastCell]}>
                {tempPassword}
              </Text>
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