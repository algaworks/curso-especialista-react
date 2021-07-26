import { Menu, Layout } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  DiffOutlined,
  HomeOutlined,
  TableOutlined,
  PlusCircleOutlined,
  FallOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function DefaultLayoutSidebar() {
  const history = useHistory();
  return (
    <Sider
      width={200}
      className='site-layout-background'
      breakpoint='lg'
      collapsedWidth='0'
    >
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key={'0'} icon={<HomeOutlined />}>
          <Link to={'/'}>Home</Link>
        </Menu.Item>
        <SubMenu
          key='sub1'
          icon={<UserOutlined />}
          title='Usuários'
        >
          <Menu.Item
            key='1'
            onClick={() => history.push('/usuarios')}
            icon={<TableOutlined />}
          >
            <Link to={'/usuarios'}>Consulta</Link>
          </Menu.Item>
          <Menu.Item
            key='/usuarios/cadastro'
            onClick={() =>
              history.push('/usuarios/cadastro')
            }
            icon={<PlusCircleOutlined />}
          >
            <Link to={'/usuarios/cadastro'}>Cadastro</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          icon={<LaptopOutlined />}
          title='Pagamentos'
        >
          <Menu.Item
            key='/pagamentos'
            onClick={() => history.push('/pagamentos')}
            icon={<TableOutlined />}
          >
            <Link to={'/pagamentos'}>Consulta</Link>
          </Menu.Item>
          <Menu.Item
            key='/pagamentos/cadastro'
            onClick={() =>
              history.push('/pagamentos/cadastro')
            }
            icon={<PlusCircleOutlined />}
          >
            <Link to={'/pagamentos/cadastro'}>
              Cadastro
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub3'
          icon={<DiffOutlined />}
          title='Fluxo de Caixa'
        >
          <Menu.Item
            key='/fluxo-de-caixa/despesas'
            onClick={() =>
              history.push('/fluxo-de-caixa/despesas')
            }
            icon={<FallOutlined />}
          >
            <Link to={'/fluxo-de-caixa/despesas'}>
              Despesa
            </Link>
          </Menu.Item>
          <Menu.Item
            key='/fluxo-de-caixa/receitas'
            onClick={() =>
              history.push('/fluxo-de-caixa/receitas')
            }
            icon={<RiseOutlined />}
          >
            <Link to={'/fluxo-de-caixa/receitas'}>
              Receita
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
