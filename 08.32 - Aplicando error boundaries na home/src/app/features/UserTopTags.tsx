import { useEffect, useState } from "react";
import styled from "styled-components";
import { Metric } from "../../sdk/@types";
import MetricService from "../../sdk/services/Metric.service";
import CircleChart from "../components/CircleChart";

export default function UserTopTags () {
  const [topTags, setTopTags] = useState<Metric.EditorTagRatio>([])

  useEffect(() => {
    MetricService
      .getTop3Tags()
      .then(setTopTags)
  }, [])

  return <UserTopTagsWrapper>
    {
      topTags.map((tag, i) => {
        return <CircleChart
          key={i}
          progress={tag.percentage}
          caption={tag.tagName}
          theme={i === 0 ? 'primary' : 'default'}
          size={88}
        />
      })
    }
  </UserTopTagsWrapper>
}

const UserTopTagsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`
