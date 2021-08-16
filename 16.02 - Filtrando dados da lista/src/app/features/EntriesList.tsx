import { Button, Card, DatePicker, Space, Table, Tag, Tooltip } from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import moment from 'moment';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import useCashFlow from '../../core/hooks/useCashFlow';
import transformIntoBrl from '../../core/utils/transformIntoBrl';

export default function EntriesList() {
  const { entries, fetchingEntries, fetchEntries, setQuery, query } =
    useCashFlow('EXPENSE');

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <Table<CashFlow.EntrySummary>
      dataSource={entries}
      loading={fetchingEntries}
      columns={[
        {
          dataIndex: 'description',
          title: 'Descrição',
          width: 300,
          ellipsis: true,
          render(description: CashFlow.EntrySummary['description']) {
            return <Tooltip title={description}>{description}</Tooltip>;
          },
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
          filterDropdown() {
            return (
              <Card>
                <DatePicker.MonthPicker
                  format={'YYYY - MMMM'}
                  allowClear={false}
                  onChange={(date) => {
                    setQuery({
                      ...query,
                      yearMonth:
                        date?.format('YYYY-MM') || moment().format('YYYY-MM'),
                    });
                  }}
                />
              </Card>
            );
          },
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
