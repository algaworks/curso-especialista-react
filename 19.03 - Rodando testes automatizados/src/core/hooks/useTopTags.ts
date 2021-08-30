import { useCallback, useState } from "react";
import { Metric, MetricService } from "danielbonifacio-sdk";

export default function useTopTags() {
  const [topTags, setTopTags] = useState<Metric.EditorTagRatio>([]);

  const fetchTopTags = useCallback(async function () {
    MetricService.getTop3Tags().then(setTopTags);
  }, []);

  return {
    topTags,
    fetchTopTags,
  };
}
