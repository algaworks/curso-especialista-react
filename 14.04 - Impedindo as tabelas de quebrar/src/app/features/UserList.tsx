import {
  Button,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  Avatar,
} from 'antd';
import { User } from 'danielbonifacio-sdk';
import { format } from 'date-fns';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';
import {
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons';

export default function UserList() {
  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Table<User.Summary>
        dataSource={users}
        columns={[
          {
            dataIndex: 'name',
            title: 'Nome',
            render(name: string, row) {
              return (
                <Space>
                  <Avatar
                    size={'small'}
                    src={row.avatarUrls.small}
                  />
                  <Typography.Text
                    ellipsis
                    style={{ maxWidth: 180 }}
                  >
                    {name + name}
                  </Typography.Text>
                </Space>
              );
            },
          },
          {
            dataIndex: 'email',
            title: 'Email',
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            align: 'center',
            render(role) {
              return (
                <Tag
                  color={
                    role === 'MANAGER' ? 'red' : 'blue'
                  }
                >
                  {role === 'EDITOR'
                    ? 'Editor'
                    : role === 'MANAGER'
                    ? 'Gerente'
                    : 'Assistente'}
                </Tag>
              );
            },
          },
          {
            dataIndex: 'createdAt',
            title: 'Criação',
            align: 'center',
            render(createdAt: string) {
              return format(
                new Date(createdAt),
                'dd/MM/yyyy'
              );
            },
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
            align: 'center',
            render(active: boolean) {
              return <Switch defaultChecked={active} />;
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'center',
            render() {
              return (
                <>
                  <Button
                    size='small'
                    icon={<EyeOutlined />}
                  />
                  <Button
                    size='small'
                    icon={<EditOutlined />}
                  />
                </>
              );
            },
          },
        ]}
      />
    </>
  );
}
