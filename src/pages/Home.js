import { useFirestore } from '../contexts/FirestoreContext';
import NewPostForm from '../components/inputs/NewPostForm';
import { Container } from '../components/containers/flexbox';
import styled from 'styled-components';
import PostCard from '../components/PostCard';

const StyledNewPostForm = styled(NewPostForm)`
  width: 100%;
  max-width: 800px;
`;
const StyledMaxWidth = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const StyledContainerWitchMargin = styled(Container)`
  margin-top: 30px;
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
          {allPosts.length > 0 &&
            allPosts.map((item) => (
              <StyledContainerWitchMargin key={item.id} width="100%">
                <PostCard post={item} />
              </StyledContainerWitchMargin>
            ))}
        </StyledMaxWidth>
      </StyledContainerWitchMargin>
    </div>
  );
}
