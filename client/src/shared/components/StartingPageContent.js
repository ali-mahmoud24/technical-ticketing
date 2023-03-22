import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { Box, Button, useTheme } from '@mui/material';

import homepageImg from '../../assets/images/homepage.webp';

import { tokens } from '../../theme';
import { AuthContext } from '../context/auth-context';

const StartingPageContent = () => {
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 70px)',
        background: `linear-gradient(to left, ${colors.primary[500]}, rgba(0, 0, 0, 0.005)),
                    linear-gradient(to right, ${colors.primary[500]}, rgba(0, 0, 0, 0.005)), 
                    url(${homepageImg}) center/cover no-repeat`,
      }}
    >
      <Button
        component={Link}
        to={mainPageLink}
        variant="filled"
        size="large"
        sx={{
          color: colors.grey[100],
          fontSize: '3rem',
          border: `5px solid ${colors.grey[100]}`,
          textDecoration: 'none',
        }}
      >
        {token ? 'الصفحة الرئيسية' : 'تسجيل الدخول'}
      </Button>
    </Box>
  );
};

export default StartingPageContent;
