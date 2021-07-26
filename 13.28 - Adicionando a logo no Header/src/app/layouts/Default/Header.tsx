import { Layout, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import logo from '../../../assets/logo.svg';

const { Header } = Layout;

export default function DefaultLayoutHeader() {
  return (
    <Header className='header'>
      <Row
        justify='space-between'
        style={{ height: '100%' }}
        align='middle'
      >
        <img src={logo} alt={'AlgaNews Admin'} />
        <Avatar />
      </Row>
    </Header>
  );
}
