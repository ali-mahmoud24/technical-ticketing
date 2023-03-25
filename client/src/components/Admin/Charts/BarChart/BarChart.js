import { Box } from '@mui/material';

import Header from '../../../Layout/Header';

import TicketGroupBarChart from './TicketGroupBarChart';

const BarChart = () => {
  return (
    <Box m="20px">
      <Box sx={{ height: '74vh', maxWidth: '85vw', margin: '0 auto' }}>
        <Header title="الأعطال في الإدارات" subtitle="Bar Chart" />
        <TicketGroupBarChart />
      </Box>
    </Box>
  );
};

export default BarChart;
