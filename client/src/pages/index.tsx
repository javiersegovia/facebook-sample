import { Container } from '@components/Container'
import { Feed } from '@components/Feed'
import { CreatePost } from '@components/Posts/CreatePost'
import { StrictAuth } from '@components/StrictAuth'

const IndexPage = () => {
  return (
    <StrictAuth>
      <Container className="pt-10 max-w-lg">
        <CreatePost />
        <Feed />
      </Container>
    </StrictAuth>
  )
}

export default IndexPage
