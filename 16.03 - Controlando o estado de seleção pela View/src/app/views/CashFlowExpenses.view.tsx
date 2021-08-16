import { Button, Divider, Row, Space, Tooltip, Typography } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import EntriesList from '../features/EntriesList';
import useCashFlow from '../../core/hooks/useCashFlow';
const { Title, Text } = Typography;

export default function CashFlowExpensesView() {
  const { selected, setSelected } = useCashFlow('EXPENSE');
  return (
    <>
      <Row>
        <Button type={'primary'} disabled={!selected.length}>
          Remover
        </Button>
      </Row>
      <Space direction={'vertical'}>
        <Title level={3}>Recuperando entradas do mês de agosto</Title>
        <Space>
          <Text>É possível filtrar lançamentos por mês</Text>
          <Tooltip placement={'right'} title={'Use a coluna Data para filtrar'}>
            <InfoCircleFilled />
          </Tooltip>
        </Space>
      </Space>

      <Divider />

      <EntriesList selected={selected} onSelect={setSelected} />
    </>
  );
}
