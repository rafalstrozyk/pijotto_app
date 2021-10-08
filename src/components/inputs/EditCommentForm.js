import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFirestore } from '../../contexts/FirestoreContext';
import { AppSatateContext } from '../../contexts/AppStateContext';
import { appStateVars } from '../../unchangingVars';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

import SendIcon from '@material-ui/icons/Send';

import { Container } from '../containers/flexbox';

const validationSchema = Yup.object({
  content: Yup.string()
    .min(3, 'Must be 6 characters or more')
    .max(200, '200 it is max characters'),
});

function EditCommentForm({ comment, postId, setIsOpen }) {
  const { editCommentsPost } = useFirestore();
  const [, dispatch] = useContext(AppSatateContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleIsOpen() {
    setIsOpen(false);
  }

  const formik = useFormik({
    initialValues: {
      content: comment.content,
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      if (values.content.length > 0) {
        try {
          setLoading(true);
          await editCommentsPost({ comment, postId, content: values.content });
          dispatch({
            type: appStateVars.ALLERT,
            message: 'succes edit comment!',
          });
          dispatch({ type: appStateVars.SHOW_ALLERT });
        } catch {
          setError('Something went wrong');
          dispatch({ type: appStateVars.ALLERT, message: error });
          dispatch({ type: appStateVars.SHOW_ALLERT });
        }
        setLoading(false);
        setIsOpen(false);
        setTimeout(() => {
          dispatch({ type: appStateVars.DONT_SHOW_ALLERT });
        }, 5000);
      }

      values.content = '';
    },
  });
  return (
    <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
      <Container
        jusContent="space-between"
        aliItems="center"
        direction="column"
      >
        {error && <p>Error!!</p>}
        {loading ? (
          <p>Editing comment...</p>
        ) : (
          <>
            <TextField
              fullWidth
              id="content"
              label="Comment"
              color="secondary"
              rows={1}
              variant="outlined"
              error={
                formik.touched.content && formik.errors.content ? true : false
              }
              helperText={
                formik.touched.content && formik.errors.content
                  ? formik.errors.content
                  : null
              }
              {...formik.getFieldProps('content')}
            />
            <Container
              style={{ marginTop: '10px' }}
              aliItems="center"
              jusContent="space-around"
              width="200px"
            >
              {!formik.errors.content && (
                <Button
                  color="primary"
                  type="submit"
                  size="small"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              )}

              <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={handleIsOpen}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </Container>
          </>
        )}
      </Container>
    </form>
  );
}

EditCommentForm.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.string,
  setIsOpen: PropTypes.func,
};

export default EditCommentForm;
