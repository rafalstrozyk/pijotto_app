import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import { useFirestore } from '../contexts/FirestoreContext';
import EditCommentForm from './inputs/EditCommentForm';
import styled from 'styled-components';

import ListItem from '@material-ui/core/ListItem';
// import Divider from "@material-ui/core/Divider";
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { Container } from './containers/flexbox';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const StyledContainerForEditButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: end;

  align-items: center;
  @media only screen and (max-width: 480px) {
    width: 40px;
  }
`;

const StyledListItem = styled(ListItem)`
  background-color: ${({ theme }) => theme.palette.primary.main + 'CC'};
  border-radius: 10px;
`;
function Comment({ comment, postId }) {
  const { currentUser } = useAuth();
  const { deleteCommentPost } = useFirestore();
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  function handleDelete() {
    deleteCommentPost(postId, comment);
  }

  function handleOpenEdit() {
    setIsOpenEdit(true);
  }

  return (
    <StyledListItem alignItems="flex-start">
      {!isOpenEdit && (
        <ListItemText
          primary={
            <Container aliItems="center" jusContent="space-between">
              <Typography variant="subtitle1" gutterBottom>
                {comment.nick}
              </Typography>

              <Typography variant="caption">{comment.created}</Typography>
            </Container>
          }
          secondary={
            <>
              <Typography component="span" variant="body2" color="secondary">
                {comment.content}
              </Typography>
            </>
          }
        />
      )}

      {isOpenEdit && (
        <Container
          width="100%"
          aliItems="center"
          jusContent="space-between"
          direction="column"
        >
          <ListItemText
            primary={
              <Container aliItems="center" jusContent="space-between">
                <Typography variant="subtitle1" gutterBottom>
                  {comment.nick}
                </Typography>
                <Typography style={{ marginLeft: '10px' }} variant="caption">
                  {comment.created}
                </Typography>
              </Container>
            }
          />
          <EditCommentForm
            comment={comment}
            postId={postId}
            setIsOpen={setIsOpenEdit}
          />
        </Container>
      )}
      {currentUser &&
        comment &&
        comment.userId === currentUser.uid &&
        !isOpenEdit && (
          <StyledContainerForEditButtons>
            <IconButton onClick={handleOpenEdit} color="secondary">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleDelete} color="secondary">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </StyledContainerForEditButtons>
        )}
    </StyledListItem>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.string,
};

export default Comment;
