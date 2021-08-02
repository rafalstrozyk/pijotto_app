import { useState } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from '../containers/flexbox';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledForm = styled.form`
  width: 25rem;
`;
const StyledContainer = styled(Container)`
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .min(6, 'Must be 6 characters or more')
    .max(20, 'Must be 15 characters or less')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function SignUpForm() {
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        setLoading(true);
        await signup(values.email, values.password);
        history.push('/');
      } catch {
        setError('Failed to create an account');
      }
      setLoading(false);
    },
  });
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledContainer direction="column" jusContent="center" aliItems="center">
        {error && <p>{error}</p>}
        <TextField
          fullWidth
          color="primary"
          id="email"
          label="e-mail"
          type="email"
          error={formik.touched.email && formik.errors.email ? true : false}
          {...formik.getFieldProps('email')}
          helperText={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
        />
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
        <TextField
          fullWidth
          color="primary"
          id="passwordConfirmation"
          label="repeat password"
          type="password"
          error={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
              ? true
              : false
          }
          {...formik.getFieldProps('passwordConfirmation')}
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
              ? formik.errors.passwordConfirmation
              : null
          }
        />

        <Button color="secondary" variant="contained" type="submit">
          {loading ? <CircularProgress /> : 'Submit'}
        </Button>
      </StyledContainer>
    </StyledForm>
  );
}