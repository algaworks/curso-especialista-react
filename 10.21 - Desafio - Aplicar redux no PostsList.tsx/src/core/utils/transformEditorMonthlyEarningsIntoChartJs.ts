import { ChartProps } from "../../app/components/Chart/Chart";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { ptBR } from "date-fns/locale";
import { Metric } from "danielbonifacio-sdk";

function transformEditorMonthlyEaningsIntoChartJs(
  editorEarnings: Metric.EditorMonthlyEarnings
): ChartProps["data"] {
  const labels: string[] = [];
  const data1: number[] = [];
  const data2: number[] = [];

  editorEarnings.forEach((earning) => {
    const formattedMonth = format(parseISO(earning.yearMonth), "MMMM", {
      locale: ptBR,
    });
    labels.push(formattedMonth);
    data1.push(earning.totalAmount);
    data2.push(earning.totalPlatformAverageAmount);
  });

  return {
    labels,
    datasets: [
      {
        label: "Performance pessoal",
        data: data1,
        fill: true,
        backgroundColor: "#0099FF",
        borderColor: "#0099FF",
        borderWidth: 0.5,
      },
      {
        label: "Performance média do time",
        data: data2,
        fill: true,
        backgroundColor: "#274060",
        borderColor: "#274060",
        borderWidth: 0.5,
      },
    ],
  };
}

export default transformEditorMonthlyEaningsIntoChartJs;
