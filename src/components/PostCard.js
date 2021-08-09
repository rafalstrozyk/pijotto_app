import { Card, CardContent, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';
import { booleanArrayFindObject } from '../functions/booleanArrayFind';

const StyledCard = styled(Card)`
  width: 100%;
`;

export default function PostCard({ post }) {
  const { likePost } = useFirestore();
  const { currentUser } = useAuth();
  function handleLike() {
    likePost(post);
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" compoent="h3">
          {post.nick}
        </Typography>
        <Typography variant="caption">{post.created}</Typography>
        <Typography variant="body1">{post.text}</Typography>
        <Typography variant="caption">{post.likes}</Typography>
        {currentUser &&
        post.likers &&
        booleanArrayFindObject(post.likers, currentUser.uid, 'userId') ? (
          <Typography>You like this</Typography>
        ) : (
          <Button onClick={handleLike}>Like it</Button>
        )}
      </CardContent>
    </StyledCard>
  );
}
