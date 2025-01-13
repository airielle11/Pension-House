// material-ui imports
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';

// project import
import MainCard from '../../components/MainCard.jsx';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePageTwo() {
  return (
    <MainCard title="Upload Acknowledgement Receipt">
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
          Upload Your Receipt
        </Typography>

        <Typography
          variant="body1"
          align="center"  
          sx={{
            color: 'text.secondary',
            marginBottom: 2,
          }}
        >
          Please upload your Acknowledgement Receipt below. Ensure the file is clear and in an acceptable format (e.g., JPG, PNG, or PDF).
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: 'text.secondary',
            marginBottom: 2,
          }}
        >
          File size limit: 2MB.
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Input
            type="file"
            inputProps={{ accept: 'image/*,application/pdf' }}
            sx={{
              display: 'none',
            }}
            id="upload-receipt"
          />
          <label htmlFor="upload-receipt">
            <Box
              sx={{
                width: 80,
                height: 80,
                backgroundColor: 'background.paper',
                border: '1px dashed',
                borderColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'primary.lighter',
                },
              }}
            >
              Upload
            </Box>
          </label>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            Drag and drop or click to upload your file.
          </Typography>
        </Stack>

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
            >
            Upload
        </Button>

      </Box>
    </MainCard>
  );
}