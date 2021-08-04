import { Card, Descriptions, Divider, Table, Typography } from 'antd';
import { Post } from 'danielbonifacio-sdk';
import moment from 'moment';
import { useEffect } from 'react';
import usePayment from '../../core/hooks/usePayment';
import PaymentHeader from '../features/PaymentHeader';

export default function PaymentDetailsView() {
  const {
    fetchPayment,
    fetchPosts,
    fetchingPayment,
    fetchingPosts,
    payment,
    posts,
  } = usePayment();

  useEffect(() => {
    fetchPosts(2);
    fetchPayment(2);
  }, [fetchPosts, fetchPayment]);

  return (
    <>
      <Card>
        <PaymentHeader
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
        <Typography.Title level={2}>Bônus</Typography.Title>
        <Descriptions bordered size={'small'} column={1}>
          <Descriptions.Item label={'1 milhão de views em 1 dia'}>
            {'R$ 12.345,67'}
          </Descriptions.Item>
          <Descriptions.Item label={'1 milhão de views em 1 dia'}>
            {'R$ 12.345,67'}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Table<Post.WithEarnings>
          dataSource={[]}
          columns={[
            {
              dataIndex: 'title',
              title: 'Post',
              ellipsis: true,
            },
            {
              dataIndex: 'earnings.pricePerWord',
              title: 'Preço por palavra',
            },
            {
              dataIndex: 'earnings.words',
              title: 'Palavras no post',
            },
            {
              dataIndex: 'earnings.totalAmount',
              title: 'Total ganho neste post',
            },
          ]}
        />
      </Card>
    </>
  );
}
