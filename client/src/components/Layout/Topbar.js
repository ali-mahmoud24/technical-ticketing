import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { AuthContext } from '../../shared/context/auth-context';

const Topbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Box>
          <Button
            sx={{ fontSize: '0.9rem' }}
            component={Link}
            to={'/'}
            fullWidth
            variant="filled"
          >
            إدارة المعلومات و التكنولوجيا
          </Button>
        </Box>

        {/* LOGOUTBUTTON */}
        <Box display="flex">
          {token && (
            <Button
              sx={{ fontSize: '0.9rem' }}
              onClick={logout}
              fullWidth
              variant="filled"
              endIcon={<LogoutOutlinedIcon />}
            >
              تسجيل الخروج
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Topbar;
