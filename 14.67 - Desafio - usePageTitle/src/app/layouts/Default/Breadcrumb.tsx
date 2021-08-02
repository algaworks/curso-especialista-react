import { Breadcrumb as AntdBreadcrumb } from 'antd';

export default function Breadcrumb() {
  return (
    <AntdBreadcrumb style={{ margin: '16px 0' }}>
      <AntdBreadcrumb.Item>Home</AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>List</AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>App</AntdBreadcrumb.Item>
    </AntdBreadcrumb>
  );
}
