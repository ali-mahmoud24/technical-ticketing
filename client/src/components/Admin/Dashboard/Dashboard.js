import { useRef } from 'react';

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import Header from '../../Layout/Header';

import RepairsSummary from './RepairsSummary';
import TicketGroupBarChart from '../Charts/BarChart/TicketGroupBarChart';
import TicketRepairTypeChart from '../Charts/PieChart/TicketRepairTypeChart';

import { useReactToPrint } from 'react-to-print';

import { tokens } from '../../../theme';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery('(min-width:800px)');

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'التقارير',
  });

  const pageStyle = `
  @media print{@page {size: landscape}}
  @media print {
    
    body {
      margin: 0 10px;

      direction: rtl;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            onClick={handlePrint}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            تنزيل التقارير
            <DownloadOutlinedIcon sx={{ ml: '10px' }} />
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}

      <Box
        ref={componentRef}
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        gridAutoRows="120px"
        gap="20px"
      >
        <style>{pageStyle}</style>

        {/* ROW 1 */}
        <RepairsSummary />
        {/* ROW 2 */}
        <Box
          gridColumn={isNonMobile ? 'span 3' : 'span 6'}
          // gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            الأعطال
          </Typography>
          <Box height={'100%'}>
            <TicketRepairTypeChart />
          </Box>
        </Box>
        <Box
          gridColumn={isNonMobile ? 'span 3' : 'span 6'}
          // gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          padding={'20px'}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            // sx={{ padding: '30px 30px 0 30px' }}
          >
            الأعطال
          </Typography>
          <Box
            height="370px"
            maxWidth={isNonMobile ? '600px' : undefined}
            margin="0 auto"
          >
            <TicketGroupBarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
