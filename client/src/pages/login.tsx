import { Container } from '@components/Container'
import { StrictAuth } from '@components/StrictAuth'
import { LoginForm } from '@components/Forms/LoginForm'

const LoginPage = () => {
  return (
    <StrictAuth isRequired={false}>
      <Container className="m-20">
        <LoginForm />
      </Container>
    </StrictAuth>
  )
}

export default LoginPage
