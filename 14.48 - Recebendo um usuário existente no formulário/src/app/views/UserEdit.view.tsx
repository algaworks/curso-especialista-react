import { Skeleton } from 'antd';
import { useEffect } from 'react';
import useUser from '../../core/hooks/useUser';
import UserForm from '../features/UserForm';

export default function UserEditView() {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser(1);
  }, [fetchUser]);

  if (!user) return <Skeleton />;

  return (
    <>
      <UserForm user={user} />
    </>
  );
}
