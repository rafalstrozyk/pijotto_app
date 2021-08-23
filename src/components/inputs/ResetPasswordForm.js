import { useState } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from '../containers/flexbox';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 20rem;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 15px;
  border-radius: 10px;
`;
const StyledContainer = styled(Container)`
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});

export default function LoginForm({ handleIsOpenFunc }) {
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        setLoading(true);
        await resetPassword(values.password);
      } catch {
        setError('Failed to reset password');
      }
      handleIsOpenFunc(false);
      setLoading(false);
      values.password = '';
    },
  });
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledContainer direction="column" jusContent="center" aliItems="center">
        {error && <p>{error}</p>}
        <TextField
          fullWidth
          color="primary"
          id="password"
          label="password"
          type="password"
          error={
            formik.touched.password && formik.errors.password ? true : false
          }
          {...formik.getFieldProps('password')}
          helperText={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }
        />

        <Container width="80%" jusContent="space-around">
          <Button color="primary" variant="contained" type="submit">
            {loading ? <CircularProgress /> : 'Ok'}
          </Button>
          <Button
            onClick={() => handleIsOpenFunc(false)}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </Container>
      </StyledContainer>
    </StyledForm>
  );
}
