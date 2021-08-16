import { Button, Space, Table, Tag } from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import moment from 'moment';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import useCashFlow from '../../core/hooks/useCashFlow';
import transformIntoBrl from '../../core/utils/transformIntoBrl';

export default function EntriesList() {
  const { entries, fetchingEntries, fetchEntries } = useCashFlow();

  useEffect(() => {
    fetchEntries({
      type: 'EXPENSE',
      sort: ['transactedOn', 'desc'],
      yearMonth: '2021-08',
    });
  }, [fetchEntries]);

  return (
    <Table<CashFlow.EntrySummary>
      dataSource={entries}
      columns={[
        {
          dataIndex: 'description',
          title: 'Descrição',
          width: 300,
          ellipsis: true,
        },
        {
          dataIndex: 'category',
          title: 'Categoria',
          align: 'center',
          render(category: CashFlow.EntrySummary['category']) {
            return <Tag>{category.name}</Tag>;
          },
        },
        {
          dataIndex: 'transactedOn',
          title: 'Data',
          align: 'center',
          render(transactedOn: CashFlow.EntrySummary['transactedOn']) {
            return moment(transactedOn).format('DD/MM/YYYY');
          },
        },
        {
          dataIndex: 'amount',
          title: 'Valor',
          align: 'right',
          render: transformIntoBrl,
        },
        {
          dataIndex: 'id',
          title: 'Ações',
          align: 'right',
          render(id: number) {
            return (
              <Space>
                <Button
                  type={'text'}
                  size={'small'}
                  icon={<DeleteOutlined />}
                  danger
                />
                <Button type={'text'} size={'small'} icon={<EditOutlined />} />
                <Button type={'text'} size={'small'} icon={<EyeOutlined />} />
              </Space>
            );
          },
        },
      ]}
    />
  );
}
