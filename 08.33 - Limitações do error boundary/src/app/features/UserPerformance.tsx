import { useEffect, useState } from "react"
import transformEditorMonthlyEaningsIntoChartJs from "../../core/utils/transformEditorMonthlyEarningsIntoChartJs"
import MetricService from "../../sdk/services/Metric.service"
import Chart, { ChartProps } from "../components/Chart/Chart"
import ErrorBoundary from "../components/ErrorBoundary"

export default function UserPerformance () {
  const [editorEarnings, setEditorEarings] = useState<ChartProps['data']>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    MetricService
      .getEditorMonthlyEarnings()
      .then(transformEditorMonthlyEaningsIntoChartJs)
      .then(setEditorEarings)
      .catch(error => {
        setError(new Error(error.message))
      })
  }, [])

  if (error)
    throw error

  if (!editorEarnings)
    return null

  return <ErrorBoundary component={'performance do usuario'}>
    <Chart
      title="batata"
      data={editorEarnings}
    />
  </ErrorBoundary>
}