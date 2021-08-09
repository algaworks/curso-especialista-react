import { Button, Typography } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface NotFoundErrorProps {
  title: string;
  actionTitle: string;
  actionDestination: string;
}

export default function NotFoundError(
  props: NotFoundErrorProps
) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <WarningFilled style={{ fontSize: 32 }} />
      <Typography.Title style={{ color: '#09f' }} level={1}>
        {props.title}
      </Typography.Title>
      <Typography.Text>
        O recurso que você está procurando não foi
        encontrado
      </Typography.Text>
      <Link to={props.actionDestination}>
        <Button type={'primary'}>
          {props.actionTitle}
        </Button>
      </Link>
    </div>
  );
}
