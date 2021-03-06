import { useFirestore } from '../contexts/FirestoreContext';
// import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

import NewPostForm from '../components/inputs/NewPostForm';
import PostCard from '../components/PostCard';
import StyledContainerPosts from '../components/StyledComponents/StyledContainerPosts';

import { Container } from '../components/containers/flexbox';
import styled from 'styled-components';

const StyledNewPostForm = styled(NewPostForm)`
  width: 95%;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 10px;
  border-radius: 10px;
  @media handheld, only screen and (min-width: 480px) {
    width: 100%;
    max-width: 500px;
  }
`;
const StyledMaxWidth = styled.div`
  width: 100%;
  @media handheld, only screen and (min-width: 480px) {
    max-width: 80vw;
  }
`;

function Home() {
  const { allPosts } = useFirestore();

  return (
    <Container jusContent="center">
      <StyledMaxWidth>
        <Container jusContent="center">
          <StyledNewPostForm />
        </Container>
        <StyledContainerPosts
          wrap="true"
          aliItems="flex-start"
          jusContent="center"
        >
          {allPosts.length > 0 &&
            allPosts.map((item) => <PostCard key={item.id} post={item} />)}
        </StyledContainerPosts>
      </StyledMaxWidth>
    </Container>
  );
}

export default Home;
