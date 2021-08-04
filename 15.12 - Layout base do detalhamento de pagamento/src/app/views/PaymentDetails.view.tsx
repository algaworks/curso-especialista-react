import {
  Card,
  Descriptions,
  Divider,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import { Post } from 'danielbonifacio-sdk';

export default function PaymentDetailsView() {
  return (
    <>
      <Card>
        <Typography.Title>Pagamento</Typography.Title>
        <Typography.Text>
          A base do pagamento é calculada pela quantidade de palavras escritas
        </Typography.Text>
        <Divider />
        <Descriptions column={2}>
          <Descriptions.Item label={'Editor'}>EDITOR</Descriptions.Item>
          <Descriptions.Item label={'Período'}>
            <Space size={8}>
              <Tag style={{ margin: 0 }}>20/12/2020</Tag>
              <span>{'até'}</span>
              <Tag>30/12/2020</Tag>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label={'Ganhos por posts'}>
            <Tag>{'R$ 12.345,67'}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={'Total'}>
            <Tag>{'R$ 45.345,67'}</Tag>
          </Descriptions.Item>
        </Descriptions>
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
