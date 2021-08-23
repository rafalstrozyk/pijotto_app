import { Container } from '../components/containers/flexbox';
import { Typography, Button } from '@material-ui/core';
import { useFirestore } from '../contexts/FirestoreContext';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import ResetPasswordForm from '../components/inputs/ResetPasswordForm';
import { useState } from 'react';

const StyledContainer = styled(Container)`
  > *:not(:first-child) {
    margin-top: 20px;
  }
`;

export default function User() {
  const { currentUser } = useAuth();
  const { userPersonalData } = useFirestore();
  const [isOpenResetPasswordForm, setIsOpenResetPasswordForm] = useState(false);

  function handleOpenForm() {
    setIsOpenResetPasswordForm(true);
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

          <Button variant="contained" color="secondary">
            All my posts
          </Button>
        </>
      )}
    </StyledContainer>
  );
}
