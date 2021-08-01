import { Table } from 'antd';
import { User } from 'danielbonifacio-sdk';
import { useEffect } from 'react';
import useUsers from '../../core/hooks/useUsers';

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
          },
          {
            dataIndex: 'email',
            title: 'Email',
          },
          {
            dataIndex: 'role',
            title: 'Perfil',
          },
          {
            dataIndex: 'createdAt',
            title: 'Criação',
          },
          {
            dataIndex: 'active',
            title: 'Ativo',
          },
          {
            dataIndex: 'id',
            title: 'Ações',
          },
        ]}
      />
    </>
  );
}
