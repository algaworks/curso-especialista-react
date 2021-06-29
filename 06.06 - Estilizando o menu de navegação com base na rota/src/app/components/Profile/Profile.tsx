import * as P from './Profile.styles'

export interface ProfileProps {
  name: string;
  description: string;
}

function Profile (props: ProfileProps) {
  return <P.Wrapper tabIndex={0} href={"#"}>
    <P.Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />
    <P.Info>
      <P.Name>{ props.name }</P.Name>
      <P.Description>{ props.description }</P.Description>
    </P.Info>
  </P.Wrapper>
}

export default Profile