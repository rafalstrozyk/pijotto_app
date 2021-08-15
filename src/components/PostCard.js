import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';
import { booleanArrayFindObject } from '../functions/booleanArrayFind';
import EditPostForm from './inputs/EditPostForm';
import { makeStyles } from '@material-ui/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function PostCard({ post, ...rest }) {
  const { likePost, deletePost } = useFirestore();
  const { currentUser } = useAuth();
  const [edited, setEdited] = useState(false);
  const classes = useStyles();
  function handleLike() {
    likePost(post);
  }
  function handleDelete() {
    deletePost(post);
  }

  return (
    <Card classes={classes} {...rest}>
      <CardHeader title={post.nick} subheader={post.created}></CardHeader>
      <CardContent>
        {edited ? (
          <EditPostForm post={post} isEditFunc={setEdited} />
        ) : (
          <Typography
            style={{ wordWrap: 'break-word' }}
            color="textPrimary"
            component="p"
            variant="body1"
          >
            {post.text}
          </Typography>
        )}

        <CardActions>
          <IconButton
            color={
              post.likers &&
              booleanArrayFindObject(post.likers, currentUser.uid, 'userId')
                ? 'inherit'
                : 'primary'
            }
            onClick={handleLike}
          >
            {post.likers &&
            booleanArrayFindObject(post.likers, currentUser.uid, 'userId') ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography
            color={
              post.likers &&
              booleanArrayFindObject(post.likers, currentUser.uid, 'userId')
                ? 'inherit'
                : 'primary'
            }
            variant="button"
          >
            {post.likes}
          </Typography>

          {currentUser && currentUser.uid === post.userId && (
            <div>
              <IconButton color="primary" onClick={() => setEdited(!edited)}>
                <EditIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
}
