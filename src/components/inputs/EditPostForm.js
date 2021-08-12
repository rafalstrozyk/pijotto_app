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

const StyledContainerButtons = styled(Container)`
  margin-top: 10px;
  > * {
    &:last-child {
      margin-left: 10px;
    }
  }
`;

export default function EditPostForm({ className, post, isEditFunc }) {
  const { currentUser } = useAuth();
  const { editPost } = useFirestore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      text: post.text,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        if (currentUser) {
          await editPost(post, values.text);
        } else {
          setError('You are not login');
          setLoading(false);
          isEditFunc(false);
        }
      } catch {
        setError('Something went wrong');
      }
      setLoading(false);
      isEditFunc(false);
    },
  });

  return (
    <form className={className} onSubmit={formik.handleSubmit}>
      {error && <p>{error}</p>}
      <TextField
        fullWidth
        id="text"
        label="Post content"
        multiline
        rows={3}
        variant="outlined"
        {...formik.getFieldProps('text')}
      />
      <StyledContainerButtons jusContent="center">
        <Button color="secondary" variant="contained" type="submit">
          {loading ? <CircularProgress /> : 'Ok'}
        </Button>
        <Button
          onClick={() => isEditFunc(false)}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
      </StyledContainerButtons>
    </form>
  );
}
