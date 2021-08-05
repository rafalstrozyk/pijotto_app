import { Card, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 100%;
`;

export default function PostCard({ post }) {
  //   const date = moment(post.created.toDate()).format(
  //     'dddd, MMMM Do YYYY, h:mm a'
  //   );
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" compoent="h3">
          {post.nick}
        </Typography>
        <Typography variant="caption">{post.created}</Typography>
        <Typography variant="body1">{post.text}</Typography>
        <Typography variant="caption">{post.likes}</Typography>
      </CardContent>
    </StyledCard>
  );
}
