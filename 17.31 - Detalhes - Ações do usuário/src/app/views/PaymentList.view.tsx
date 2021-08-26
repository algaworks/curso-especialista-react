import {
  Button,
  DatePicker,
  Descriptions,
  notification,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import { Payment } from 'danielbonifacio-sdk';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import usePayments from '../../core/hooks/usePayments';
import confirm from 'antd/lib/modal/confirm';
import { SorterResult } from 'antd/lib/table/interface';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import DoubleConfirm from '../components/DoubleConfirm';
import { Link } from 'react-router-dom';
import Forbidden from '../components/Forbidden';
import useBreadcrumb from '../../core/hooks/useBreadcrumb';

export default function PaymentListView() {
  useBreadcrumb('Pagamentos/Consulta');
  const { xs } = useBreakpoint();
  const {
    payments,
    fetching,
    query,
    selected,
    fetchPayments,
    setQuery,
    approvePaymentsInBatch,
    setSelected,
    deleteExistingPayment,
  } = usePayments();

  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    fetchPayments().catch((err) => {
      if (err?.data?.status === 403) {
        setForbidden(true);
        return;
      }
      throw err;
    });
  }, [fetchPayments]);

  if (forbidden) return <Forbidden />;

  return (
    <>
      <Row justify={'space-between'} gutter={24}>
        <Space
          style={{
            width: '100%',
            ...(!xs && { justifyContent: 'space-between' }),
          }}
          direction={xs ? 'vertical' : 'horizontal'}
        >
          <DoubleConfirm
            popConfirmTitle={
              selected.length === 1
                ? 'Você deseja aprovar o agendamento selecionado?'
                : 'Você deseja aprovar os agendamentos selecionados?'
            }
            disabled={selected.length === 0}
            modalTitle={'Aprovar agendamento'}
            modalContent={
              'Esta é uma ação irreversível. Ao aprovar um agendamento, ele não poderá ser removido!'
            }
            onConfirm={async () => {
              await approvePaymentsInBatch(selected as number[]);
              notification.success({
                message: 'Os pagamentos selecionados foram aprovados',
              });
            }}
          >
            <Button
              block={xs}
              type={'primary'}
              disabled={selected.length === 0}
            >
              Aprovar agendamentos
            </Button>
          </DoubleConfirm>
          <DatePicker.MonthPicker
            style={{ width: xs ? '100%' : 240 }}
            format={'MMMM - YYYY'}
            placeholder={'Filtrar por mês'}
            onChange={(date) => {
              setQuery({
                scheduledToYearMonth: date ? date.format('YYYY-MM') : undefined,
              });
            }}
          />
        </Space>
      </Row>
      <Table<Payment.Summary>
        dataSource={payments?.content}
        rowKey='id'
        loading={fetching}
        onChange={(p, f, sorter) => {
          const { order } = sorter as SorterResult<Payment.Summary>;
          const direction = order?.replace('end', '');
          if (direction && direction !== query.sort![1])
            setQuery({
              sort: [query.sort![0], direction as 'asc' | 'desc'],
            });
        }}
        pagination={{
          current: query.page ? query.page + 1 : 1,
          onChange: (page) => setQuery({ page: page - 1 }),
          total: payments?.totalElements,
          pageSize: query.size,
        }}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: setSelected,
          getCheckboxProps(payment) {
            return !payment.canBeApproved ? { disabled: true } : {};
          },
        }}
        columns={[
          {
            title: 'Agendamentos',
            responsive: ['xs'],
            render(payment: Payment.Summary) {
              return (
                <Descriptions column={1} size={'small'}>
                  <Descriptions.Item label={'Editor'}>
                    {payment.payee.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Agendamento'}>
                    {moment(payment.scheduledTo).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Período'}>
                    {(() => {
                      const starts = moment(
                        payment.accountingPeriod.startsOn
                      ).format('DD/MM/YYYY');
                      const ends = moment(
                        payment.accountingPeriod.endsOn
                      ).format('DD/MM/YYYY');
                      return `${starts} - ${ends}`;
                    })()}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Status'}>
                    <Tag color={payment.approvedAt ? 'green' : 'warning'}>
                      {payment.approvedAt
                        ? `Aprovado em ${moment(payment.approvedAt).format(
                            'DD/MM/YYYY'
                          )}`
                        : 'Aguardando aprovação'}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label={'Ações'}>
                    <Tooltip title={'Detalhar'} placement={xs ? 'top' : 'left'}>
                      <Link to={`/pagamentos/${payment.id}`}>
                        <Button size={'small'} icon={<EyeOutlined />} />
                      </Link>
                    </Tooltip>
                    <Popconfirm
                      title='Remover agendamento?'
                      disabled={!payment.canBeDeleted}
                      onConfirm={() => {
                        confirm({
                          title: 'Remover agendamento',
                          cancelText: 'Cancelar',
                          onOk() {
                            deleteExistingPayment(payment.id);
                          },
                          content:
                            'Esta é uma ação irreversível. Ao remover um agendamento, ele não poderá ser recuperado!',
                        });
                      }}
                    >
                      <Tooltip
                        title={
                          payment.canBeDeleted
                            ? 'Remover'
                            : 'Pagamento já aprovado'
                        }
                        placement={xs ? 'bottom' : 'right'}
                      >
                        <Button
                          disabled={!payment.canBeDeleted}
                          icon={<DeleteOutlined />}
                          size={'small'}
                        />
                      </Tooltip>
                    </Popconfirm>
                  </Descriptions.Item>
                </Descriptions>
              );
            },
          },
          {
            dataIndex: 'payee',
            title: 'Editor',
            responsive: ['sm'],
            ellipsis: true,
            width: 180,
            render(payee: Payment.Summary['payee']) {
              return <Link to={`/usuarios/${payee.id}`}>{payee.name}</Link>;
            },
          },
          {
            dataIndex: 'scheduledTo',
            title: 'Agendamento',
            align: 'center',
            width: 140,
            sorter(a, b) {
              return 0;
            },
            responsive: ['sm'],
            render(date: string) {
              return moment(date).format('DD/MM/YYYY');
            },
          },
          {
            dataIndex: 'accountingPeriod',
            title: 'Período',
            align: 'center',
            responsive: ['sm'],
            width: 240,
            render(period: Payment.Summary['accountingPeriod']) {
              const starts = moment(period.startsOn).format('DD/MM/YYYY');
              const ends = moment(period.endsOn).format('DD/MM/YYYY');
              return `${starts} - ${ends}`;
            },
          },
          {
            dataIndex: 'approvedAt',
            title: 'Status',
            align: 'center',
            width: 180,
            responsive: ['sm'],
            render(approvalDate: Payment.Summary['approvedAt']) {
              const formattedApprovalDate =
                moment(approvalDate).format('DD/MM/YYYY');

              return (
                <Tag color={approvalDate ? 'green' : 'warning'}>
                  {approvalDate
                    ? `Aprovado em ${formattedApprovalDate}`
                    : 'Aguardando aprovação'}
                </Tag>
              );
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            responsive: ['sm'],
            width: 100,
            render(id: number, payment) {
              return (
                <>
                  <Tooltip title={'Detalhar'} placement='left'>
                    <Link to={`/pagamentos/${id}`}>
                      <Button size='small' icon={<EyeOutlined />} />
                    </Link>
                  </Tooltip>
                  <Popconfirm
                    title='Remover agendamento?'
                    disabled={!payment.canBeDeleted}
                    onConfirm={() => {
                      confirm({
                        title: 'Remover agendamento',
                        cancelText: 'Cancelar',
                        onOk() {
                          deleteExistingPayment(id);
                        },
                        content:
                          'Esta é uma ação irreversível. Ao remover um agendamento, ele não poderá ser recuperado!',
                      });
                    }}
                  >
                    <Tooltip
                      title={
                        payment.canBeDeleted
                          ? 'Remover'
                          : 'Pagamento já aprovado'
                      }
                      placement='right'
                    >
                      <Button
                        size='small'
                        disabled={!payment.canBeDeleted}
                        icon={<DeleteOutlined />}
                      />
                    </Tooltip>
                  </Popconfirm>
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}
