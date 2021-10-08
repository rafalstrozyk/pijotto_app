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
  @media only screen and (min-width: 480px) {
    width: 100%;
    max-width: 500px;
  }
`;
const StyledMaxWidth = styled.div`
  width: 100%;
  @media only screen and (min-width: 480px) {
    max-width: 80vw;
  }
`;

// const StyledGrid = styled.div`
//   width: 1250px;
//   display: grid;
//   grid-template-columns: 33.333% 33.333% 33.333%;
//   grid-auto-rows: min-content;
//   align-items: start;
//   > * {
//     margin-top: 10px;
//   }
// `;
// const ResponsiveGridLayout = WidthProvider(Responsive);

function Home() {
  const { allPosts } = useFirestore();

  return (
    <Container jusContent="center">
      <StyledMaxWidth>
        <Container jusContent="center">
          <StyledNewPostForm />
        </Container>
        {/* <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, sm: 768, xs: 480 }}
          cols={{ lg: 1, sm: 2, xs: 1 }}
        > */}
        {/* <StyledGrid>
          
        </StyledGrid> */}
        {/* </ResponsiveGridLayout> */}
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
