import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import NewCommentForm from './inputs/NewCommentForm';



const StyledCommentBox = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  max-width: 1200px;
  width: 800px;
  border-radius: 10px;
  padding: 25px;
`;

export default function CommentBox({ post }) {
    
  return (
    <StyledCommentBox>
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
      <NewCommentForm />
    </StyledCommentBox>
  );
}
