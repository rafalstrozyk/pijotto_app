import { Card, CardContent, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useFirestore } from '../contexts/FirestoreContext';

const StyledCard = styled(Card)`
  width: 100%;
`;

export default function PostCard({ post }) {
  const { likePost } = useFirestore();
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
        <Button onClick={handleLike}>Like it</Button>
      </CardContent>
    </StyledCard>
  );
}
