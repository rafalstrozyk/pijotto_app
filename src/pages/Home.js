import { useFirestore } from '../contexts/FirestoreContext';
import NewPostForm from '../components/inputs/NewPostForm';
import { Container } from '../components/containers/flexbox';
import styled from 'styled-components';
import PostCard from '../components/PostCard';

const StyledNewPostForm = styled(NewPostForm)`
  width: 100%;
  max-width: 500px;
`;
const StyledMaxWidth = styled.div`
  max-width: 80vw;
  width: 100%;
`;

const StyledContainerWitchMargin = styled(Container)`
  margin-top: 30px;
`;

const StyledContainerPosts = styled(Container)`
  > * {
    margin-top: 30px;

    margin-left: 10px;
    margin-right: 10px;
  }
`;

const StyledPostCard = styled(PostCard)`
  width: 100%;
  max-width: calc(1200px / 4);
`;

export default function Home() {
  const { allPosts } = useFirestore();

  return (
    <div>
      <StyledContainerWitchMargin jusContent="center">
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
              allPosts.map((item) => (
                <StyledPostCard key={item.id} post={item} />
              ))}
          </StyledContainerPosts>
        </StyledMaxWidth>
      </StyledContainerWitchMargin>
    </div>
  );
}
