import { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';
import { booleanArrayFindObject } from '../functions/booleanArrayFind';
import EditPostForm from './inputs/EditPostForm';

const StyledCard = styled(Card)`
  width: 100%;
`;

export default function PostCard({ post }) {
  const { likePost, deletePost } = useFirestore();
  const { currentUser } = useAuth();
  const [edited, setEdited] = useState(false);
  function handleLike() {
    likePost(post);
  }
  function handleDelete() {
    deletePost(post);
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" compoent="h3">
          {post.nick}
        </Typography>
        <Typography variant="caption">{post.created}</Typography>
        {edited ? (
          <EditPostForm post={post} isEditFunc={setEdited} />
        ) : (
          <Typography variant="body1">{post.text}</Typography>
        )}

        <Typography variant="caption">{post.likes}</Typography>
        {currentUser &&
        post.likers &&
        booleanArrayFindObject(post.likers, currentUser.uid, 'userId') ? (
          <Button onClick={handleLike}>Yopu like this</Button>
        ) : (
          <Button onClick={handleLike}>Like it</Button>
        )}

        {currentUser && currentUser.uid === post.userId && (
          <div>
            <Button onClick={() => setEdited(!edited)}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        )}
      </CardContent>
    </StyledCard>
  );
}
