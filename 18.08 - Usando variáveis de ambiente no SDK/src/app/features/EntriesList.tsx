import {
  Button,
  Card,
  DatePicker,
  Descriptions,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import { CashFlow } from 'danielbonifacio-sdk';
import moment from 'moment';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import useCashFlow from '../../core/hooks/useCashFlow';
import transformIntoBrl from '../../core/utils/transformIntoBrl';
import DoubleConfirm from '../components/DoubleConfirm';
import { useHistory, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';
import Forbidden from '../components/Forbidden';

interface EntriesListProps {
  onEdit: (entryId: number) => any;
  onDetail: (entryId: number) => any;
  type: 'EXPENSE' | 'REVENUE';
}

export default function EntriesList(props: EntriesListProps) {
  const { type } = props;
  const location = useLocation();
  const history = useHistory();
  const {
    entries,
    fetching,
    fetchEntries,
    setQuery,
    selected,
    setSelected,
    removeEntry,
  } = useCashFlow(type);

  const [forbidden, setForbidden] = useState(false);

  const didMount = useRef(false);

  useEffect(() => {
    fetchEntries().catch((err) => {
      if (err?.data?.status === 403) {
        setForbidden(true);
        return;
      }
      throw err;
    });
  }, [fetchEntries]);

  useEffect(() => {
    if (didMount.current) {
      const params = new URLSearchParams(location.search);
      const yearMonth = params.get('yearMonth');
      if (yearMonth) setQuery({ yearMonth });
    } else {
      didMount.current = true;
    }
  }, [location.search, setQuery]);

  if (forbidden) return <Forbidden />;

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
          dataIndex: 'id',
          title: type === 'EXPENSE' ? 'Despesas' : 'Receitas',
          responsive: ['xs'],
          render(_, record) {
            return (
              <>
                <Descriptions column={1}>
                  <Descriptions.Item label={'Descrição'}>
                    {record.description}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Categoria'}>
                    {record.category.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Data'}>
                    {moment(record.transactedOn).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Valor'}>
                    {transformIntoBrl(record.amount)}
                  </Descriptions.Item>
                </Descriptions>
                <Space>
                  <DoubleConfirm
                    popConfirmTitle={
                      type === 'EXPENSE'
                        ? 'Remover despesa?'
                        : 'Remover receita?'
                    }
                    modalTitle={
                      type === 'EXPENSE'
                        ? 'Deseja mesmo remover essa despesa?'
                        : 'Deseja mesmo remover esta receita?'
                    }
                    modalContent={
                      type === 'EXPENSE'
                        ? 'Remover uma despesa pode gerar um impacto negativo no gráfico de receitas e despesas. Esta ação é irreversível'
                        : 'Remover uma receita pode gerar um impacto negativo no gráfico de receitas e despesas. Esta ação é irreversível'
                    }
                    onConfirm={async () => {
                      await removeEntry(record.id);
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
                    onClick={() => props.onEdit(record.id)}
                  />
                  <Button
                    type={'text'}
                    size={'small'}
                    icon={<EyeOutlined />}
                    onClick={() => {
                      props.onDetail(record.id);
                    }}
                  />
                </Space>
              </>
            );
          },
        },
        {
          dataIndex: 'description',
          title: 'Descrição',
          width: 300,
          ellipsis: true,
          responsive: ['sm'],
          render(description: CashFlow.EntrySummary['description']) {
            return <Tooltip title={description}>{description}</Tooltip>;
          },
        },
        {
          dataIndex: 'category',
          title: 'Categoria',
          align: 'center',
          width: 120,
          responsive: ['sm'],
          render(category: CashFlow.EntrySummary['category']) {
            return <Tag>{category.name}</Tag>;
          },
        },
        {
          dataIndex: 'transactedOn',
          title: 'Data',
          align: 'center',
          responsive: ['sm'],
          width: 120,
          filterDropdown() {
            return (
              <Card>
                <DatePicker.MonthPicker
                  format={'YYYY - MMMM'}
                  allowClear={false}
                  onChange={(date) => {
                    history.push({
                      search: `yearMonth=${
                        date?.format('YYYY-MM') || moment().format('YYYY-MM')
                      }`,
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
          width: 120,
          responsive: ['sm'],
          render: transformIntoBrl,
        },
        {
          dataIndex: 'id',
          title: 'Ações',
          align: 'right',
          responsive: ['sm'],
          width: 120,
          render(id: number, record) {
            return (
              <Space>
                <DoubleConfirm
                  popConfirmTitle={
                    type === 'EXPENSE' ? 'Remover despesa?' : 'Remover receita?'
                  }
                  modalTitle={
                    type === 'EXPENSE'
                      ? 'Deseja mesmo remover essa despesa?'
                      : 'Deseja mesmo remover esta receita?'
                  }
                  modalContent={
                    type === 'EXPENSE'
                      ? 'Remover uma despesa pode gerar um impacto negativo no gráfico de receitas e despesas. Esta ação é irreversível'
                      : 'Remover uma receita pode gerar um impacto negativo no gráfico de receitas e despesas. Esta ação é irreversível'
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
                    disabled={!record.canBeDeleted}
                    danger
                  />
                </DoubleConfirm>
                <Button
                  type={'text'}
                  size={'small'}
                  icon={<EditOutlined />}
                  disabled={!record.canBeEdited}
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
