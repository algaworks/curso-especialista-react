import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import useTopTags from "../../core/hooks/useTopTags";
import CircleChart from "../components/CircleChart";

export default function UserTopTags() {
  const { topTags, fetchTopTags } = useTopTags();

  useEffect(() => {
    fetchTopTags();
  }, [fetchTopTags]);

  if (!topTags.length)
    return (
      <UserTopTagsWrapper>
        <Skeleton height={88} width={88} circle />
        <Skeleton height={88} width={88} circle />
        <Skeleton height={88} width={88} circle />
      </UserTopTagsWrapper>
    );

  return (
    <UserTopTagsWrapper>
      {topTags.map((tag, i) => {
        return (
          <CircleChart
            key={i}
            progress={tag.percentage}
            caption={tag.tagName}
            theme={i === 0 ? "primary" : "default"}
            size={88}
          />
        );
      })}
    </UserTopTagsWrapper>
  );
}

const UserTopTagsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`;
