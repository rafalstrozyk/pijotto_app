import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { AppSatateContext } from '../../contexts/AppStateContext';
import { appStateVars } from '../../unchangingVars';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Container } from '../containers/flexbox';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 100%;
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
});

function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useContext(AppSatateContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        setLoading(true);
        await login(values.email, values.password);
        dispatch({
          type: appStateVars.ALLERT,
          message: 'Succes log in, hello!',
        });
        dispatch({ type: appStateVars.SHOW_ALLERT });
        history.push('/');
      } catch {
        setError('Failed to log in');
        dispatch({ type: appStateVars.ALLERT, message: error, isError: true });
        dispatch({ type: appStateVars.SHOW_ALLERT });
      }
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: appStateVars.DONT_SHOW_ALLERT });
      }, 5000);
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

        <Button color="secondary" variant="contained" type="submit">
          {loading ? <CircularProgress /> : 'Log In'}
        </Button>
      </StyledContainer>
    </StyledForm>
  );
}

export default LoginForm;
