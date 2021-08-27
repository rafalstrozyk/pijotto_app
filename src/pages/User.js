import { Container } from '../components/containers/flexbox';
import { Typography, Button } from '@material-ui/core';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import ResetPasswordForm from '../components/inputs/ResetPasswordForm';
import { useState } from 'react';
import StyledContainerPosts from '../components/StyledComponents/StyledContainerPosts';
import PostCard from '../components/PostCard';

const StyledContainer = styled(Container)`
  > *:not(:first-child) {
    margin-top: 20px;
  }
`;


export default function User() {
  const { currentUser } = useAuth();
  const { userPersonalData, userPosts, getUserPosts } = useFirestore();
  const [isOpenResetPasswordForm, setIsOpenResetPasswordForm] = useState(false);

  function handleOpenForm() {
    setIsOpenResetPasswordForm(true);
  }

  function handleGetUserPosts() {
    getUserPosts();
  }

  return (
    <StyledContainer aliItems="center" direction="column">
      {currentUser && userPersonalData && (
        <>
          <div>
            <Typography variant="body1">
              nick: {userPersonalData.nick}
            </Typography>
            <Typography variant="body1">email: {currentUser.email}</Typography>
            <Typography variant="body1">uid: {currentUser.uid}</Typography>
          </div>
          <Button
            variant="contained"
            onClick={handleOpenForm}
            color="secondary"
          >
            reset password
          </Button>
          {isOpenResetPasswordForm && (
            <ResetPasswordForm handleIsOpenFunc={setIsOpenResetPasswordForm} />
          )}

          <Button
            variant="contained"
            onClick={handleGetUserPosts}
            color="secondary"
          >
            All my posts
          </Button>
          <StyledContainerPosts
            wrap="true"
            aliItems="flex-start"
            jusContent="center"
          >
            {userPosts.length > 0 &&
              userPosts.map((post) => <PostCard key={post.id} post={post} />)}
          </StyledContainerPosts>
        </>
      )}
    </StyledContainer>
  );
}
