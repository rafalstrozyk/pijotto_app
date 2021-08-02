import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useFirestore } from '../../contexts/FirestoreContext';
import { useAuth } from '../../contexts/AuthContext';

export default function NewPostForm() {
  const { currentUser } = useAuth();
  const { sendPost } = useFirestore();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async (values) => {
      try {
        if (currentUser) {
          console.log(values);
          await sendPost(values, currentUser.uid);
          console.log('Ok succes');
        }
      } catch {
        console.log('error');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="text"
        label="Post content"
        multiline
        rows={4}
        variant="outlined"
        {...formik.getFieldProps('text')}
      />
      <Button color="secondary" variant="contained" type="submit">
        Post
      </Button>
    </form>
  );
}
