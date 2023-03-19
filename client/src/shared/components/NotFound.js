import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { Box, Button, Typography, useTheme } from '@mui/material';

import { AuthContext } from '../context/auth-context';
import { tokens } from '../../theme';

const NotFound = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { token, isEngineer, isAdmin } = useContext(AuthContext);

  const mainPageLink = isEngineer
    ? '/my-repairs'
    : isAdmin
    ? 'repairs'
    : 'ticket-form';

  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Typography fontWeight={'bold'} variant="h1">
        الصفحة المطلوبة غير متوفرة!
      </Typography>
      <Typography marginTop="2rem" fontWeight={'bold'} variant="h1">
        404
      </Typography>

      <Button
        component={Link}
        to={mainPageLink}
        variant="filled"
        size="large"
        sx={{
          marginTop: '2rem',
          color: '#fff',
          fontSize: '2.5rem',
          borderWidth: '5px',
          backgroundColor: colors.grey[500],
        }}
      >
        {token ? 'الصفحة الرئيسية' : 'تسجيل الدخول'}
      </Button>
    </Box>
  );
};

export default NotFound;
