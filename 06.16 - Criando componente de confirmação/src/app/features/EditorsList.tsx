import styled from "styled-components";
import Profile from "../components/Profile";

export default function EditorsList () {
  return <EditorsListWrapper>
    <Profile name="Daniel Bonifacio" description="editor há 8 anos" />
    <Profile name="João Frango" description="editor há 2 anos" />
    <Profile name="Alex Teixeira" description="editor há 2 anos" />
    <Profile name="Camila Vasconcellos" description="editora há 6 anos" />
    <Profile name="Gabriel Freitas" description="editor há 2 meses" />
  </EditorsListWrapper>
}

const EditorsListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`
