import axios from 'axios';

import { useEffect, useState } from 'react';

import { Box, Typography, useTheme } from '@mui/material';
import {
  arSD,
  DataGrid,
  GridFooter,
  GridFooterContainer,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { EngineeringOutlined } from '@mui/icons-material';

import { tokens } from '../../theme';

import Header from '../Layout/Header';
import UserActions from './UserActions';

const UsersDatagrid = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState([]);

  const deleteUserHandler = async (deletedUserId) => {
    setLoadedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deletedUserId)
    );
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/users`
        );

        if (response.status === 200) {
          setLoadedUsers(response.data.users);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    getAllUsers();
  }, []);

  const usersData = loadedUsers.map((user) => ({
    id: user._id,
    fullName: `${user.firstName} ${user.secondName}`,
    userName: user.userName,
    userCode: user.userCode,
    specialization: user.specialization,
    access: user.isAdmin ? 'Admin' : user.isEngineer ? 'Engineer' : 'User',
  }));

  const columns = [
    {
      field: 'fullName',
      headerName: 'اسم المستخدم',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'userName',
      headerName: 'اسم المشغل',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'userCode',
      headerName: 'كود المشغل',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'specialization',
      headerName: 'التخصص',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: ({ row: { specialization } }) => specialization || '---',
    },
    {
      field: 'access',
      headerName: 'نوع المستخدم',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === 'Admin'
                ? colors.greenAccent[600]
                : access === 'engineer'
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === 'Admin' && <AdminPanelSettingsOutlinedIcon />}
            {access === 'Engineer' && <EngineeringOutlined />}
            {access === 'User' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      renderCell: ({ row: { id } }) => (
        <UserActions onDelete={deleteUserHandler} userId={id} />
      ),
    },
    // {
    //   field: 'userId',
    //   headerName: 'تحديث البيانات',
    //   headerAlign: 'center',
    //   align: 'center',
    //   flex: 1,
    //   renderCell: ({ row: { userId } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           colors.greenAccent[600]
    //           //  colors.greenAccent[700]
    //           //   : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         <EditIcon />
    //         <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
    //           <Link to={`/users/${userId}`}>تحديث البيانات</Link>
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
    // {
    //   field: 'deletedUserId',
    //   headerName: 'الغاء',
    //   headerAlign: 'center',
    //   align: 'center',
    //   flex: 1,
    //   renderCell: ({ row: { deletedUserId } }) => {
    //     return (
    //       <IconButton
    //       loadin
    //         aria-label="delete"
    //         onClick={() => deleteUserHandler(deletedUserId)}
    //       >
    //         <DeleteIcon />
    //       </IconButton>
    //     );
    //   },
    // },
  ];

  if (isLoading) {
    return;
  }

  return (
    <Box m="20px">
      <Header
        title="الموظفين"
        // subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          // checkboxSelection
          columns={columns}
          rows={usersData}
          loading={isLoading}
          localeText={arSD.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: CustomToolbar, Footer: CustomFooter }}
        />
      </Box>
    </Box>
  );
};

export default UsersDatagrid;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector /> */}
      <GridToolbarExport
        csvOptions={{
          fileName: 'تقرير الموظفين',
          // delimiter: ';',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

function CustomFooter() {
  return (
    <GridFooterContainer>
      <GridFooter
        sx={{
          paddingRight: '1rem',
        }}
      />
    </GridFooterContainer>
  );
}
