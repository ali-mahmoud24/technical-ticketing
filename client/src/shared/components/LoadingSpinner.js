import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <CircularProgress size="7rem" sx={{ color: '#fff' }} />
    </Box>
  );
};

export default LoadingSpinner;
