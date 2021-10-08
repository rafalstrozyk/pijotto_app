import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFirestore } from '../../contexts/FirestoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { AppSatateContext } from '../../contexts/AppStateContext';
import { appStateVars } from '../../unchangingVars';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import styled from 'styled-components';
import { Container } from '../containers/flexbox';

const validationSchema = Yup.object({
  text: Yup.string()
    .min(3, 'Must be 6 characters or more')
    .max(250, '250 it is max characters'),
});

const StyledContainerButton = styled(Container)`
  margin-top: 10px;
`;

function NewPostForm({ className }) {
  const { currentUser } = useAuth();
  const { sendPost } = useFirestore();
  const [, dispatch] = useContext(AppSatateContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.text.length > 0) {
        try {
          setLoading(true);
          setError('');
          if (currentUser) {
            await sendPost(values);
            dispatch({
              type: appStateVars.ALLERT,
              message: 'Succes send post!',
            });
            dispatch({ type: appStateVars.SHOW_ALLERT });
          } else {
            setError('You are not login');
            setLoading(false);
            dispatch({
              type: appStateVars.ALLERT,
              message: error,
              isError: true,
            });
            dispatch({ type: appStateVars.SHOW_ALLERT });
          }
        } catch {
          setError('Something went wrong');
          dispatch({
            type: appStateVars.ALLERT,
            message: error,
            isError: true,
          });
          dispatch({ type: appStateVars.SHOW_ALLERT });
        }
        values.text = '';
        setLoading(false);
        setTimeout(() => {
          dispatch({ type: appStateVars.DONT_SHOW_ALLERT });
        }, 5000);
      }
    },
  });

  return (
    <form className={className} onSubmit={formik.handleSubmit}>
      {error && <p>{error}</p>}
      <TextField
        fullWidth
        id="text"
        label="Post content"
        color="primary"
        multiline
        rows={3}
        variant="outlined"
        {...formik.getFieldProps('text')}
        error={formik.touched.text && formik.errors.text ? true : false}
        helperText={
          formik.touched.text && formik.errors.text ? formik.errors.text : null
        }
      />
      <StyledContainerButton jusContent="center">
        {!formik.errors.text && (
          <Button color="secondary" variant="contained" type="submit">
            {loading ? <CircularProgress /> : 'Post'}
          </Button>
        )}
      </StyledContainerButton>
    </form>
  );
}

NewPostForm.propTypes = {
  className: PropTypes.string,
};

export default NewPostForm;
