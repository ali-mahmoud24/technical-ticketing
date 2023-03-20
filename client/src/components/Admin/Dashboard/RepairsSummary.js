import axios from 'axios';

import { useState, useEffect } from 'react';

import { Box, useTheme } from '@mui/material';

import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';

import StatBox from './StatBox';
import { tokens } from '../../../theme';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

const RepairsSummary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [repairsNumber, setRepairsNumber] = useState();
  const [completedRepairsNumbers, setCompletedRepairsNumber] = useState();
  const [unCompletedRepairsNumbers, setUnCompletedRepairsNumber] = useState();

  useEffect(() => {
    const getNumberOfTickets = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/tickets/number`
        );

        if (response.status === 200) {
          const { number } = response.data;
          setRepairsNumber(number);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    const getNumberOfCompletedTickets = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/tickets/completed`
        );

        if (response.status === 200) {
          const { number } = response.data;
          setCompletedRepairsNumber(number);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    const getNumberOfUnCompletedTickets = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/tickets/uncompleted`
        );

        if (response.status === 200) {
          const { number } = response.data;
          setUnCompletedRepairsNumber(number);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    getNumberOfTickets();
    getNumberOfCompletedTickets();
    getNumberOfUnCompletedTickets();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const completedProgress = completedRepairsNumbers / repairsNumber;
  const unCompletedProgress = unCompletedRepairsNumbers / repairsNumber;

  return (
    <>
      <Box
        gridColumn="span 2"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={repairsNumber}
          subtitle="عدد الأعطال"
          icon={
            <BuildOutlinedIcon
              sx={{ color: colors.grey[100], fontSize: '26px' }}
            />
          }
        />
      </Box>

      <Box
        gridColumn="span 2"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={completedRepairsNumbers}
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
        gridColumn="span 2"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={unCompletedRepairsNumbers}
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
