import {
  Button,
  DatePicker,
  Popconfirm,
  Row,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import { Payment } from 'danielbonifacio-sdk';
import moment from 'moment';
import { useEffect } from 'react';
import {
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import usePayments from '../../core/hooks/usePayments';
import confirm from 'antd/lib/modal/confirm';
import { useState } from 'react';
import { Key } from 'antd/lib/table/interface';

export default function PaymentListView() {
  const { payments, fetchPayments } = usePayments();
  const [yearMonth, setYearMonth] = useState<
    string | undefined
  >('2021-08');
  const [selectedRowKeys, setSelectedRowKeys] = useState<
    Key[]
  >([]);

  useEffect(() => {
    console.log(selectedRowKeys);
  }, [selectedRowKeys]);

  useEffect(() => {
    fetchPayments({
      scheduledToYearMonth: yearMonth,
      sort: ['scheduledTo', 'desc'],
      page: 0,
    });
  }, [fetchPayments, yearMonth]);

  return (
    <>
      <Row justify={'space-between'}>
        <Popconfirm
          title={
            selectedRowKeys.length === 1
              ? 'Você deseja aprovar o pagamento selecionado?'
              : 'Você deseja aprovar os pagamentos selecionados?'
          }
          onConfirm={() => {
            confirm({
              title: 'Aprovar pagamento',
              onOk() {
                console.log(
                  'todo: implement payment batch approval'
                );
              },
              content:
                'Esta é uma ação irreversível. Ao aprovar um pagamento, ele não poderá ser removido!',
            });
          }}
        >
          <Button
            type={'primary'}
            disabled={selectedRowKeys.length === 0}
          >
            Aprovar pagamentos
          </Button>
        </Popconfirm>
        <DatePicker.MonthPicker
          style={{ width: 240 }}
          format={'MMMM - YYYY'}
          onChange={(date) => {
            setYearMonth(
              date ? date?.format('YYYY-MM') : undefined
            );
          }}
        />
      </Row>
      <Table<Payment.Summary>
        dataSource={payments?.content}
        rowKey='id'
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
          getCheckboxProps(payment) {
            return !payment.canBeApproved
              ? { disabled: true }
              : {};
          },
        }}
        columns={[
          {
            dataIndex: 'id',
            title: '#',
          },
          {
            dataIndex: 'payee',
            title: 'Editor',
            render(payee: Payment.Summary['payee']) {
              return payee.name;
            },
          },
          {
            dataIndex: 'scheduledTo',
            title: 'Agendamento',
            align: 'center',
            render(date: string) {
              return moment(date).format('DD/MM/YYYY');
            },
          },
          {
            dataIndex: 'accountingPeriod',
            title: 'Agendamento',
            align: 'center',
            render(
              period: Payment.Summary['accountingPeriod']
            ) {
              const starts = moment(period.startsOn).format(
                'DD/MM/YYYY'
              );
              const ends = moment(period.endsOn).format(
                'DD/MM/YYYY'
              );
              return `${starts} - ${ends}`;
            },
          },
          {
            dataIndex: 'approvedAt',
            title: 'Agendamento',
            align: 'center',
            render(
              approvalDate: Payment.Summary['approvedAt']
            ) {
              const formattedApprovalDate =
                moment(approvalDate).format('DD/MM/YYYY');

              return (
                <Tag
                  color={approvalDate ? 'green' : 'warning'}
                >
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
            render(id: number, payment) {
              return (
                <>
                  <Tooltip
                    title={'Detalhar'}
                    placement='left'
                  >
                    <Button
                      size='small'
                      icon={<EyeOutlined />}
                    />
                  </Tooltip>
                  <Popconfirm
                    title='Remover agendamento?'
                    onConfirm={() => {
                      confirm({
                        title: 'Remover agendamento',
                        cancelText: 'Cancelar',
                        onOk() {
                          console.log(
                            'todo: implement payment deletion'
                          );
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
