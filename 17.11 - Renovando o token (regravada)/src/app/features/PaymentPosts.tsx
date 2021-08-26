import { Descriptions, Table, Tooltip } from 'antd';
import { Payment, Post } from 'danielbonifacio-sdk';

interface PaymentPostsProps {
  loading?: boolean;
  posts: Payment.PostWithEarnings[];
}

export default function PaymentPosts(props: PaymentPostsProps) {
  return (
    <>
      <Table<Post.WithEarnings>
        loading={props.loading}
        dataSource={props.posts}
        pagination={false}
        rowKey={'id'}
        columns={[
          {
            responsive: ['xs'],
            title: 'Posts',
            render(post: Post.WithEarnings) {
              return (
                <Descriptions column={1}>
                  <Descriptions.Item label={'Título'}>
                    {post.title}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Preço por palavra'}>
                    {post.earnings.pricePerWord.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 2,
                    })}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Palavras no post'}>
                    {post.earnings.words}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Ganho no post'}>
                    {post.earnings.totalAmount.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 2,
                    })}
                  </Descriptions.Item>
                </Descriptions>
              );
            },
          },
          {
            dataIndex: 'title',
            title: 'Post',
            ellipsis: true,
            width: 300,
            responsive: ['sm'],
            render(value: string) {
              return <Tooltip title={value}>{value}</Tooltip>;
            },
          },
          {
            dataIndex: 'earnings.pricePerWord'.split('.'),
            title: 'Preço por palavra',
            align: 'right',
            width: 150,
            responsive: ['sm'],
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
            responsive: ['sm'],
          },
          {
            dataIndex: 'earnings.totalAmount'.split('.'),
            title: 'Total ganho neste post',
            align: 'right',
            responsive: ['sm'],
            width: 170,
          },
        ]}
      />
    </>
  );
}
