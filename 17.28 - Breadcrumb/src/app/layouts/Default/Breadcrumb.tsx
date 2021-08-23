import { Breadcrumb as AntdBreadcrumb } from 'antd';
import useBreadcrumb from '../../../core/hooks/useBreadcrumb';

export default function Breadcrumb() {
  const { breadcrumb } = useBreadcrumb();
  return (
    <AntdBreadcrumb className='no-print' style={{ margin: '16px 0' }}>
      {breadcrumb.map((bc, index) => (
        <AntdBreadcrumb.Item key={index}>{bc}</AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  );
}
