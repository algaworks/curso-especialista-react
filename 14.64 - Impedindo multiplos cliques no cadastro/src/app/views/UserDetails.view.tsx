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
  Table,
  Switch,
  Tooltip,
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
import moment from 'moment';
import { Post } from 'danielbonifacio-sdk';
import usePosts from '../../core/hooks/usePosts';
export default function UserDetailsView() {
  const params = useParams<{ id: string }>();
  const { lg } = useBreakpoint();

  const { user, fetchUser, notFound, toggleUserStatus } =
    useUser();

  const {
    fetchUserPosts,
    posts,
    togglePostStatus,
    loadingFetch,
    loadingToggle,
  } = usePosts();

  useEffect(() => {
    if (!isNaN(Number(params.id)))
      fetchUser(Number(params.id));
  }, [fetchUser, params.id]);

  useEffect(() => {
    if (user?.role === 'EDITOR') fetchUserPosts(user.id);
  }, [fetchUserPosts, user]);

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
      <Divider />
      <Col xs={24}>
        <Table<Post.Summary>
          dataSource={posts?.content}
          rowKey={'id'}
          loading={loadingFetch}
          columns={[
            {
              responsive: ['xs'],
              title: 'Posts',
              render(element) {
                return (
                  <Descriptions column={1}>
                    <Descriptions.Item label={'Título'}>
                      {element.title}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Criação'}>
                      {moment(element.createdAt).format(
                        'DD/MM/YYYY'
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={'Atualização'}
                    >
                      {moment(element.updatedAt).format(
                        'DD/MM/YYYY'
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Publicado'}>
                      <Switch checked={element.published} />
                    </Descriptions.Item>
                  </Descriptions>
                );
              },
            },
            {
              dataIndex: 'title',
              title: 'Título',
              ellipsis: true,
              width: 300,
              responsive: ['sm'],
              render(title: string) {
                return (
                  <Tooltip title={title}>{title}</Tooltip>
                );
              },
            },
            {
              dataIndex: 'createdAt',
              title: 'Criação',
              width: 180,
              align: 'center',
              responsive: ['sm'],
              render: (item) =>
                moment(item).format('DD/MM/YYYY'),
            },
            {
              dataIndex: 'updatedAt',
              title: 'Última atualização',
              width: 200,
              align: 'center',
              responsive: ['sm'],
              render: (item) =>
                moment(item).format(
                  'DD/MM/YYYY \\à\\s hh:mm'
                ),
            },
            {
              dataIndex: 'published',
              title: 'Publicado',
              align: 'center',
              width: 120,
              responsive: ['sm'],
              render(published: boolean, post) {
                return (
                  <Switch
                    checked={published}
                    loading={loadingToggle}
                    onChange={() => {
                      togglePostStatus(post).then(() => {
                        fetchUserPosts(user.id);
                      });
                    }}
                  />
                );
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
}
