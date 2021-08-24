import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { Container } from '../containers/flexbox';
import SendIcon from '@material-ui/icons/Send';
import { useFirestore } from '../../contexts/FirestoreContext';
import Button from '@material-ui/core/Button';

const validationSchema = Yup.object({
  content: Yup.string()
    .min(3, 'Must be 6 characters or more')
    .max(200, '200 it is max characters')
    .required(),
});

export default function NewCommentForm({ postId }) {
  const { sendCommentForPost } = useFirestore();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('test comment');
      setError(null);
      try {
        setLoading(true);
        await sendCommentForPost({ postId, content: values.content });
      } catch {
        setError('Something went wrong');
      }
      setLoading(false);
      values.content = '';
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
