import axios from 'axios';

import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material';

import { ResponsivePie } from '@nivo/pie';

import LoadingSpinner from '../../../../shared/components/LoadingSpinner';

import { tokens } from '../../../../theme';

const TicketAdministrationChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const getPieData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/tickets/pie/adminstration`
        );

        if (response.status === 200) {
          const { pieData } = response.data;
          setPieData(pieData);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    getPieData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ResponsivePie
      data={pieData}
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
            translate: '-45px 0px',
            // translate: '-5px 20px',
            fontSize: '1rem',
          },
        },
        tooltip: {
          container: {
            color: colors.grey[500],
            fontSize: 16,
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={1}
      cornerRadius={5}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsTextOffset={70}
      arcLinkLabelsStraightLength={60}
      arcLinkLabelsSkipAngle={7}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      // // // // // // // // // // // // //
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.5}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          // justify: true,
          // translateX: 0,
          // translateY: 56,
          // itemsSpacing: 2,
          itemWidth: 90,
          itemHeight: 30,
          itemTextColor: colors.grey[100],
          // itemDirection: 'right-to-left',
          symbolSize: 30,
          itemOpacity: 0.85,

          // symbolShape: 'circle',
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

export default TicketAdministrationChart;
