import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { Container } from '../containers/flexbox';
import SendIcon from '@material-ui/icons/Send';
import { useFirestore } from '../../contexts/FirestoreContext';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  > *:not(:first-child) {
    margin-left: 10px;
  }
`;

const validationSchema = Yup.object({
  content: Yup.string()
    .min(3, 'Must be 6 characters or more')
    .max(200, '200 it is max characters')
    .required(),
});

export default function EditCommentForm({ comment, postId, setIsOpen }) {
  const { editCommentsPost } = useFirestore();
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
      try {
        setLoading(true);
        await editCommentsPost({ comment, postId, content: values.content });
      } catch {
        setError('Something went wrong');
      }
      setLoading(false);
      setIsOpen(false);
      values.content = '';
    },
  });
  return (
    <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
      <StyledContainer jusContent="space-between" aliItems="center">
        {error && <p>Error!!</p>}
        {loading ? (
          <p>Editing comment...</p>
        ) : (
          <>
            <TextField
              fullWidth
              id="content"
              label="Comment"
              color="primary"
              rows={1}
              variant="outlined"
              {...formik.getFieldProps('content')}
            />
            <Button
              color="primary"
              type="submit"
              size="small"
              variant="contained"
              startIcon={<SendIcon />}
            >
              Send
            </Button>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleIsOpen}
              startIcon={<CancelIcon />}
            >
              Candel
            </Button>
          </>
        )}
      </StyledContainer>
    </form>
  );
}
