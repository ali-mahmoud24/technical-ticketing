import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../theme';

import homepageImg from '../assets/images/homepage.jpg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 61px)',
        background: `linear-gradient(${colors.blueAccent[300]}, rgba(0, 0, 0, 0.7)),
        url(${homepageImg}) center/cover no-repeat`,
      }}
    >
      <Button
        component={Link}
        to={mainPageLink}
        variant="outlined"
        size="large"
        sx={{ fontSize: '3rem', borderWidth: '5px', textDecoration: 'none' }}
      >
        {token ? 'الصفحة الرئيسية' : 'تسجيل الدخول'}
      </Button>
    </Box>
  );
};

export default StartingPageContent;
