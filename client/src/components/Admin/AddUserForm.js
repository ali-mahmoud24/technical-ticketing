import axios from 'axios';
import {
  employeeOptions,
  repairTypeOptions,
} from '../../shared/utils/selectLists';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, TextField, Select, InputLabel, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import useMediaQuery from '@mui/material/useMediaQuery';

import { Formik } from 'formik';
import * as yup from 'yup';

import Header from '../../components/Layout/Header';

const AddUserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);

      const isAdmin = values.userType === 'أدمن' && true;
      const isEngineer = values.userType === 'مهندس' && true;
      let specialization;
      if (!values.specialization && isAdmin) {
        specialization = 'أدمن';
      } else if (!isEngineer) {
        specialization = 'موظف';
      } else {
        specialization = values.specialization;
      }

      const userData = {
        firstName: values.firstName,
        secondName: values.secondName,
        userName: values.userName,
        userCode: values.userCode,
        isAdmin,
        isEngineer,
        specialization,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/add-user`,
        userData
      );

      if (response.status === 201) {
        setIsLoading(false);
        navigate('/users');
      }

      // User already exists with this userName
      if (response.status === 200) {
        setIsLoading(false);
        alert('يوجد مسخدم بنفس اسم المشغل , برجاء استخدام اسم مشغل جديد');
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="أضف موظف"
        //  subtitle="Create a New User Profile"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="الاسم الأول"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="الاسم الثاني"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.secondName}
                name="secondName"
                error={!!touched.secondName && !!errors.secondName}
                helperText={touched.secondName && errors.secondName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="اسم المشغل"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="كود المشغل"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userCode}
                name="userCode"
                error={!!touched.userCode && !!errors.userCode}
                helperText={touched.userCode && errors.userCode}
                sx={{ gridColumn: 'span 2' }}
              />

              <FormControl variant="filled">
                <InputLabel id="userType">نوع المستخدم</InputLabel>
                <Select
                  id="userType"
                  labelId="userType"
                  value={values.userType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="userType"
                  error={!!touched.userType && !!errors.userType}
                  // helperText={touched.userType && errors.userType}
                  sx={{ gridColumn: 'span 2' }}
                >
                  {employeeOptions}
                </Select>
              </FormControl>

              {values.userType === 'مهندس' && (
                <FormControl variant="filled">
                  <InputLabel id="specialization">التخصص</InputLabel>
                  <Select
                    id="specialization"
                    labelId="specialization"
                    value={values.specialization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="specialization"
                    error={!!touched.specialization && !!errors.specialization}
                    // helperText={touched.specialization && errors.specialization}
                    sx={{ gridColumn: 'span 2' }}
                  >
                    {repairTypeOptions}
                  </Select>
                </FormControl>
              )}
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <LoadingButton
                loading={isLoading}
                type="submit"
                color="secondary"
                variant="contained"
              >
                أضف الموظف
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddUserForm;

const userSchema = yup.object().shape({
  firstName: yup.string().required('من فضلك اكتب الاسم الأول'),
  secondName: yup.string().required('من فضلك اكتب الاسم الثاني'),
  userName: yup.string().required('من فضلك اكتب اسم المشغل'),
  userCode: yup.string().required('من فضلك اكتب كود المشغل'),
});

const initialValues = {
  firstName: '',
  secondName: '',
  userName: '',
  userCode: '',
  userType: '',
  specialization: '',
};
