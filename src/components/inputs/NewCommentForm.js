import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { Container } from '../containers/flexbox';
import SendIcon from '@material-ui/icons/Send';
import { useFirestore } from '../../contexts/FirestoreContext';
import Button from '@material-ui/core/Button';
import { AppSatateContext } from '../../contexts/AppStateContext';
import { appStateVars } from '../../unchangingVars';

const validationSchema = Yup.object({
  content: Yup.string()
    .min(3, 'Must be 6 characters or more')
    .max(200, '200 it is max characters'),
});

export default function NewCommentForm({ postId }) {
  const { sendCommentForPost } = useFirestore();
  const [, dispatch] = useContext(AppSatateContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        setLoading(true);
        await sendCommentForPost({ postId, content: values.content });
        dispatch({
          type: appStateVars.ALLERT,
          message: 'Succes send comment!',
        });
        dispatch({ type: appStateVars.SHOW_ALLERT });
      } catch {
        setError('Something went wrong');
        dispatch({ type: appStateVars.ALLERT, message: error, isError: true });
        dispatch({ type: appStateVars.SHOW_ALLERT });
      }
      setLoading(false);
      values.content = '';
      setTimeout(() => {
        dispatch({ type: appStateVars.DONT_SHOW_ALLERT });
      }, 5000);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Container jusContent="center" aliItems="center">
        {error && <p>Error!!</p>}
        {loading ? (
          <p>Sending message...</p>
        ) : (
          <>
            <TextField
              fullWidth
              id="content"
              label="Comment"
              color="primary"
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
            <Button
              color="primary"
              type="submit"
              variant="contained"
              startIcon={<SendIcon />}
              style={{ marginLeft: '10px' }}
            >
              Send
            </Button>
          </>
        )}
      </Container>
    </form>
  );
}
