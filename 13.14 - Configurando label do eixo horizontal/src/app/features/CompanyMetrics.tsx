import { Area, AreaConfig } from '@ant-design/charts';
import { MetricService } from 'danielbonifacio-sdk';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
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
    color: ['#0099ff', '#274060'],
    areaStyle: { fillOpacity: 1 },
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    legend: {
      itemName: {
        formatter(legend) {
          return legend === 'totalRevenues'
            ? 'Receitas'
            : 'Despesas';
        },
      },
    },
    xAxis: {
      label: {
        formatter(item) {
          return format(parseISO(item), 'MM/yyyy');
        },
      },
    },
    point: {
      size: 5,
      shape: 'circle',
    },
  };
  return <Area {...config} />;
}
