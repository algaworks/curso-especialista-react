import { Button, Row, Table } from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';

export default function EntryCategoryManager() {
  return (
    <>
      <Row justify={'space-between'}>
        <Button>Atualizar categorias</Button>
        <Button>Adicionar categoria</Button>
      </Row>
      <Table<CashFlow.CategorySummary> dataSource={[]} />
    </>
  );
}
