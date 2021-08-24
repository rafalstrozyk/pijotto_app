import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useFirestore } from '../../contexts/FirestoreContext';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import { Container } from '../containers/flexbox';

const validationSchema = Yup.object({
  text: Yup.string()
    .min(3, 'Must be 6 characters or more')
    .max(300, '300 it is max characters')
    .required(),
});

const StyledContainerButton = styled(Container)`
  margin-top: 10px;
`;

export default function NewPostForm({ className }) {
  const { currentUser } = useAuth();
  const { sendPost } = useFirestore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        if (currentUser) {
          await sendPost(values);
        } else {
          setError('You are not login');
          setLoading(false);
        }
      } catch {
        setError('Something went wrong');
      }
      values.text = '';
      setLoading(false);
    },
  });

  return (
    <form className={className} onSubmit={formik.handleSubmit}>
      {error && <p>{error}</p>}
      <TextField
        fullWidth
        id="text"
        label="Post content"
        color="secondary"
        multiline
        rows={3}
        variant="outlined"
        {...formik.getFieldProps('text')}
        error={formik.touched.text && formik.errors.text ? true : false}
          helperText={
            formik.touched.text && formik.errors.text
              ? formik.errors.text
              : null
          }
      />
      <StyledContainerButton jusContent="center">
        <Button color="secondary" variant="contained" type="submit">
          {loading ? <CircularProgress /> : 'Post'}
        </Button>
      </StyledContainerButton>
    </form>
  );
}
