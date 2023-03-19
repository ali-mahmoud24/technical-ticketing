import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import ProgressCircle from './ProgressCircle';

const StatBox = ({
  title,
  subtitle,
  icon,
  progress,
  ratio,
  danger = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formattedRatio = `${(ratio * 100).toFixed(1)}%`;

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: danger ? colors.redAccent[600] : colors.grey[100],
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        {ratio && (
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{
              color: danger ? colors.redAccent[600] : colors.greenAccent[600],
            }}
          >
            {formattedRatio}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default StatBox;
