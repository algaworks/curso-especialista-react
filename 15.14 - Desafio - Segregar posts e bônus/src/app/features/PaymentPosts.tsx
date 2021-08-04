import { Table, Tooltip } from 'antd';
import { Payment, Post } from 'danielbonifacio-sdk';

interface PaymentPostsProps {
  posts: Payment.PostWithEarnings[];
}

export default function PaymentPosts(props: PaymentPostsProps) {
  return (
    <>
      <Table<Post.WithEarnings>
        dataSource={props.posts}
        pagination={false}
        columns={[
          {
            dataIndex: 'title',
            title: 'Post',
            ellipsis: true,
            width: 300,
            render(value: string) {
              return <Tooltip title={value}>{value}</Tooltip>;
            },
          },
          {
            dataIndex: 'earnings.pricePerWord'.split('.'),
            title: 'Preço por palavra',
            align: 'right',
            width: 150,
            render(price: number) {
              return price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 2,
              });
            },
          },
          {
            dataIndex: 'earnings.words'.split('.'),
            title: 'Palavras no post',
            width: 150,
            align: 'right',
          },
          {
            dataIndex: 'earnings.totalAmount'.split('.'),
            title: 'Total ganho neste post',
            align: 'right',
            width: 170,
          },
        ]}
      />
    </>
  );
}
