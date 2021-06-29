import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { User } from "../../sdk/@types";
import UserService from "../../sdk/services/User.service";
import getEditorDescription from "../../sdk/utils/getEditorDescription";
import Profile from "../components/Profile";

export default function EditorsList () {
  const [editors, setEditors] = useState<User.EditorSummary[]>([])

  useEffect(() => {
    UserService
      .getAllEditors()
      .then(setEditors)
  }, [])

  if (!editors.length)
    return <EditorsListWrapper>
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
    </EditorsListWrapper>

  return <EditorsListWrapper>
    {
      editors.map(editor => {
        return <Profile
          key={editor.id}
          editorId={editor.id}
          name={editor.name}
          description={getEditorDescription(new Date(editor.createdAt))}
          avatarUrl={editor.avatarUrls.small}
        />
      })
    }
  </EditorsListWrapper>
}

const EditorsListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`
