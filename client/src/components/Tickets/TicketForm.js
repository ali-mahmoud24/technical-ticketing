import axios from 'axios';
import {
  adminstrationsOptions,
  repairTypeOptions,
} from '../../shared/utils/selectLists';
import { formatDateAndTime } from '../../shared/utils/date';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

import { Formik } from 'formik';
import * as yup from 'yup';

import { tokens } from '../../theme';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const TicketForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [loadedEngineers, setLoadedEngineers] = useState([]);

  const isNonMobile = useMediaQuery('(min-width:992px)');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const getAllEngineers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/engineers`
        );

        if (response.status === 200) {
          const { engineers } = response.data;
          setLoadedEngineers(engineers);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    getAllEngineers();
  }, []);

  const handleFormSubmit = async (values) => {
    const engineer = loadedEngineers.find(
      (engineer) => engineer.id === values.engineerId
    );

    const engineerFullName = engineer.fullName;

    const ticketData = {
      userId,
      engineerId: values.engineerId,
      administration: values.administration,
      sector: values.sector,
      repairType: values.repairType,
      startTime: new Date(),
    };

    const { formattedDate, formattedTime } = formatDateAndTime(
      ticketData.startTime
    );

    // CREATE NEW TICKET
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/add-ticket`,
        ticketData
      );

      if (response.status === 201) {
        const { ticketId } = response.data;
        setIsLoading(false);

        navigate('/ticket', {
          state: {
            ticketId,
            engineerFullName,
            administration: ticketData.administration,
            sector: ticketData.sector,
            repairType: ticketData.repairType,
            date: formattedDate,
            time: formattedTime,
          },
        });
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        width: isNonMobile ? '40vw' : '90vw',
        margin: '0 auto',
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={ticketSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                marginTop: 8,
                marginBottom: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: colors.greenAccent[500] }}>
                <HomeRepairServiceIcon />
              </Avatar>
              <Typography component="h1" variant="h1">
                طلب إصلاح
              </Typography>
            </Box>

            <FormControl fullWidth variant="filled">
              <InputLabel id="administration">الإدارة</InputLabel>
              <Select
                id="administration"
                labelId="administration"
                value={values.administration}
                onChange={handleChange}
                onBlur={handleBlur}
                name="administration"
                error={!!touched.administration && !!errors.administration}
                // helperText={touched.administration && errors.administration}
              >
                {adminstrationsOptions}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              variant="filled"
              type="text"
              label="القطاع"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.sector}
              name="sector"
              error={!!touched.sector && !!errors.sector}
              helperText={touched.sector && errors.sector}
            />

            <FormControl fullWidth variant="filled">
              <InputLabel id="repairType">نوع العطل</InputLabel>
              <Select
                id="repairType"
                labelId="repairType"
                value={values.repairType}
                onChange={handleChange}
                onBlur={handleBlur}
                name="repairType"
                error={!!touched.repairType && !!errors.repairType}
                // helperText={touched.repairType && errors.repairType}
              >
                {repairTypeOptions}
              </Select>
            </FormControl>

            {values.repairType && (
              <FormControl fullWidth variant="filled" sx={{ mt: '10px' }}>
                <InputLabel id="engineerId">المهندس</InputLabel>
                <Select
                  id="engineerId"
                  labelId="engineerId"
                  value={values.engineerId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="engineerId"
                  error={!!touched.engineerId && !!errors.engineerId}
                  // helperText={touched.engineerName && errors.engineerName}
                >
                  {loadedEngineers
                    .filter(
                      (engineer) =>
                        engineer.specialization === values.repairType
                    )
                    .map((engineer) => (
                      <MenuItem key={engineer.id} value={engineer.id}>
                        {engineer.fullName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            <Box mt="10px">
              <LoadingButton
                sx={{
                  color: colors.grey[900],
                  bgcolor: colors.greenAccent[500],
                  fontSize: '1rem',
                  '&:hover': {
                    color: colors.grey[100],
                  },
                }}
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
                loading={isLoading}
              >
                طلب إصلاح
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default TicketForm;

const ticketSchema = yup.object().shape({
  administration: yup.string().required('من فضلك أدخل الإدارة'),
  sector: yup.string(),
  repairType: yup.string().required('من فضلك حدد نوع العطل'),
  engineerId: yup.string().required('من فضلك اختار المهندس'),
});
const initialValues = {
  administration: '',
  sector: '',
  repairType: '',
  engineerId: '',
};
