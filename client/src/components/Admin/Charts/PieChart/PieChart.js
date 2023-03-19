import { pieChartOptions } from '../../../../shared/utils/selectLists';

import { Box, FormControl, InputLabel, Select } from '@mui/material';

import Header from '../../../Layout/Header';

import TicketRepairTypeChart from './TicketRepairTypeChart';
import TicketAdministrationChart from './TicketAdministrationChart';
import { useState } from 'react';

const PieChart = () => {
  const [chartType, setChartType] = useState('أنواع الأعطال');

  const handleChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <Box m="20px">
      <Header title="أنواع الأعطال" subtitle="PieChart" />

      <Box width={'45vw'} margin="0 auto">
        <FormControl fullWidth variant="filled">
          <InputLabel id="pieChart">PieChart</InputLabel>
          <Select
            id="pieChart"
            labelId="pieChart"
            value={chartType}
            onChange={handleChange}
            name="pieChart"
          >
            {pieChartOptions}
          </Select>
        </FormControl>
      </Box>

      <Box height="65vh">
        {chartType === 'أنواع الأعطال' && <TicketRepairTypeChart />}
        {chartType === 'الإدارات' && <TicketAdministrationChart />}
      </Box>
    </Box>
  );
};

export default PieChart;
