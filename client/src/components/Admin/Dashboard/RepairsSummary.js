import axios from 'axios';

import { useState, useEffect } from 'react';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import StatBox from './StatBox';

import { tokens } from '../../../theme';

const RepairsSummary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery('(min-width:800px)');

  const [isLoading, setIsLoading] = useState(false);
  const [ticketsInfo, setTicketsInfo] = useState({
    totalTicketsNumber: undefined,
    completedTicketsNumber: undefined,
    unCompletedTicketsNumber: undefined,
  });

  useEffect(() => {
    const getTicketsInfo = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/tickets/number-info`
        );

        if (response.status === 200) {
          const { ticketsInfo } = response.data;
          setTicketsInfo(ticketsInfo);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    getTicketsInfo();
  }, []);

  if (isLoading) {
    return;
  }
  const completedProgress =
    ticketsInfo.completedTicketsNumber / ticketsInfo.totalTicketsNumber;
  const unCompletedProgress =
    ticketsInfo.unCompletedTicketsNumber / ticketsInfo.totalTicketsNumber;

  return (
    <>
      <Box
        gridColumn={isNonMobile ? 'span 2' : 'span 6'}
        // gridColumn="span 2"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={ticketsInfo.totalTicketsNumber}
          subtitle="عدد الأعطال"
          icon={
            <BuildOutlinedIcon
              sx={{ color: colors.grey[100], fontSize: '26px' }}
            />
          }
        />
      </Box>

      <Box
        gridColumn={isNonMobile ? 'span 2' : 'span 6'}
        // gridColumn="span 2"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={ticketsInfo.completedTicketsNumber}
          subtitle="عدد الأعطال المكتملة"
          progress={completedProgress}
          ratio={completedProgress}
          icon={
            <BuildOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
            />
          }
        />
      </Box>
      <Box
        gridColumn={isNonMobile ? 'span 2' : 'span 6'}
        // gridColumn="span 2"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={ticketsInfo.unCompletedTicketsNumber}
          subtitle="عدد الأعطال غير المكتملة"
          progress={unCompletedProgress}
          ratio={unCompletedProgress}
          danger
          icon={
            <BuildOutlinedIcon
              sx={{ color: colors.redAccent[600], fontSize: '26px' }}
            />
          }
        />
      </Box>
    </>
  );
};

export default RepairsSummary;
