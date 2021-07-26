import { Layout } from 'antd';

import Breadcrumb from './Breadcrumb';
import DefaultLayoutContent from './Content';
import DefaultLayoutHeader from './Header';
import DefaultLayoutSidebar from './Sidebar';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout(
  props: DefaultLayoutProps
) {
  return (
    <Layout>
      <DefaultLayoutHeader />
      <Layout>
        <DefaultLayoutSidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb />
          <DefaultLayoutContent>
            {props.children}
          </DefaultLayoutContent>
        </Layout>
      </Layout>
    </Layout>
  );
}
