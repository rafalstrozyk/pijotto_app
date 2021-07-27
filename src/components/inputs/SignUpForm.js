import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  login: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});

export default function SignUpForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form>
      <TextField
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
        color="primary"
        id="login"
        label="login"
        type="text"
        error={formik.touched.login && formik.errors.login ? true : false}
        {...formik.getFieldProps('login')}
        helperText={
          formik.touched.login && formik.errors.login
            ? formik.errors.login
            : null
        }
      />
      <TextField
        color="primary"
        id="password"
        label="password"
        type="password"
        error={formik.touched.password && formik.errors.password ? true : false}
        {...formik.getFieldProps('password')}
        helperText={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null
        }
      />

      <Button color="secondary" variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}
