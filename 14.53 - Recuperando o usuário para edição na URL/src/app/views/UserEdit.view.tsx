import { notification, Skeleton } from 'antd';
import { User, UserService } from 'danielbonifacio-sdk';
import moment from 'moment';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import useUser from '../../core/hooks/useUser';
import UserForm from '../features/UserForm';

export default function UserEditView() {
  const params = useParams<{ id: string }>();

  const { user, fetchUser } = useUser();

  useEffect(() => {
    if (!isNaN(Number(params.id)))
      fetchUser(Number(params.id));
  }, [fetchUser, params.id]);

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

  if (isNaN(Number(params.id)))
    return <Redirect to={'/usuarios'} />;

  function handleUserUpdate(user: User.Input) {
    UserService.updateExistingUser(
      Number(params.id),
      user
    ).then(() => {
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
