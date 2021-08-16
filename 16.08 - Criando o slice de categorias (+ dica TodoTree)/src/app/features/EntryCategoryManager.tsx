import { Button, Row, Table } from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import { useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import useEntriesCategories from '../../core/hooks/useEntriesCategories';

export default function EntryCategoryManager() {
  const { expenses, fetchCategories, revenues } = useEntriesCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Row justify={'space-between'}>
        <Button>Atualizar categorias</Button>
        <Button>Adicionar categoria</Button>
      </Row>
      <Table<CashFlow.CategorySummary>
        dataSource={expenses}
        columns={[
          {
            dataIndex: 'name',
            title: 'Descrição',
          },
          {
            dataIndex: 'totalEntries',
            title: 'Vínculos',
            align: 'right',
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'right',
            render(id: number) {
              return (
                <>
                  <Button
                    danger
                    type={'ghost'}
                    size={'small'}
                    icon={<DeleteOutlined />}
                  />
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}
