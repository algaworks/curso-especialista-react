import { Line } from '@ant-design/charts';
import { MetricService } from 'danielbonifacio-sdk';
import { useEffect } from 'react';
import { useState } from 'react';
import transformDataIntoAntdChart from '../../core/utils/transformDataIntoAntdChart';

export default function CompanyMetrics() {
  const [data, setData] = useState<
    {
      yearMonth: string;
      value: number;
      category: 'totalRevenues' | 'totalExpenses';
    }[]
  >([]);

  useEffect(() => {
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData);
  }, []);

  const config = {
    data,
    height: 400,
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  return <Line {...config} />;
}
