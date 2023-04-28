import axios from 'axios';

import { REPAIR_TYPE_LIST } from '../../shared/utils/selectLists';
import { formatDate, formatTime } from '../../shared/utils/date';

import { useEffect, useState, useMemo } from 'react';

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

import Header from '../Layout/Header';

import { tokens } from '../../theme';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const AdminRepairsDatagrid = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loadedTickets, setLoadedTickets] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/tickets`
        );

        if (response.status === 200) {
          setLoadedTickets(response.data.tickets);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    getAllTickets();
  }, []);

  const ticketsData = loadedTickets.map((ticket) => ({
    id: ticket._id,
    engineerName: ticket.engineerFullName,
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
    note: ticket.note || 'لا يوجد ملاحظة',
  }));

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        headerAlign: 'center',
        align: 'center',
      },
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
        type: 'singleSelect',
        valueOptions: REPAIR_TYPE_LIST,
        sortable: false,
      },
      {
        field: 'startDate',
        headerName: 'تاريخ البدأ',
        headerAlign: 'center',
        align: 'center',
        type: 'date',
        valueGetter: ({ value }) => value && new Date(value),
        valueFormatter: ({ value }) => formatDate(value),
        flex: 1,
      },
      {
        field: 'startTime',
        headerName: 'وقت البدأ',
        headerAlign: 'center',
        type: 'dateTime',
        valueGetter: ({ value }) => value && new Date(value),
        valueFormatter: ({ value }) => formatTime(value),
        align: 'center',
      },
      {
        field: 'closeDate',
        headerName: 'تاريخ النهاية',
        headerAlign: 'center',
        align: 'center',
        type: 'date',
        valueGetter: ({ value }) => {
          if (value === '---') {
            return '---';
          }
          return value && new Date(value);
        },
        valueFormatter: ({ value }) => formatDate(value),
        flex: 1,
      },
      {
        field: 'closeTime',
        headerName: 'وقت النهاية',
        headerAlign: 'center',
        align: 'center',
        type: 'dateTime',
        valueGetter: ({ value }) => {
          if (value === '---') {
            return '---';
          }
          return value && new Date(value);
        },
        valueFormatter: ({ value }) => formatTime(value),
      },
      {
        field: 'note',
        headerName: 'ملاحظة المهندس',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        sortable: false,
      },

      {
        field: 'status',
        headerName: 'الحالة',
        headerAlign: 'center',
        align: 'center',
        type: 'singleSelect',
        valueOptions: ['Uncompleted', 'Accepted', 'Completed'],
        sortable: false,
        width: 170,
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
    ],
    [colors]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box m="20px">
      <Header
        title="الأعطال"
        // subtitle="List of AdminRepairsDatagrid for Future Reference"
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
          HorizontalAlignment="Stretch"
          HorizontalContentAlignment="Stretch"
          ColumnWidth="*"
          columns={columns}
          rows={ticketsData}
          loading={isLoading}
          localeText={arSD.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: CustomToolbar, Footer: CustomFooter }}
        />
      </Box>
    </Box>
  );
  
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport
          csvOptions={{
            fileName: 'تقرير الأعطال',
            utf8WithBom: true,
            getRowsToExport: () => loadedTickets.map((ticket) => ticket.id),
          }}
        />
      </GridToolbarContainer>
    );
  }
};

export default AdminRepairsDatagrid;

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
