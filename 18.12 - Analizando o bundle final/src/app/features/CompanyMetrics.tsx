import { Area, AreaConfig } from '@ant-design/charts';
import { MetricService } from 'danielbonifacio-sdk';
import { ForbiddenError } from 'danielbonifacio-sdk/dist/errors';
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO';
import ptBR from 'date-fns/esm/locale/pt-BR';
import { useEffect } from 'react';
import { useState } from 'react';
import transformDataIntoAntdChart from '../../core/utils/transformDataIntoAntdChart';
import Forbidden from '../components/Forbidden';

export default function CompanyMetrics() {
  const [data, setData] = useState<
    {
      yearMonth: string;
      value: number;
      category: 'totalRevenues' | 'totalExpenses';
    }[]
  >([]);

  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData)
      .catch((err) => {
        if (err instanceof ForbiddenError) {
          setForbidden(true);
          return;
        }
        throw err;
      });
  }, []);

  if (forbidden) return <Forbidden minHeight={256} />;

  const config: AreaConfig = {
    data,
    height: 256,
    color: ['#0099ff', '#274060'],
    areaStyle: { fillOpacity: 1 },
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    legend: {
      itemName: {
        formatter(legend) {
          return legend === 'totalRevenues' ? 'Receitas' : 'Despesas';
        },
      },
    },
    tooltip: {
      title(title) {
        return format(parseISO(title), 'MMMM yyyy', {
          locale: ptBR,
        });
      },
      formatter(data) {
        return {
          name: data.category === 'totalRevenues' ? 'Receitas' : 'Despesas',
          value: (data.value as number).toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            maximumFractionDigits: 2,
          }),
        };
      },
    },
    yAxis: false,
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
