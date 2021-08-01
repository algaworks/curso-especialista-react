import {
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Space,
  Typography,
  Progress,
  Descriptions,
  Divider,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';

export default function UserDetailsView() {
  const params = useParams<{ id: string }>();
  const { lg } = useBreakpoint();

  const { user, fetchUser, notFound } = useUser();

  useEffect(() => {
    if (!isNaN(Number(params.id)))
      fetchUser(Number(params.id));
  }, [fetchUser, params.id]);

  if (isNaN(Number(params.id)))
    return <Redirect to={'/usuarios'} />;

  if (notFound) return <Card>usuário não encontrado</Card>;

  if (!user) return <Skeleton />;

  return (
    <Row gutter={24}>
      <Col xs={24} lg={4}>
        <Row justify={'center'}>
          <Avatar size={120} src={user.avatarUrls.small} />
        </Row>
      </Col>
      <Col xs={24} lg={20}>
        <Space
          style={{ width: '100%' }}
          direction={'vertical'}
          align={lg ? 'start' : 'center'}
        >
          <Typography.Title level={2}>
            {user.name}
          </Typography.Title>
          <Typography.Paragraph
            style={{
              textAlign: lg ? 'left' : 'center',
            }}
            ellipsis={{
              rows: 2,
            }}
          >
            {user.bio}
          </Typography.Paragraph>
          <Space>
            <Button type={'primary'}>Editar perfil</Button>
            <Button type={'primary'}>Remover</Button>
          </Space>
        </Space>
      </Col>
      <Divider />
      <Col xs={24} lg={12}>
        <Space
          direction='vertical'
          style={{ width: '100%' }}
        >
          {user.skills?.map((skill) => (
            <div key={skill.name}>
              <Typography.Text>
                {skill.name}
              </Typography.Text>
              <Progress
                percent={skill.percentage}
                success={{ percent: 0 }}
              />
            </div>
          ))}
        </Space>
      </Col>
      <Col xs={24} lg={12}>
        <Descriptions column={1} bordered size={'small'}>
          <Descriptions.Item label={'País'}>
            {user.location.country}
          </Descriptions.Item>
          <Descriptions.Item label={'Estado'}>
            {user.location.state}
          </Descriptions.Item>
          <Descriptions.Item label={'Cidade'}>
            {user.location.city}
          </Descriptions.Item>
          <Descriptions.Item label={'Telefone'}>
            {user.phone}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
}
