import { Area, AreaConfig } from '@ant-design/charts';
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

  const config: AreaConfig = {
    data,
    height: 400,
    color: ['#274060', '#0099ff'],
    areaStyle: { fillOpacity: 1 },
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    point: {
      size: 5,
      shape: 'circle',
    },
  };
  return <Area {...config} />;
}
