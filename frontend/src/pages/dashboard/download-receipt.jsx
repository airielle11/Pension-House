import React from 'react';

const DownloadAcknowledgementReceipt = () => {
  const downloadReceipt = () => {
    // Path to the PDF file stored in the public folder
    const filePath = '/templates/AcknowledgementReceipt.pdf';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'AcknowledgementReceipt.pdf';
    link.click();
  };

  // Inline styles for the inner container and button
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    },
    card: {
      width: '400px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    heading: {
      marginBottom: '10px',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
    },
    paragraph: {
      marginBottom: '20px',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Download Receipt</h1>
        <p style={styles.paragraph}>Click the button below to download your Acknowledgement Receipt:</p>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={downloadReceipt}
        >
          Download Acknowledgement Receipt
        </button>
      </div>
    </div>
  );
};

export default DownloadAcknowledgementReceipt;