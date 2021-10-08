import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from '../contexts/FirestoreContext';
import NewCommentForm from './inputs/NewCommentForm';
import Comment from './Comment';

import styled from 'styled-components';
import { Container } from './containers/flexbox';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '60vh',
    marginTop: '15px',
  },
}));

const StyledCommentsBox = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  max-width: 1200px;
  width: 100vw;
  border-radius: 10px;
  padding: 25px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    width: 90%;
    :not(:last-child) {
      margin-top: 10px;
    }
  }

  .list-items-marg {
    & > *:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  @media only screen and (min-width: 850px) {
    width: 800px;
    max-height: 80vh;
    > * {
      width: 100%;
    }
  }
`;

function CommentsBox({ post, setOpen }) {
  const classes = useStyles();
  const { getCommentsPost } = useFirestore();
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    return getCommentsPost(post.id, setPostComments);
  }, [getCommentsPost, post.id]);

  function handleSetOpenClose() {
    setOpen(false);
  }

  return (
    <StyledCommentsBox>
      <Container jusContent="space-between" aliItems="center">
        <Typography variant="h6" gutterBottom>
          {post.nick}
        </Typography>
        <IconButton onClick={handleSetOpenClose} color="primary">
          <CancelIcon />
        </IconButton>
      </Container>
      <Typography
        style={{ wordWrap: 'break-word' }}
        color="textPrimary"
        component="p"
        variant="body1"
      >
        {post.text}
      </Typography>
      <NewCommentForm postId={post.id} />
      <List className={`${classes.root} list-items-marg`}>
        {postComments.length > 0 &&
          postComments.map((comment) => (
            <Comment key={comment.id} comment={comment} postId={post.id} />
          ))}
      </List>
    </StyledCommentsBox>
  );
}

CommentsBox.propTypes = {
  post: PropTypes.object,
  setOpen: PropTypes.func,
};

export default CommentsBox;
