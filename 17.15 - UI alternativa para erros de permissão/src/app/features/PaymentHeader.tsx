import { Descriptions, Divider, Skeleton, Space, Tag, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

interface PaymentHeaderProps {
  loading?: boolean;
  editorId?: number;
  editorName?: string;
  periodStart?: string;
  periodEnd?: string;
  postsEarnings?: number;
  totalEarnings?: number;
}

export default function PaymentHeader(props: PaymentHeaderProps) {
  const { xs } = useBreakpoint();
  if (props.loading) return <Skeleton />;
  return (
    <>
      <Typography.Title>Pagamento</Typography.Title>
      <Typography.Text>
        A base do pagamento é calculada pela quantidade de palavras escritas
      </Typography.Text>
      <Divider />
      <Descriptions column={xs ? 1 : 2} size={xs ? 'small' : 'default'}>
        <Descriptions.Item label={'Editor'}>
          {props.editorName}
        </Descriptions.Item>
        <Descriptions.Item label={'Período'}>
          <Space size={8}>
            <Tag style={{ margin: 0 }}>{props.periodStart}</Tag>
            <span>{'à'}</span>
            <Tag>{props.periodEnd}</Tag>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label={'Ganhos por posts'}>
          <Tag>
            {props.postsEarnings?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2,
            })}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label={'Total'}>
          <Tag>
            {props.totalEarnings?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2,
            })}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
