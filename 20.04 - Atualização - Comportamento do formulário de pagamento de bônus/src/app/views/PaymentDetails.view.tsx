import { PrinterOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, Divider, notification, Space, Tag } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useBreadcrumb from '../../core/hooks/useBreadcrumb';
import usePageTitle from '../../core/hooks/usePageTitle';
import usePayment from '../../core/hooks/usePayment';
import DoubleConfirm from '../components/DoubleConfirm';
import NotFoundError from '../components/NotFoundError';
import PaymentBonuses from '../features/PaymentBonuses';
import PaymentHeader from '../features/PaymentHeader';
import PaymentPosts from '../features/PaymentPosts';

export default function PaymentDetailsView() {
  usePageTitle('Detalhes do pagamento');
  useBreadcrumb('Pagamento/Detalhes');
  const params = useParams<{ id: string }>();
  const history = useHistory();

  const {
    fetchPayment,
    fetchPosts,
    fetchingPayment,
    fetchingPosts,
    paymentNotFound,
    approvingPayment,
    approvePayment,
    payment,
    posts,
  } = usePayment();

  useEffect(() => {
    const paymentId = Number(params.id);
    if (isNaN(paymentId)) {
      return history.push('/pagamentos');
    } else {
      fetchPosts(paymentId);
      fetchPayment(paymentId);
    }
  }, [fetchPosts, fetchPayment, params.id, history]);

  if (paymentNotFound)
    return (
      <NotFoundError
        title='Pagamento não encontrado'
        actionDestination='/pagamentos'
        actionTitle={'Ir para a lista de pagamentos'}
      />
    );

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          className='no-print'
          disabled={!payment}
          type={'primary'}
          icon={<PrinterOutlined />}
          onClick={window.print}
        >
          Imprimir
        </Button>
        {payment?.approvedAt ? (
          <Tag>
            Pagamento aprovado em{' '}
            {moment(payment.approvedAt).format('DD/MM/YYYY')}
          </Tag>
        ) : (
          <DoubleConfirm
            popConfirmTitle={'Deseja aprovar este agendamento?'}
            modalTitle={'Ação irreversível'}
            disabled={!payment || !payment.canBeApproved}
            modalContent={
              'Aprovar um agendamento de pagamento gera uma despesa que não pode ser removida do fluxo de caixa. Essa ação não poderá ser desfeita.'
            }
            onConfirm={async () => {
              if (payment) {
                await approvePayment(payment.id);
                fetchPayment(payment.id);
                notification.success({
                  message: 'Pagamento aprovado com sucesso',
                });
              }
            }}
          >
            <Button
              loading={approvingPayment}
              disabled={!payment || !payment.canBeApproved}
              icon={<CheckCircleOutlined />}
              type={'primary'}
              danger
            >
              Aprovar agendamento
            </Button>
          </DoubleConfirm>
        )}
      </Space>
      <Card>
        <PaymentHeader
          loading={fetchingPayment}
          editorId={payment?.payee.id}
          editorName={payment?.payee.name}
          periodStart={moment(payment?.accountingPeriod.startsOn).format(
            'DD/MM/YYYY'
          )}
          periodEnd={moment(payment?.accountingPeriod.endsOn).format(
            'DD/MM/YYYY'
          )}
          postsEarnings={payment?.earnings.totalAmount}
          totalEarnings={payment?.grandTotalAmount}
        />
        <Divider />
        <PaymentBonuses loading={fetchingPayment} bonuses={payment?.bonuses} />
        <Divider />
        <PaymentPosts loading={fetchingPosts} posts={posts} />
      </Card>
    </>
  );
}
