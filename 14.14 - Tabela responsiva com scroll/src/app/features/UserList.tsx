import {
  Button,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  Avatar,
  Card,
  Input,
} from 'antd';
import { User } from 'danielbonifacio-sdk';
import { format } from 'date-fns';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';
import {
  EyeOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';

export default function UserList() {
  const { users, fetchUsers, toggleUserStatus, fetching } =
    useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getColumnSearchProps = (
    dataIndex: keyof User.Summary,
    displayName?: string
  ): ColumnProps<User.Summary> => ({
    filterDropdown: ({
      selectedKeys,
      setSelectedKeys,
      confirm,
      clearFilters,
    }) => (
      <Card>
        <Input
          style={{ marginBottom: 8, display: 'block' }}
          value={selectedKeys[0]}
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setSelectedKeys(
              e.target.value ? [e.target.value] : []
            );
          }}
          onPressEnter={() => confirm()}
        />
        <Space>
          <Button
            type={'primary'}
            size={'small'}
            style={{ width: 90 }}
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Buscar
          </Button>
          <Button
            onClick={clearFilters}
            size={'small'}
            style={{ width: 90 }}
          >
            Limpar
          </Button>
        </Space>
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? '#0099ff' : undefined }}
      />
    ),
    // @ts-ignore
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : '',
  });

  return (
    <>
      <Table<User.Summary>
        loading={fetching}
        dataSource={users}
        pagination={false}
        columns={[
          {
            dataIndex: 'avatarUrls',
            title: '',
            width: 48,
            fixed: 'left',
            render(avatarUrls: User.Summary['avatarUrls']) {
              return (
                <Avatar
                  size={'small'}
                  src={avatarUrls.small}
                />
              );
            },
          },
          {
            dataIndex: 'name',
            title: 'Nome',
            ...getColumnSearchProps('name', 'nome'),
            width: 160,
            ellipsis: true,
          },
          {
            dataIndex: 'email',
            title: 'Email',
            ellipsis: true,
            width: 240,
            ...getColumnSearchProps('email', 'Email'),
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
            align: 'center',
            width: 100,
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
            width: 120,
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
            width: 100,
            render(active: boolean, user) {
              return (
                <Switch
                  onChange={() => {
                    toggleUserStatus(user);
                  }}
                  defaultChecked={active}
                />
              );
            },
          },
          {
            dataIndex: 'id',
            title: 'Ações',
            align: 'center',
            width: 100,
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
