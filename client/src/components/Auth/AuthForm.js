import axios from 'axios';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Formik } from 'formik';
import * as yup from 'yup';

import { tokens } from '../../theme';
import { AuthContext } from '../../shared/context/auth-context';

const AddUserForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const isNonMobile = useMediaQuery('(min-width:992px)');
  const { login } = useContext(AuthContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);

      const loginData = {
        userName: values.userName,
        userCode: values.userCode,
      };

      const loginResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        loginData
      );

      if (loginResponse.status === 203) {
        setIsLoading(false);
        const { message } = loginResponse.data;
        alert(message);
      }

      if (loginResponse.status === 200) {
        setIsLoading(false);
        const loginData = loginResponse.data;
        login(
          loginData.userId,
          loginData.token,
          loginData.isAdmin,
          loginData.isEngineer,
          null
        );

        if (loginData.isAdmin) {
          navigate('/dashboard', { replace: true });
        } else if (loginData.isEngineer) {
          navigate('/my-repairs', { replace: true });
        } else {
          navigate('/ticket-form', { replace: true });
        }
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Box
      // m="20px"
      sx={{
        width: isNonMobile ? '40vw' : '90vw',
        margin: '0 auto',
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={authSchema}
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h1">
                تسجيل الدخول
              </Typography>
            </Box>
            <TextField
              fullWidth
              required
              margin="normal"
              variant="filled"
              type="text"
              label="اسم المشغل"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.userName}
              name="userName"
              error={!!touched.userName && !!errors.userName}
              helperText={touched.userName && errors.userName}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              variant="filled"
              type="text"
              label="كود المشغل"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.userCode}
              name="userCode"
              error={!!touched.userCode && !!errors.userCode}
              helperText={touched.userCode && errors.userCode}
            />
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
                تسجيل الدخول
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddUserForm;

const authSchema = yup.object().shape({
  userName: yup.string().required('من فضلك اكتب اسم المشغل'),
  userCode: yup.string().required('من فضلك اكتب كود المشغل'),
});
const initialValues = {
  userName: '',
  userCode: '',
};
