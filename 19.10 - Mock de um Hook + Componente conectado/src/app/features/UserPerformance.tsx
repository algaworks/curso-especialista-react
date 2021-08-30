import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import withBoundary from "../../core/hoc/withBoundary";
import usePerformance from "../../core/hooks/usePerformance";
import Chart from "../components/Chart/Chart";

function UserPerformance() {
  const { fetchPerformance, performance } = usePerformance();

  useEffect(() => {
    fetchPerformance();
  }, [fetchPerformance]);

  if (!performance)
    return (
      <div>
        <Skeleton height={227} />
      </div>
    );

  return (
    <Chart
      title="Média de performance nos últimos 12 meses"
      data={performance}
    />
  );
}

export default withBoundary(UserPerformance, "Batata");
