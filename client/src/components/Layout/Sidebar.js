import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import { Box, IconButton, Typography, useTheme } from '@mui/material';

import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { tokens } from '../../theme';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import { AuthContext } from '../../shared/context/auth-context';

import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
// import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
// import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState();

  const { isAdmin, isEngineer } = useContext(AuthContext);

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar width={200} collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {isAdmin && 'ADMIN'}
                  {isEngineer && 'Engineer'}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )} */}

          {isAdmin && (
            <Box paddingLeft={isCollapsed ? undefined : '10%'}>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px', textAlign: 'left' }}
              >
                البيانات
              </Typography>
              <Item
                title="الموظفين"
                to="/users"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="الأعطال"
                to="/repairs"
                icon={<BuildOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px', textAlign: 'left' }}
              >
                الصفحات
              </Typography>
              <Item
                title="أضف موظف"
                to="/add-user"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px', textAlign: 'left' }}
              >
                Charts
              </Typography>
              <Item
                title="Pie Chart"
                to="/pie-chart"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          )}

          {isEngineer && (
            <Box paddingLeft={isCollapsed ? undefined : '10%'}>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px', textAlign: 'left' }}
              >
                البيانات
              </Typography>
              <Item
                title="أعطالي"
                to="/my-repairs"
                icon={<BuildOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px', textAlign: 'left' }}
              >
                الصفحات
              </Typography>
              <Item
                title="طلب اصلاح"
                to="/ticket-form"
                icon={<BookOnlineIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
