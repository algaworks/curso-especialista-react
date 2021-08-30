import * as P from './Profile.styles'

export interface ProfileProps {
  name: string;
  description: string;
  editorId: number;
  avatarUrl?: string;
}

function Profile (props: ProfileProps) {
  return <P.Wrapper tabIndex={0} to={`/editores/${props.editorId}`}>
    <P.Avatar src={props.avatarUrl} />
    <P.Info>
      <P.Name>{ props.name }</P.Name>
      <P.Description>{ props.description }</P.Description>
    </P.Info>
  </P.Wrapper>
}

export default Profile