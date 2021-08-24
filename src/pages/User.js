import { Container } from '../components/containers/flexbox';
import { Typography, Button } from '@material-ui/core';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import ResetPasswordForm from '../components/inputs/ResetPasswordForm';
import { useState } from 'react';
import PostCard from '../components/PostCard';

const StyledContainer = styled(Container)`
  > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const StyledContainerPosts = styled(Container)`
  > * {
    margin-top: 10px;
    @media only screen and (min-width: 480px) {
      margin-top: 30px;
      margin-left: 10px;
      margin-right: 10px;
    }
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
            <Typography variant="h6">nick: {userPersonalData.nick}</Typography>
            <Typography variant="h6">email: {currentUser.email}</Typography>
            <Typography variant="h6">uid: {currentUser.uid}</Typography>
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
