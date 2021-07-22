import { Post } from "danielbonifacio-sdk";
import styled from "styled-components";

interface FeaturedPostProps {
  postSummary: Post.Summary;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  return (
    <Wrapper>
      <Tags>
        {props.postSummary.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
      <Editor>
        <Avatar src={props.postSummary.editor.avatarUrls.small} />
        <EditorDescription>
          <EditorName>{props.postSummary.editor.name}</EditorName>
          <PostDate>ha 3 dias</PostDate>
        </EditorDescription>
      </Editor>
      <Title>{props.postSummary.title}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.primaryBackground};
  color: ${(p) => p.theme.primaryForeground};
  border-radius: ${(p) => p.theme.borderRadius};

  gap: 24px;

  padding: 32px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  min-height: 256px;
`;

const Tags = styled.ul`
  list-style: none;
  display: flex;
  gap: 8px;
`;

const Tag = styled.li`
  background-color: ${(p) => p.theme.activeElementBackground};
  color: ${(p) => p.theme.activeElementForeground};
  border-radius: ${(p) => p.theme.borderRadius};

  text-transform: lowercase;
  padding: 4px 12px;
  cursor: default;
`;

const Editor = styled.div`
  display: flex;
  gap: 16px;
`;

const EditorDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PostDate = styled.p`
  font-size: 12px;
`;

const EditorName = styled.p`
  font-size: 14px;
  font-weight: 700;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 0 0 4px ${(p) => p.theme.primaryForeground};
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;
