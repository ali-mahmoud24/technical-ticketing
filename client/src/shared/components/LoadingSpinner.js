import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = ({ size = '7rem' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <CircularProgress size={size} sx={{ color: '#fff' }} />
    </Box>
  );
};

export default LoadingSpinner;
