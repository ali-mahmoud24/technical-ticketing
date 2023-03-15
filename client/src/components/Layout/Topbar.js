import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, IconButton, useTheme } from '@mui/material';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import { ColorModeContext } from '../../theme';
import { AuthContext } from '../../shared/context/auth-context';

const Topbar = () => {
  const { token, logout } = useContext(AuthContext);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1.5}
      >
        <Box sx={{ paddingLeft: '2rem' }}>
          <Button component={Link} to={'/'} fullWidth variant="filled">
            قسم المعلومات و التكنولوجيا
          </Button>
        </Box>

        {/* ICONS */}
        <Box display="flex">
          {token && (
            <Button
              onClick={logout}
              fullWidth
              variant="filled"
              endIcon={<LogoutOutlinedIcon />}
            >
              تسجبل الخروج
            </Button>
          )}
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Topbar;
