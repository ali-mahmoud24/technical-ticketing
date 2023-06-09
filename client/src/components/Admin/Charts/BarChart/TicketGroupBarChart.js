import axios from 'axios';
import { ADMINSTRATIONS_LIST } from '../../../../shared/utils/selectLists';

import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material';

import { ResponsiveBar } from '@nivo/bar';

import { tokens } from '../../../../theme';
import LoadingSpinner from '../../../../shared/components/LoadingSpinner';

const TicketGroupBarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const getBarData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/tickets/bar`
        );

        if (response.status === 200) {
          const { barData } = response.data;
          setBarData(barData);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    getBarData();
  }, []);

  if (isLoading) {
    if (isDashboard) {
      return;
    }
    return <LoadingSpinner />;
  }

  return (
    <ResponsiveBar
      data={barData}
      colors={{ scheme: 'accent' }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            translate: isDashboard ? '-35px 0px' : '-55px 0px',
            fontSize: isDashboard ? undefined : '0.75rem',
          },
        },
        tooltip: {
          container: {
            // background: colors.grey[500],
            color: colors.grey[500],
            fontSize: 16,
          },
        },
      }}
      keys={ADMINSTRATIONS_LIST}
      indexBy="repairType"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.5}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: 'color',
        modifiers: [['darker', '1.6']],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'نوع العطل',
        legendPosition: 'middle',
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 20,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'الإدارة',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: isDashboard ? 170 : 215,
          translateY: 0,
          // itemsSpacing: 2,
          itemWidth: isDashboard ? 50 : 100,
          itemHeight: isDashboard ? 20 : 40,
          // itemDirection: 'right-to-left',
          itemOpacity: 0.85,
          symbolSize: isDashboard ? 20 : 40,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default TicketGroupBarChart;
