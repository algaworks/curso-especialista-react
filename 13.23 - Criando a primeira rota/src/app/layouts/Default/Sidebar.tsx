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

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function DefaultLayoutSidebar() {
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
          Home
        </Menu.Item>
        <SubMenu
          key='sub1'
          icon={<UserOutlined />}
          title='Usuários'
        >
          <Menu.Item key='1' icon={<TableOutlined />}>
            Consulta
          </Menu.Item>
          <Menu.Item key='2' icon={<PlusCircleOutlined />}>
            Cadastro
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          icon={<LaptopOutlined />}
          title='Pagamentos'
        >
          <Menu.Item key='3' icon={<TableOutlined />}>
            Consulta
          </Menu.Item>
          <Menu.Item key='4' icon={<PlusCircleOutlined />}>
            Cadastro
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub3'
          icon={<DiffOutlined />}
          title='Fluxo de Caixa'
        >
          <Menu.Item key='5' icon={<FallOutlined />}>
            Despesa
          </Menu.Item>
          <Menu.Item key='6' icon={<RiseOutlined />}>
            Receita
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
