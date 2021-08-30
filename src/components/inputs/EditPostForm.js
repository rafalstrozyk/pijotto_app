import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFirestore } from '../../contexts/FirestoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { AppSatateContext } from '../../contexts/AppStateContext';
import { appStateVars } from '../../unchangingVars';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import styled from 'styled-components';
import { Container } from '../containers/flexbox';

const validationSchema = Yup.object({
  text: Yup.string()
    .min(3, 'Must be 6 characters or more')
    .max(300, '300 it is max characters'),
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
  const [, dispatch] = useContext(AppSatateContext);
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
          dispatch({ type: appStateVars.ALLERT, message: 'Succes edit post!' });
          dispatch({ type: appStateVars.SHOW_ALLERT });
        } else {
          setError('You are not login');
          setLoading(false);
          isEditFunc(false);
          dispatch({
            type: appStateVars.ALLERT,
            message: error,
            isError: true,
          });
          dispatch({ type: appStateVars.SHOW_ALLERT });
        }
      } catch {
        setError('Something went wrong');
        dispatch({ type: appStateVars.ALLERT, message: error, isError: true });
        dispatch({ type: appStateVars.SHOW_ALLERT });
      }
      setLoading(false);
      isEditFunc(false);
      setTimeout(() => {
        dispatch({ type: appStateVars.DONT_SHOW_ALLERT });
      }, 5000);
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
        error={formik.touched.text && formik.errors.text ? true : false}
        helperText={
          formik.touched.text && formik.errors.text ? formik.errors.text : null
        }
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

EditPostForm.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  isEditFunc: PropTypes.func,
};
