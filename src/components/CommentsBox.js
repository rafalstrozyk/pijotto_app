import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useFirestore } from '../contexts/FirestoreContext';
import Typography from '@material-ui/core/Typography';
import NewCommentForm from './inputs/NewCommentForm';
import List from '@material-ui/core/List';
import Comment from './Comment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '60vh',
  },
}));

const StyledCommentsBox = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  max-width: 1200px;
  width: 800px;
  border-radius: 10px;
  padding: 25px;
  max-height: 80vh;
  > *:not(:last-child) {
    margin-top: 10px;
  }
`;

export default function CommentsBox({ post }) {
  const classes = useStyles();
  const { getCommentsPost } = useFirestore();
  const [postComments, setPostComments] = useState([]);
  useEffect(() => {
    return getCommentsPost(post.id, setPostComments);
  }, [getCommentsPost, post.id]);
  return (
    <StyledCommentsBox>
      <Typography variant="h6" gutterBottom>
        {post.nick}
      </Typography>
      <Typography
        style={{ wordWrap: 'break-word' }}
        color="textPrimary"
        component="p"
        variant="body1"
      >
        {post.text}
      </Typography>
      <NewCommentForm postId={post.id} />
      <List className={classes.root}>
        {postComments.length > 0 &&
          postComments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={post.id} />
          ))}
      </List>
    </StyledCommentsBox>
  );
}
