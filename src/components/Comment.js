import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Container } from './containers/flexbox';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';
import EditCommentForm from './inputs/EditCommentForm';

export default function Comment({ comment, postId }) {
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
    <>
      <ListItem alignItems="flex-start">
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
                <Typography component="span" variant="body2" color="primary">
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
            <div>
              <IconButton onClick={handleOpenEdit} color="primary">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleDelete} color="primary">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
