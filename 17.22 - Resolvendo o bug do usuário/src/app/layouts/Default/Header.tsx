import { Card, Dropdown, Layout, Menu, Row, Tag } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import logo from '../../../assets/logo.svg';
import useAuth from '../../../core/hooks/useAuth';
import { Link } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';
import AuthService from '../../../auth/Authorization.service';

const { Header } = Layout;

export default function DefaultLayoutHeader() {
  const { user } = useAuth();

  return (
    <Header className='header no-print'>
      <Row
        justify='space-between'
        style={{
          height: '100%',
          maxWidth: 1190,
          margin: '0 auto',
        }}
        align='middle'
      >
        <img src={logo} alt={'AlgaNews Admin'} />
        <Dropdown
          placement={'bottomRight'}
          overlay={
            <Menu style={{ width: 220 }}>
              <Card bordered={false}>
                <Meta
                  title={user?.name}
                  description={
                    <Tag color={user?.role === 'MANAGER' ? 'red' : 'blue'}>
                      {user?.role === 'EDITOR'
                        ? 'Editor'
                        : user?.role === 'MANAGER'
                        ? 'Gerente'
                        : 'Assistente'}
                    </Tag>
                  }
                />
              </Card>
              <Menu.Item icon={<UserOutlined />}>
                <Link to={`/usuarios/${user?.id}`}>Meu perfil</Link>
              </Menu.Item>
              <Menu.Item
                icon={<LogoutOutlined />}
                onClick={() =>
                  confirm({
                    title: 'Fazer logout',
                    content:
                      'Deseja realmente fazer o logout? Será necessário inserir as credenciais novamente.',
                    onOk() {
                      AuthService.imperativelySendToLogout();
                    },
                    closable: true,
                    okButtonProps: { danger: true },
                    okText: 'Fazer logout',
                    cancelText: 'Permanecer logado',
                  })
                }
                danger
              >
                Fazer logout
              </Menu.Item>
            </Menu>
          }
        >
          <Avatar src={user?.avatarUrls.small} />
        </Dropdown>
      </Row>
    </Header>
  );
}
