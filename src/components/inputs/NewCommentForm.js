import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Container } from '../containers/flexbox';
import SendIcon from '@material-ui/icons/Send';

const validationSchema = Yup.object({
  comment: Yup.string()
    .min(3, 'Must be 6 characters or more')
    .max(200, '200 it is max characters')
    .required(),
});

export default function NewCommentForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('submit');
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Container jusContent="center" aliItems="center">
        <TextField
          fullWidth
          id="comment"
          label="Comment"
          color="primary"
          multiline
          rows={1}
          variant="outlined"
          {...formik.getFieldProps('comment')}
        />
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </Container>
    </form>
  );
}
