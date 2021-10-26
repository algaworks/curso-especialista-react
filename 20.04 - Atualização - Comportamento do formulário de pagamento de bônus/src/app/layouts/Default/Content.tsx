import { Layout } from 'antd';

const { Content } = Layout;

interface DefaultLayoutContentProps {
  children: React.ReactNode;
}
export default function DefaultLayoutContent(props: DefaultLayoutContentProps) {
  return (
    <Content
      className='site-layout-background'
      style={{
        margin: 0,
        minHeight: 280,
      }}
    >
      {props.children}
    </Content>
  );
}
