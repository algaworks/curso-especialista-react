import { Button, Card, DatePicker, Space, Table, Tag, Tooltip } from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import moment from 'moment';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import useCashFlow from '../../core/hooks/useCashFlow';
import transformIntoBrl from '../../core/utils/transformIntoBrl';
import DoubleConfirm from '../components/DoubleConfirm';

interface EntriesListProps {
  onEdit: (entryId: number) => any;
  onDetail: (entryId: number) => any;
}

export default function EntriesList(props: EntriesListProps) {
  const {
    entries,
    fetching,
    fetchEntries,
    setQuery,
    query,
    selected,
    setSelected,
    removeEntry,
  } = useCashFlow('EXPENSE');

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <Table<CashFlow.EntrySummary>
      dataSource={entries}
      loading={fetching}
      rowKey={'id'}
      rowSelection={{
        selectedRowKeys: selected,
        onChange: setSelected,
        getCheckboxProps(record) {
          return !record.canBeDeleted ? { disabled: true } : {};
        },
      }}
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
          render(id: number, record) {
            return (
              <Space>
                <DoubleConfirm
                  popConfirmTitle={'Remover despesa?'}
                  modalTitle={'Deseja mesmo remover essa despesa?'}
                  modalContent={
                    'Remover uma despesa pode gerar um impacto negativo no gráfico de receitas e despesas. Esta ação é irreversível'
                  }
                  onConfirm={async () => {
                    await removeEntry(id);
                  }}
                  disabled={!record.canBeDeleted}
                >
                  <Button
                    type={'text'}
                    size={'small'}
                    icon={<DeleteOutlined />}
                    danger
                  />
                </DoubleConfirm>
                <Button
                  type={'text'}
                  size={'small'}
                  icon={<EditOutlined />}
                  onClick={() => props.onEdit(id)}
                />
                <Button
                  type={'text'}
                  size={'small'}
                  icon={<EyeOutlined />}
                  onClick={() => {
                    props.onDetail(id);
                  }}
                />
              </Space>
            );
          },
        },
      ]}
    />
  );
}
