import { useState } from "react";
import { useFirestore } from "../contexts/FirestoreContext";
import { useAuth } from "../contexts/AuthContext";
import ResetPasswordForm from "../components/inputs/ResetPasswordForm";
import PostCard from "../components/PostCard";
import StyledContainerPosts from "../components/StyledComponents/StyledContainerPosts";

import { Container } from "../components/containers/flexbox";
import styled from "styled-components";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const StyledContainer = styled(Container)`
  > *:not(:first-child) {
    margin-top: 20px;
  }
`;

function User() {
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

export default User;
