import { PrinterOutlined } from '@ant-design/icons';
import { Button, Card, Divider } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import usePageTitle from '../../core/hooks/usePageTitle';
import usePayment from '../../core/hooks/usePayment';
import NotFoundError from '../components/NotFoundError';
import PaymentBonuses from '../features/PaymentBonuses';
import PaymentHeader from '../features/PaymentHeader';
import PaymentPosts from '../features/PaymentPosts';

export default function PaymentDetailsView() {
  usePageTitle('Detalhes do pagamento');
  const params = useParams<{ id: string }>();
  const history = useHistory();

  const {
    fetchPayment,
    fetchPosts,
    fetchingPayment,
    fetchingPosts,
    paymentNotFound,
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
      <Button
        className='no-print'
        style={{ marginBottom: 16 }}
        type={'primary'}
        icon={<PrinterOutlined />}
        onClick={window.print}
      >
        Imprimir
      </Button>
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
