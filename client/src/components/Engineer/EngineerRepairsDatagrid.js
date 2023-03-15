import axios from 'axios';

import { useContext, useEffect, useMemo, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';

import {
  DataGrid,
  GridFooter,
  GridFooterContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { arSD } from '@mui/x-data-grid';

import { tokens } from '../../theme';

import Header from '../../components/Layout/Header';
import EngineerActions from './EngineerActions';

import { AuthContext } from '../../shared/context/auth-context';

const EngineerRepairsDatagrid = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loadedTickets, setLoadedTickets] = useState([]);

  const { userId } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    const getEngineerTickets = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/engineer/${userId}/tickets`
        );

        if (response.status === 200) {
          const { tickets } = response.data;
          setLoadedTickets(tickets);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    getEngineerTickets();
  }, [userId]);

  const ticketsData = loadedTickets.map((ticket) => ({
    id: ticket._id,
    engineerName: ticket.engineerName,
    userFullName: ticket.userFullName,
    repairType: ticket.repairType,
    startDate: ticket.startDate,
    startTime: ticket.startTime,
    status: ticket.status,
    closeDate:
      ticket.closeDate && ticket.status === 'Completed'
        ? ticket.closeDate
        : '---',
    closeTime:
      ticket.closeTime && ticket.status === 'Completed'
        ? ticket.closeTime
        : '---',
  }));

  const columns = useMemo(
    () => [
      {
        field: 'engineerName',
        headerName: 'اسم المهندس',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        cellClassName: 'name-column--cell',
      },
      {
        field: 'userFullName',
        headerName: 'اسم المشغل',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
      },
      {
        field: 'repairType',
        headerName: 'نوع العطل',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
      },
      {
        field: 'startDate',
        headerName: 'تاريخ البدأ',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
      },
      {
        field: 'startTime',
        headerName: 'وقت البدأ',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
      },
      {
        field: 'closeDate',
        headerName: 'تاريخ النهاية',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
      },
      {
        field: 'closeTime',
        headerName: 'وقت النهاية',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
      },

      {
        field: 'status',
        type: 'singleSelect',
        valueOptions: ['Uncompleted', 'Accepted', 'Completed'],
        editable: true,
        sortable: false,
        headerName: 'الحالة',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        renderCell: ({ row: { status } }) => {
          return (
            <Box
              width="80%"
              m="0 auto"
              p="5px"
              borderRadius="10px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                status === 'Uncompleted'
                  ? colors.redAccent[400]
                  : status === 'Accepted'
                  ? colors.grey[500]
                  : colors.greenAccent[700]
              }
            >
              <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                {status}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <EngineerActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId, colors]
  );

  if (isLoading) {
    return;
  }

  return (
    <Box m="20px">
      <Header
        title="الأعطال"
        // subtitle="List of EngineerRepairsDatagrid for Future Reference"
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
          sx={{
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'hidden',
            },
          }}
          HorizontalAlignment="Stretch"
          HorizontalContentAlignment="Stretch"
          ColumnWidth="*"
          onCellEditStop={(params) => setRowId(params.id)}
          columns={columns}
          rows={ticketsData}
          localeText={arSD.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: CustomToolbar, Footer: CustomFooter }}
        />
      </Box>
    </Box>
  );
};

export default EngineerRepairsDatagrid;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport
        csvOptions={{
          fileName: 'تقرير الأعطال',
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