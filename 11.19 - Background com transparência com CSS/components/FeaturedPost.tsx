import { Post } from "danielbonifacio-sdk";
import styled from "styled-components";
import Avatar from "./Avatar";

interface FeaturedPostProps {
  postSummary: Post.Summary;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  return (
    <Wrapper>
      <BgImage bg={props.postSummary.imageUrls.medium} />
      <Content>
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
      </Content>
    </Wrapper>
  );
}

const Content = styled.div`
  position: relative;
  gap: 24px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BgImage = styled.div<{ bg: string }>`
  background-image: url(${(p) => p.bg});
  position: absolute;
  inset: 0;
  background-color: blue;
  z-index: 0;
  opacity: 0.05;
`;

const Wrapper = styled.div`
  position: relative;
  background-color: ${(p) => p.theme.primaryBackground};
  color: ${(p) => p.theme.primaryForeground};
  border-radius: ${(p) => p.theme.borderRadius};

  overflow: hidden;

  padding: 32px;
  width: 100%;
  min-height: 256px;

  display: flex;
  align-items: center;
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
  padding: 4px 8px;
  cursor: default;
  font-size: 12px;
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

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;
