import { notification, Skeleton } from 'antd';
import { User, UserService } from 'danielbonifacio-sdk';
import moment from 'moment';
import { useCallback } from 'react';
import { useEffect } from 'react';
import useUser from '../../core/hooks/useUser';
import UserForm from '../features/UserForm';

export default function UserEditView() {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser(1);
  }, [fetchUser]);

  const transformUserData = useCallback(
    (user: User.Detailed) => {
      return {
        ...user,
        createdAt: moment(user.createdAt),
        updatedAt: moment(user.updatedAt),
        birthdate: moment(user.birthdate),
      };
    },
    []
  );

  function handleUserUpdate(user: User.Input) {
    UserService.updateExistingUser(1, user).then(() => {
      notification.success({
        message: 'Usuário foi atualizado com sucesso',
      });
    });
  }

  if (!user) return <Skeleton />;

  return (
    <>
      <UserForm
        onUpdate={handleUserUpdate}
        user={transformUserData(user)}
      />
    </>
  );
}
