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
  Popconfirm,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import confirm from 'antd/lib/modal/confirm';
import { useEffect } from 'react';
import {
  Link,
  Redirect,
  useParams,
} from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import { WarningFilled } from '@ant-design/icons';
export default function UserDetailsView() {
  const params = useParams<{ id: string }>();
  const { lg } = useBreakpoint();

  const { user, fetchUser, notFound, toggleUserStatus } =
    useUser();

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
            <Link to={`/usuarios/edicao/${user.id}`}>
              <Button type={'primary'}>
                Editar perfil
              </Button>
            </Link>
            <Popconfirm
              title={
                user.active
                  ? `Desabilitar ${user.name}`
                  : `Habilitar ${user.name}`
              }
              onConfirm={() => {
                confirm({
                  icon: (
                    <WarningFilled
                      style={{ color: '#09f' }}
                    />
                  ),
                  title: `Tem certeza que deseja ${
                    user.active
                      ? `desabilitar ${user.name}?`
                      : `habilitar ${user.name}?`
                  }`,
                  onOk() {
                    toggleUserStatus(user).then(() => {
                      fetchUser(Number(params.id));
                    });
                  },
                  content: user.active
                    ? 'Desabilitar um usuário fará com que ele seja automaticamente desligado da plataforma, podendo causar prejuízos em seus ganhos.'
                    : 'Habilitar um usuário fará com que ele ganhe acesso a plataforma novamente, possibilitando criação e publicação de posts.',
                });
              }}
            >
              <Button type={'primary'}>
                {user.active ? 'Desabilitar' : 'Habilitar'}
              </Button>
            </Popconfirm>
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
