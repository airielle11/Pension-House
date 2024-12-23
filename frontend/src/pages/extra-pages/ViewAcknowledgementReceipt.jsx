// material-ui imports
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// project import
import MainCard from '../../components/MainCard.jsx';

// ==============================|| VIEW ACKNOWLEDGEMENT RECEIPT PAGE ||============================== //

export default function ViewAcknowledgementReceipt() {
  return (
    <MainCard title="View Acknowledgement Receipt">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          padding: 4,
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          maxWidth: 800,
          margin: '0 auto',
          marginTop: -3,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: 'primary.dark',
            marginBottom: 2,
            fontWeight: 600,
          }}
        >
          View Your Receipt
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            color: 'text.secondary',
            marginBottom: 2,
          }}
        >
          Below is the Acknowledgement Receipt you uploaded. You can download it for your records.
        </Typography>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'primary.main',
            borderRadius: 3,
            overflow: 'hidden',
            padding: 2,
          }}
        >
          {/* Placeholder for the receipt image or document */}
          <img
            src="https://via.placeholder.com/600x400" // Replace with dynamic source if needed
            alt="Acknowledgement Receipt"
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            sx={{
              padding: '12px 24px',
              fontSize: '16px',
              textTransform: 'none',
              borderRadius: 3,
              boxShadow: '0px 4px 10px rgba(20, 173, 214, 0.3)',
              backgroundImage: 'linear-gradient(to right, #14ADD6, #384295)', // Apply linear gradient
              '&:hover': {
                backgroundImage: 'linear-gradient(to right, #14ADD6, #384295)', // Maintain gradient on hover
                boxShadow: '0px 6px 14px rgba(20, 173, 214, 0.4)',
              },
            }}
            onClick={() => {
              // Trigger file download
              const link = document.createElement('a');
              link.href = 'https://example.com/acknowledgement-receipt.pdf'; // Replace with dynamic file URL
              link.download = 'AcknowledgementReceipt.pdf';
              link.click();
            }}
          >
            Download Receipt
          </Button>
        </Stack>
      </Box>
    </MainCard>
  );
}
