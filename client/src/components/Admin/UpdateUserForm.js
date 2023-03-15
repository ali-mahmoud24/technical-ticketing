import axios from 'axios';
import { repairTypeOptions } from '../../shared/utils/selectLists';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, TextField, Select, InputLabel, FormControl } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LoadingButton } from '@mui/lab';

import { Formik } from 'formik';
import * as yup from 'yup';

import Header from '../../components/Layout/Header';

const UpdateUserForm = () => {
  const [loadedUser, setLoadedUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { userId } = params;

  const isNonMobile = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/admin/users/${userId}`
        );

        if (response.status === 200) {
          setIsLoading(false);
          const { user } = response.data;
          setLoadedUser(user);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const initialValues = {
    firstName: loadedUser?.firstName,
    secondName: loadedUser?.secondName,
    specialization: loadedUser?.specialization,
  };

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);

      const userData = {
        firstName: values.firstName,
        secondName: values.secondName,
        specialization: values.specialization,
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/users/${userId}`,
        userData
      );

      if (response.status === 200) {
        setIsLoading(false);
        navigate('/users');
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return;
  }

  return (
    <>
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

                {loadedUser?.isEngineer && (
                  <FormControl variant="filled">
                    <InputLabel id="specialization">التخصص</InputLabel>
                    <Select
                      id="specialization"
                      labelId="specialization"
                      value={values.specialization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="specialization"
                      error={
                        !!touched.specialization && !!errors.specialization
                      }
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
                  حدث الموظف
                </LoadingButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default UpdateUserForm;

const userSchema = yup.object().shape({
  firstName: yup.string().required('من فضلك اكتب الاسم الأول'),
  secondName: yup.string().required('من فضلك اكتب الاسم الثاني'),
});
