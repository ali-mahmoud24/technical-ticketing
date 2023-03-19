import axios from 'axios';

import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material';

import { ResponsivePie } from '@nivo/pie';

import { tokens } from '../../../../theme';
import LoadingSpinner from '../../../../shared/components/LoadingSpinner';

const TicketRepairTypeChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const getPieData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/tickets/pie/repairType`
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
    <LoadingSpinner />;
  }

  return (
    <ResponsivePie
      data={pieData}
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
            translate: '-5px 20px',
            fontSize: '0.75rem',
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={1}
      cornerRadius={5}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsTextOffset={40}
      arcLinkLabelsSkipAngle={10}
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
          anchor: 'bottom',
          direction: 'row',
          // justify: true,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 60,
          itemWidth: 30,
          itemHeight: 18,
          itemTextColor: colors.grey[100],
          itemDirection: 'right-to-left',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: colors.grey[500],
              },
            },
          ],
        },
      ]}
    />
    // <ResponsivePie
    //   data={pieData}
    //   theme={{
    //     axis: {
    //       domain: {
    //         line: {
    //           stroke: colors.grey[100],
    //         },
    //       },
    //       legend: {
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //       ticks: {
    //         line: {
    //           stroke: colors.grey[100],
    //           strokeWidth: 1,
    //         },
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //     },
    //     legends: {
    //       text: {
    //         fill: colors.grey[100],
    //         translate: '30px 0px',
    //         fontSize: '1rem',
    //       },
    //     },
    //     tooltip: {
    //       container: {
    //         // background: colors.grey[500],
    //         color: colors.grey[500],
    //         fontSize: 16,
    //       },
    //     },
    //   }}
    //   margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    //   innerRadius={0.5}
    //   padAngle={1}
    //   cornerRadius={5}
    //   activeOuterRadiusOffset={8}
    //   borderColor={{
    //     from: 'color',
    //     modifiers: [['darker', 0.2]],
    //   }}
    //   arcLinkLabelsTextOffset={40}
    //   arcLinkLabelsSkipAngle={10}
    //   arcLinkLabelsTextColor={colors.grey[100]}
    //   arcLinkLabelsThickness={2}
    //   arcLinkLabelsColor={{ from: 'color' }}
    //   // // // // // // // // // // // // //
    //   enableArcLabels={false}
    //   arcLabelsRadiusOffset={0.5}
    //   arcLabelsSkipAngle={7}
    //   arcLabelsTextColor={{
    //     from: 'color',
    //     modifiers: [['darker', 2]],
    //   }}
    //   defs={[
    //     {
    //       id: 'dots',
    //       type: 'patternDots',
    //       background: 'inherit',
    //       color: 'rgba(255, 255, 255, 0.3)',
    //       size: 4,
    //       padding: 1,
    //       stagger: true,
    //     },
    //     {
    //       id: 'lines',
    //       type: 'patternLines',
    //       background: 'inherit',
    //       color: 'rgba(255, 255, 255, 0.3)',
    //       rotation: -45,
    //       lineWidth: 6,
    //       spacing: 10,
    //     },
    //   ]}
    //   legends={[
    //     {
    //       anchor: 'bottom',
    //       direction: 'row',
    //       justify: false,
    //       translateX: 0,
    //       translateY: 56,
    //       itemsSpacing: 0,
    //       itemWidth: 100,
    //       itemHeight: 18,
    //       itemTextColor: colors.grey[100],
    //       itemDirection: 'right-to-left',
    //       itemOpacity: 1,
    //       symbolSize: 18,
    //       symbolShape: 'circle',
    //       effects: [
    //         {
    //           on: 'hover',
    //           style: {
    //             itemTextColor: colors.grey[500],
    //           },
    //         },
    //       ],
    //     },
    //   ]}
    // />
  );
};

export default TicketRepairTypeChart;
